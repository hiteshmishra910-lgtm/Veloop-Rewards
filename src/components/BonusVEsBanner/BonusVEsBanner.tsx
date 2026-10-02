import React from 'react';
import { RewardBanner } from '../RewardBanner/RewardBanner';
import { Flame, Sparkles, TrendingUp, Zap } from 'lucide-react';
import styles from './BonusVEsBanner.module.css';

interface BonusVEsBannerProps {
  onOpenBonusModal: () => void;
}

export const BonusVEsBanner: React.FC<BonusVEsBannerProps> = ({ onOpenBonusModal }) => {
  const illustration = (
    <div className={styles.bonusVisualContainer}>
      {/* Dynamic Multiplier Badge */}
      <div className={styles.multiplierBadge}>
        <Zap size={16} className="text-slate-950 fill-slate-950" />
        <span className="text-xs uppercase tracking-wider">Bonus Multiplier Active</span>
      </div>

      {/* Floating VE Coin Left */}
      <div className={styles.bonusCoinLeft}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-lg flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-slate-950/90 flex flex-col items-center justify-center border border-amber-300/40">
            <span className="text-[10px] font-black text-amber-200">BONUS</span>
            <span className="text-[8px] text-amber-400 -mt-1 font-bold">VE</span>
          </div>
        </div>
      </div>

      {/* Floating VE Coin Right */}
      <div className={styles.bonusCoinRight}>
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-300 via-amber-500 to-yellow-600 p-0.5 shadow-xl flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-slate-950/90 flex flex-col items-center justify-center border border-yellow-200/50">
            <span className="text-xs font-black text-yellow-300">BOOST</span>
            <span className="text-[9px] text-yellow-400 -mt-1 font-bold">TIER</span>
          </div>
        </div>
      </div>

      {/* Central 3D High-Tech Bonus Vault Container */}
      <div className={styles.vaultCore}>
        <svg width="150" height="135" viewBox="0 0 150 135" fill="none">
          {/* Base Platform Shadow */}
          <ellipse cx="75" cy="125" rx="60" ry="8" fill="rgba(10, 12, 22, 0.7)" />

          {/* Hexagonal Vault Chamber */}
          <path
            d="M 40 45 L 75 25 L 110 45 L 110 95 L 75 115 L 40 95 Z"
            fill="url(#vaultChamberGrad)"
            stroke="#475569"
            strokeWidth="2"
          />

          {/* Golden Core Glow */}
          <circle cx="75" cy="70" r="26" fill="url(#coreGlowGrad)" />
          <circle cx="75" cy="70" r="20" fill="#1E233B" stroke="#F59E0B" strokeWidth="2.5" />

          {/* Golden VE Insignia in Core */}
          <text
            x="75"
            y="76"
            textAnchor="middle"
            fill="#FDE047"
            fontSize="16"
            fontWeight="900"
            fontFamily="system-ui, sans-serif"
          >
            VE
          </text>

          {/* Radiant Beams */}
          <path d="M 75 35 L 75 42" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          <path d="M 75 98 L 75 105" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          <path d="M 45 70 L 52 70" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          <path d="M 98 70 L 105 70" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />

          {/* Gradients */}
          <defs>
            <linearGradient id="vaultChamberGrad" x1="40" y1="25" x2="110" y2="115" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2A3358" />
              <stop offset="50%" stopColor="#1C223A" />
              <stop offset="100%" stopColor="#121626" />
            </linearGradient>
            <radialGradient id="coreGlowGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Reward Progress Meter Tray */}
      <div className={styles.rewardMeterTray}>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Flame size={14} className="text-amber-400" />
            <span>5-Day Activity Streak</span>
          </div>
          <span className="text-slate-300 font-mono tabular-nums font-medium">Next Tier: 80%</span>
        </div>

        <div className={styles.meterProgressBar}>
          <div className={styles.meterProgressFill} />
        </div>

        <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400">
          <span>Active Streak Bonus</span>
          <span className="text-amber-200 font-semibold">+Boost Applied Today</span>
        </div>
      </div>
    </div>
  );

  return (
    <RewardBanner
      id="bonus-ves"
      kicker="Bonus VEs"
      badge="Tier Multiplier"
      heading="Get Extra VEs"
      description="Complete eligible activities and unlock additional VEs through special bonus opportunities."
      ctaText="Claim Bonus →"
      onCtaClick={onOpenBonusModal}
      ctaVariant="amber"
      ambientColor="rgba(245, 158, 11, 0.18)"
      metrics={[
        { label: 'Bonus Rate', value: 'Multiplier Active', subtext: 'eligible activities' },
        { label: 'Activity Streak', value: 'Streak Boost', subtext: 'daily opportunities' },
        { label: 'Extra Yield', value: 'Bonus Unlock', subtext: 'based on engagement' },
      ]}
      illustration={illustration}
      ariaLabel="Bonus VEs: Complete eligible activities and unlock additional VEs"
    />
  );
};
