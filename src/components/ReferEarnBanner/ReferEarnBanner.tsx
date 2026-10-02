import React from 'react';
import { RewardBanner } from '../RewardBanner/RewardBanner';
import { Gift, Users, Award, Sparkles, Share2, CheckCircle2 } from 'lucide-react';
import styles from './ReferEarnBanner.module.css';

interface ReferEarnBannerProps {
  onOpenReferralModal: () => void;
}

export const ReferEarnBanner: React.FC<ReferEarnBannerProps> = ({ onOpenReferralModal }) => {
  const illustration = (
    <div className={styles.referVisualContainer}>
      {/* SVG Connection Lines between Users and Central Gift */}
      <svg className={styles.connectionSvg} viewBox="0 0 440 250" fill="none">
        <defs>
          <linearGradient id="referralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Dynamic connection path from left user to center and right user */}
        <path
          d="M 100 50 C 160 70, 180 130, 220 140 C 260 130, 280 70, 340 55"
          stroke="url(#referralGrad)"
          strokeWidth="2.5"
          className={styles.connectionPath}
        />
        {/* Branching glow path to bottom reward pass */}
        <path
          d="M 220 170 C 240 190, 280 205, 320 210"
          stroke="rgba(245, 158, 11, 0.4)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>

      {/* User 1 Node (Referrer / Alex) */}
      <div className={styles.networkNodeLeft}>
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-[11px] font-bold shadow-inner">
          Alex
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-medium leading-none">Inviter</span>
          <span className="text-[11px] font-semibold text-blue-300 mt-0.5">Shared Link</span>
        </div>
      </div>

      {/* Center Share Node Pill */}
      <div className={styles.shareNodeBadge}>
        <Share2 size={11} className="text-amber-300" />
        <span>Invite Connected</span>
      </div>

      {/* User 2 Node (Invited Friend / Sara) */}
      <div className={styles.networkNodeRight}>
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 text-[11px] font-bold shadow-inner">
          Sara
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-amber-300 font-medium leading-none">Friend</span>
          <span className="text-[11px] font-semibold text-amber-100 mt-0.5">Joined & Active</span>
        </div>
      </div>

      {/* Central 3D-Styled Premium Gift Box */}
      <div className={styles.giftBoxWrapper}>
        <div className="relative w-36 h-32 flex items-center justify-center">
          {/* Subtle Backglow */}
          <div className="absolute inset-0 bg-amber-500/15 rounded-full filter blur-xl" />

          {/* Gift Box SVG Graphic */}
          <svg width="120" height="110" viewBox="0 0 140 130" fill="none">
            {/* Box Body Shadow */}
            <ellipse cx="70" cy="120" rx="55" ry="10" fill="rgba(10, 12, 22, 0.6)" />

            {/* Gift Box Base */}
            <rect x="25" y="46" width="90" height="70" rx="8" fill="#1C2138" stroke="#333C5E" strokeWidth="2" />
            <rect x="25" y="46" width="90" height="70" rx="8" fill="url(#boxBodyGrad)" />

            {/* Vertical Gold Ribbon */}
            <rect x="62" y="46" width="16" height="70" fill="url(#goldRibbonGrad)" />
            <rect x="62" y="46" width="2" height="70" fill="#FEF08A" opacity="0.6" />

            {/* Gift Box Lid */}
            <rect x="20" y="32" width="100" height="18" rx="5" fill="#252C4B" stroke="#414D78" strokeWidth="2" />
            <rect x="20" y="32" width="100" height="18" rx="5" fill="url(#lidGrad)" />
            <rect x="62" y="32" width="16" height="18" fill="url(#goldRibbonGrad)" />

            {/* Ribbon Bow on Top */}
            <path
              d="M 52 32 C 40 16, 55 10, 70 26 C 85 10, 100 16, 88 32 C 80 28, 76 24, 70 28 C 64 24, 60 28, 52 32 Z"
              fill="url(#goldRibbonGrad)"
              stroke="#D97706"
              strokeWidth="1.5"
            />
            {/* Center Knot */}
            <circle cx="70" cy="27" r="5" fill="#FDE047" stroke="#B45309" strokeWidth="1.5" />

            {/* Gradients */}
            <defs>
              <linearGradient id="boxBodyGrad" x1="25" y1="46" x2="115" y2="116" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#252D4D" />
                <stop offset="100%" stopColor="#141829" />
              </linearGradient>
              <linearGradient id="lidGrad" x1="20" y1="32" x2="120" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2F385F" />
                <stop offset="100%" stopColor="#1A2038" />
              </linearGradient>
              <linearGradient id="goldRibbonGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Floating VE Coin 1 */}
      <div className={styles.floatingCoin1}>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow-lg flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-amber-950/80 flex items-center justify-center border border-amber-300/40">
            <span className="text-[9px] font-black text-amber-200 tracking-tighter">VE</span>
          </div>
        </div>
      </div>

      {/* Floating VE Coin 2 */}
      <div className={styles.floatingCoin2}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-yellow-600 p-0.5 shadow-md flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-amber-950/70 flex items-center justify-center border border-yellow-200/50">
            <span className="text-[8px] font-black text-amber-200 tracking-tighter">VE</span>
          </div>
        </div>
      </div>

      {/* Floating VE Coin 3 */}
      <div className={styles.floatingCoin3}>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-sm flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
            <Sparkles size={10} className="text-amber-300" />
          </div>
        </div>
      </div>

      {/* Floating Milestone Reward Preview Card */}
      <div className={styles.rewardCardPreview}>
        <div className="p-1 rounded-md bg-amber-500/20 text-amber-400">
          <Award size={14} />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">
            Referral Milestone
          </span>
          <span className="text-[11px] font-bold text-amber-300">
            Reward Unlocked
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <RewardBanner
      id="refer-earn"
      kicker="Invite Friends. Earn Rewards."
      badge="High Reward"
      heading="Refer & Earn"
      description="Invite your friends to VELOOP Rewards and unlock exciting rewards when they complete eligible activities."
      ctaText="Refer & Earn →"
      onCtaClick={onOpenReferralModal}
      ctaVariant="gold"
      ambientColor="rgba(245, 158, 11, 0.16)"
      metrics={[
        { label: 'Referral Reward', value: 'Reward Available', subtext: 'for eligible invites' },
        { label: 'Activity Bonus', value: 'Bonus Unlock', subtext: 'on eligible activities' },
        { label: 'Growth Tier', value: 'Tier Multiplier', subtext: 'bonus opportunities' },
      ]}
      illustration={illustration}
      ariaLabel="Refer & Earn: Invite friends to VELOOP Rewards and unlock exciting rewards"
    />
  );
};
