namespace NodeJS {
  interface ProcessEnv {
    readonly VERCEL_ENV: 'preview' | 'development' | 'production';
    readonly NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?: string;
    readonly NEXT_PUBLIC_VERCEL_BRANCH_URL?: string;

    readonly GITHUB_ID: string;
    readonly GITHUB_SECRET: string;

    readonly FIGMA_TOKEN: string;
    readonly FIGMA_FILE: string;

    readonly KV_REST_API_URL: string;
    readonly KV_REST_API_TOKEN: string;

    readonly DATABASE_URL: string;

    readonly NEXT_PUBLIC_JWT_SECRET: string;
    readonly NEXTAUTH_SECRET: string;
    readonly FLASK_SECRET: string;
    readonly SVG_FETCH_SECRET: string;
  }
}
