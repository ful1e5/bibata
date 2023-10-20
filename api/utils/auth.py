import os
import uuid
from dataclasses import dataclass
from logging import Logger
from typing import Literal, Union

import jwt
import requests
from requests.adapters import HTTPAdapter, Retry

SECRET = os.environ.get("JWT_SECRET", "jwtsecret")


@dataclass
class AuthToken:
    id: str
    account: Literal["User", "Pro"]


def as_auth_token(data) -> Union[None, AuthToken]:
    if type(data) is dict:
        ac = data.get("acccount")
        id = data.get("id")
        if not ac or not id:
            return None
        return AuthToken(id=id, account=ac)
    else:
        return None


def decode_auth_token(account: str):
    try:
        payload = jwt.decode(account, SECRET, algorithms=["HS256"])
        auth = as_auth_token(payload)
        if auth:
            return auth
        else:
            return "invalid"
    except jwt.ExpiredSignatureError:
        return "expired"
    except jwt.InvalidTokenError:
        return "invalid"
    except Exception:
        return "invalid"


def fetch(url: str, headers=None):
    session = requests.Session()
    retry = Retry(connect=5, backoff_factor=0.5)
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("http://", adapter)
    session.mount("https://", adapter)

    return session.get(url, headers=headers)


def fetch_github_user(token: str, logger: Logger):
    res = fetch(
        url="https://api.github.com/user",
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {token}",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    )
    if res.status_code == 200:
        user_data = res.json()
        return user_data
    elif res.status_code == 404:
        return None


def is_sponsor(token: str, logger: Logger):
    user = fetch_github_user(token, logger)
    if user:
        author = ["ful1e5"]
        login = user.get("login")

        if login in author:
            return True

        url = f"https://sponsor-spotlight.vercel.app/api/fetch?login={author[0]}"
        res = fetch(url)
        if res.status_code == 200:
            data = res.json().get("data")
            sponsor = any(e["login"] == login for e in data)
            return sponsor
        elif res.status_code == 404:
            return False
    else:
        return False


def gen_user_token():
    id = str(uuid.uuid4())
    payload = {"id": id, "account": "User"}
    return id, jwt.encode(payload, SECRET, algorithm="HS256")


def gen_sponsor_token(jwt_token: str, logger: Logger):
    user_payload = gen_user_token()

    try:
        payload = jwt.decode(jwt_token, SECRET, algorithms=["HS256"])
        token = payload.get("gh_access_token")

        if is_sponsor(token, logger):
            id = str(uuid.uuid4())
            payload = {"id": id, "account": "Pro"}
            return id, jwt.encode(payload, SECRET, algorithm="HS256")
        else:
            return user_payload

    except jwt.ExpiredSignatureError:
        return user_payload
    except jwt.InvalidTokenError:
        return user_payload
