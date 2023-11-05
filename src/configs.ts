import { Colors } from 'bibata-live/app';

export const TYPES = ['Modern', 'Original'];

export const SIZES = [16, 20, 22, 24, 28, 32, 40, 48, 56, 64, 72, 80, 88, 96];

export const PREBUILT_COLORS: Colors = {
  Amber: { base: 'ff8300', outline: 'ffffff', watch: '001524' },
  Classic: { base: '000000', outline: 'ffffff' },
  Ice: { base: 'ffffff', outline: '000000' }
};

export const DB_SEEDS = {
  FRESH_SIGNUP_DOWNLOADS: 20,
  DOWNLOAD_MULTIPLIER: 10,
  DOWNLOADS_PER_CENTS: (cents: number) => cents * DB_SEEDS.DOWNLOAD_MULTIPLIER // 1000 public Downloads per dollar
};
