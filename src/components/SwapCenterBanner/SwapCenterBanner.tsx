import React from 'react';
import { RewardBanner } from '../RewardBanner/RewardBanner';
import { ArrowDownUp, RefreshCw, Wallet, CheckCircle2 } from 'lucide-react';
import styles from './SwapCenterBanner.module.css';

interface SwapCenterBannerProps {
  onOpenSwapModal: () => void;
}

export const SwapCenterBanner: React.FC<SwapCenterBannerProps> = ({ onOpenSwapModal }) => {
  const illustration = (
    <div className={styles.swapVisualContainer}>
      <div className={styles.walletTray}>
        {/* Card 1: From Currency (VE - Standard Activity Balance) */}
        <div className={styles.currencyCardTop}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                <span className="text-xs font-black text-amber-300">VE</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-white">VELOOP VE</span>
                <span className="text-[10px] text-amber-400/90 font-medium px-1.5 py-0.2 bg-amber-400/10 rounded">Standard</span>
              </div>
              <span className="text-xs text-slate-400">Activity Balance</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-sm font-bold text-slate-100 tabular-nums">2,450.00</span>
            <span className="block text-[11px] text-slate-400 tabular-nums">Available</span>
          </div>
        </div>

        {/* Central Circular Swap Switcher */}
        <div className={styles.swapNodeWrapper}>
          <div className={styles.swapCircleButton} title="Swap Currency Direction">
            <ArrowDownUp size={18} />
          </div>
        </div>

        {/* Card 2: To Currency (SVE - Staked Yield Platform Balance) */}
        <div className={styles.currencyCardBottom}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                <span className="text-xs font-black text-blue-300">SVE</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-white">Staked SVE</span>
                <span className="text-[10px] text-blue-300/90 font-medium px-1.5 py-0.2 bg-blue-400/10 rounded">Yield Tier</span>
              </div>
              <span className="text-xs text-slate-400">APY Staking Pool</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-sm font-bold text-blue-300 tabular-nums">1,837.50</span>
            <span className="block text-[11px] text-slate-400 tabular-nums">Est. Output</span>
          </div>
        </div>

        {/* Live Utility Conversion Rate & Zero Slippage Badge */}
        <div className={styles.exchangeRateIndicator}>
          <RefreshCw size={12} className="text-blue-400" />
          <span className="tabular-nums">1 VE ≈ 0.75 SVE (Demo)</span>
          <span className="text-slate-500">·</span>
          <div className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 size={12} />
            <span>0% Slippage</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <RewardBanner
      id="swap-center"
      kicker="Conversion Utility"
      badge="Instant Liquidity"
      heading="Swap Center"
      description="Convert eligible reward balances between supported currencies and manage your rewards more efficiently."
      ctaText="Open Swap Center →"
      onCtaClick={onOpenSwapModal}
      ctaVariant="blue"
      ambientColor="rgba(59, 130, 246, 0.18)"
      metrics={[
        { label: 'Settlement Time', value: 'Instant', subtext: 'protocol routing' },
        { label: 'Protocol Fee', value: 'Zero Fee', subtext: 'platform subsidized' },
        { label: 'Pairs Supported', value: 'VE ⇄ SVE', subtext: 'bidirectional utility' },
      ]}
      illustration={illustration}
      ariaLabel="Swap Center: Convert eligible reward balances between supported currencies"
    />
  );
};
