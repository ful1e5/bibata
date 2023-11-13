import Redis from 'ioredis';

const client = new Redis({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT
});

export default client;
