namespace NodeJS {
  interface ProcessEnv {
    readonly NEXTAUTH_SECRET: string;
    readonly FLASK_SECRET: string;
    readonly CRON_SECRET: string;
    readonly NEXT_PUBLIC_JWT_SECRET: string;

    readonly GITHUB_ID: string;
    readonly GITHUB_SECRET: string;

    readonly FIGMA_TOKEN: string;
    readonly FIGMA_FILE: string;
  }
}
