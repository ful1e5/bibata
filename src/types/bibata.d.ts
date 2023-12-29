declare module 'bibata/app' {
  type SVG = {
    id: string;
    name: string;
    node_ids: string[];
    urls: string[];
    isAnimated: boolean;
  };

  type Color = {
    base: string;
    outline: string;
    watch?: {
      bg?: string;
      c1?: string;
      c2?: string;
      c3?: string;
      c4?: string;
    };
  };

  type Colors = {
    [name: string]: Color;
  };

  type Delay = {
    delay: number;
    frames: number;
  };

  type Delays = {
    [key: number]: Delay;
  };

  type Image = {
    name: string;
    frames: string[];
    delay: number;
  };

  type ErrorLogs = {
    text: string;
    [k: string]: any;
  };
}

declare module 'bibata/misc' {
  type Goals = {
    monthlySponsorshipInCents: number;
    percentComplete: number;
    title: string;
    targetValueInDollar: number;
  };

  type Sponsor = {
    login: string;
    url: string;
    name: string;
    avatarUrl: string;
    dollar: number;
    tier: string;
  };

  type LuckySponsor = {
    sponsors: Sponsor[];
    others: number;
    total_dollar: number;
  };

  type DownloadCounts = {
    total: number | null;
    count: number;
    role: Role;
    error: any;
  };

  type JWTToken = {
    token_id: string;
    id: string | null;
    userId: string | null;
    login: string | null;
    name: string | null;
    url: string | null;
    email: string | null;
    avatarUrl: string | null;
    role: Role;
    totalDownloadCount: number | null;
  };
}

declare module 'bibata/core-api/types' {
  type AuthToken = {
    id: string;
    role: Role;
    token: string;
  };
}

declare module 'bibata/core-api/responses' {
  type AuthError = {
    status: number;
    error: string[];
  };

  type UploadResponse = {
    id: string;
    files: string[];
    error: string[];
  };

  type GetSessionResponse = {
    id: string;
    role: Role;
  };

  type DeleteSessionResponse = {
    id: string | null;
  };

  type DownloadError = {
    id: string;
    error: string[];
  };

  type DownloadFile = {
    blob: Blob;
    name: string;
  };
}
