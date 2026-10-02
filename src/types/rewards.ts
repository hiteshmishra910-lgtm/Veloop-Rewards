export interface UserWalletState {
  veBalance: number;
  sveBalance: number;
  tier: 'Silver' | 'Gold' | 'Platinum' | 'VIP Diamond';
  completedTasks: number;
  referralsCount: number;
  streakDays: number;
}

export type BannerId = 'refer-earn' | 'swap-center' | 'bonus-ves' | 'captcha-tasks' | 'exchange-center';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export type DisplayLayoutMode = 'carousel' | 'stack' | 'grid' | 'inspect';

export interface BannerMeta {
  id: BannerId;
  title: string;
  category: string;
  headline: string;
  description: string;
  ctaText: string;
  badgeText: string;
  accentColor: string;
}
