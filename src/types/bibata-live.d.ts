declare module 'bibata-live' {
  type SVG = {
    name: string;
    ids: string[];
    isAnimated: boolean;
  };

  type Color = {
    base: string;
    outline: string;
    watch?: string;
  };

  type Colors = {
    [name: string]: Color;
  };
}

declare module 'bibata-live/misc' {
  type Goals = {
    monthlySponsorshipInCents: number;
    percentComplete: number;
    title: string;
    targetValueInDollar: number;
  };

  type UserRole = 'USER' | 'PRO' | 'ADMIN';

  type DBUser = {
    id?: string;
    userId: string;
    login: string;
    name: string | null;
    email: string | null;
    url: string;
    avatarUrl: string;

    role: UserRole;
    index?: number;
    totalDownloadCount: number | null;
  };

  type DBDownload = {
    id?: string;
    baseColor: string;
    outlineColor: string;
    watchBGColor: string;

    index?: number;
    createdAt?: string;
    updatedAt?: string;

    user?: DBUser;
    userId?: string;
  };
}

declare module 'bibata-live/core' {
  type Image = {
    name: string;
    frames: string[];
  };

  type Platform = 'x11' | 'win';

  type AuthError = {
    status: number;
    error: string[];
  };

  type AuthToken = {
    id: string;
    role: 'USER' | 'PRO' | 'ADMIN';
    token: string;
  };

  type UploadResponse = {
    status: number;
    id: string;
    files: string[];
    error: string[];
  };

  type GetSessionResponse = {
    id: string;
    token: string;
  };

  type DeleteSessionResponse = {
    id: string | null;
  };

  type DownloadError = {
    status: number;
    id: string;
    error: string[];
  };
}
