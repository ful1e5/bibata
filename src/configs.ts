import { Colors } from 'bibata-live/app';

export const TYPES = ['Modern', 'Original'];

export const SIZES = [16, 20, 22, 24, 28, 32, 40, 48, 56, 64, 72, 80, 88, 96];

export const PLATFORMS = { x11: 'XCursor', Win: 'Windows' };

export const PREBUILT_COLORS: Colors = {
  Amber: { base: 'ff8300', outline: 'ffffff', watch: '001524' },
  Classic: { base: '000000', outline: 'ffffff' },
  Ice: { base: 'ffffff', outline: '000000' }
};

export const DB_SEEDS = { SIGNUP_DOWNLOAD: 20 };
