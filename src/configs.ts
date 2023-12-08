import { Color, Colors, Delays } from 'bibata/app';

export const VERSIONS = ['1.0.0-alpha.0', '1.0.0-alpha.1'];

export const SPONSOR_API_ENDPOINT =
  'https://sponsor-spotlight.vercel.app/api/fetch';

export const BUG_REPORT_ENDPOINT = (title: string, body: string) => {
  return `https://github.com/ful1e5/bibata/issues/new?labels=bug,auto+generated&title=${title}&body=${body}`;
};

export const TYPES = ['Modern', 'Original'];

export const SIZES = [16, 20, 22, 24, 28, 32, 40, 48, 56, 64, 72, 80, 88, 96];

export const WATCH_COLORS = {
  c1: '#32a0da',
  c2: '#7eba41',
  c3: '#f05024',
  c4: '#fcb813'
};

export const COLORS_MASK: Color = {
  base: '#00ff00',
  outline: '#0000ff',
  watch: { bg: '#ff0000', ...WATCH_COLORS }
};

export const COLORS: Colors = {
  Amber: { base: '#ff8300', outline: '#ffffff', watch: { bg: '#001524' } },
  Classic: { base: '#000000', outline: '#ffffff' },
  Ice: { base: '#ffffff', outline: '#000000' }
};

export const DELAYS: Delays = {
  1: { frames: 108, delay: 30 },
  2: { frames: 54, delay: 30 },
  3: { frames: 36, delay: 30 }
};

export const DB_SEEDS = {
  FRESH_SIGNUP_DOWNLOADS: 20,
  DOWNLOAD_MULTIPLIER: 10,
  DOWNLOADS_PER_CENTS: (cents: number) => cents * DB_SEEDS.DOWNLOAD_MULTIPLIER // 1000 public Downloads per dollar
};
