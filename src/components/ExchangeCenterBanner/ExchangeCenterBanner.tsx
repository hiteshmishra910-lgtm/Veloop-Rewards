import React from 'react';
import { RewardBanner } from '../RewardBanner/RewardBanner';
import { CreditCard, Gift, ArrowRight, Zap, CheckCircle2, ShoppingBag } from 'lucide-react';
import styles from './ExchangeCenterBanner.module.css';

interface ExchangeCenterBannerProps {
  onOpenExchangeModal: () => void;
}

export const ExchangeCenterBanner: React.FC<ExchangeCenterBannerProps> = ({ onOpenExchangeModal }) => {
  const illustration = (
    <div className={styles.exchangeVisualContainer}>
      {/* Floating Redemption Rate Pill */}
      <div className={styles.flowIndicator}>
        <span className="text-amber-300">Eligible VEs</span>
        <ArrowRight size={12} className="text-slate-400" />
        <span className="text-emerald-400">Supported Payouts (Demo)</span>
      </div>

      <div className={styles.cardsCluster}>
        {/* Card 1: E-Gift Card (Retail Partner) */}
        <div className={styles.voucherCardLeft}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <ShoppingBag size={14} className="text-amber-400" />
              <span>E-Gift Voucher</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">CODE: #VLP-88</span>
          </div>
          <div className="mt-4">
            <span className="text-xs text-slate-400 block">Amazon / Steam / Apple</span>
            <span className="text-base font-bold text-slate-100 tabular-nums">Instant Voucher</span>
          </div>
        </div>

        {/* Card 2: UPI / Direct Bank Settlement Payout Card */}
        <div className={styles.payoutCardCenter}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-[10px]">
                UPI
              </div>
              <span className="text-xs font-bold text-white tracking-wide">
                Direct Payout
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <CheckCircle2 size={12} />
              <span>0% Payout Fee</span>
            </div>
          </div>

          <div className="my-2">
            <span className="text-[11px] text-slate-400 block">Payout Destination</span>
            <span className="text-sm font-semibold text-slate-200 font-mono">
              user@okhdfcbank
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
            <span className="text-slate-400">Settlement Speed</span>
            <span className="font-semibold text-amber-300">Under 60 Secs</span>
          </div>
        </div>

        {/* Floating Coin Entering the Payout Stream */}
        <div className={styles.floatingPayoutCoin}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center border border-yellow-200/50">
              <span className="text-[10px] font-black text-amber-200">VE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <RewardBanner
      id="exchange-center"
      kicker="Redeem Your Rewards"
      badge="Verified Payouts"
      heading="Exchange Center"
      description="Explore available redemption options and exchange eligible VEs for supported rewards."
      ctaText="Open Exchange Center →"
      onCtaClick={onOpenExchangeModal}
      ctaVariant="gold"
      ambientColor="rgba(245, 158, 11, 0.16)"
      metrics={[
        { label: 'Available Payouts', value: 'Supported Rails', subtext: 'UPI & gift cards' },
        { label: 'Redemption Fee', value: 'Zero Fee', subtext: 'platform subsidized' },
        { label: 'Transfer Window', value: 'Fast Rail', subtext: 'eligible redemptions' },
      ]}
      illustration={illustration}
      ariaLabel="Exchange Center: Redeem your rewards for UPI, gift cards, and supported payouts"
    />
  );
};
