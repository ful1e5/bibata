namespace NodeJS {
  interface ProcessEnv {
    readonly VERCEL_ENV: 'preview' | 'development' | 'production';

    readonly NEXT_PUBLIC_JWT_SECRET: string;
    readonly NEXTAUTH_SECRET: string;
    readonly FLASK_SECRET: string;
    readonly SVG_FETCH_SECRET: string;

    readonly REDIS_HOST?: string;
    readonly REDIS_PORT?: number;
    readonly REDIS_PASSWORD?: string;

    readonly GITHUB_ID: string;
    readonly GITHUB_SECRET: string;

    readonly FIGMA_TOKEN: string;
    readonly FIGMA_FILE: string;
  }
}
