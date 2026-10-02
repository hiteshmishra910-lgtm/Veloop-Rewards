import React, { useState } from 'react';
import { X, Flame, Zap, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatNumber } from '../../utils/formatters';

interface BonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakDays: number;
  onClaimBonus: (rewardAmount: number) => void;
}

export const BonusModal: React.FC<BonusModalProps> = ({
  isOpen,
  onClose,
  streakDays,
  onClaimBonus,
}) => {
  const [isUnlocking, setIsUnlocking] = useState<boolean>(false);
  const [claimedMultiplier, setClaimedMultiplier] = useState<number | null>(null);
  const [claimedReward, setClaimedReward] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleClaim = () => {
    setIsUnlocking(true);

    setTimeout(() => {
      // Generate realistic bonus multiplier between 2.0x and 3.5x
      const multipliers = [2.0, 2.5, 3.0, 3.5];
      const selectedMultiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
      const basePoints = 150;
      const totalBonus = Math.round(basePoints * selectedMultiplier);

      setClaimedMultiplier(selectedMultiplier);
      setClaimedReward(totalBonus);
      setIsUnlocking(false);

      // Trigger refined confetti celebration
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#F59E0B', '#FBBF24', '#CBD5E1', '#3B82F6'],
      });

      onClaimBonus(totalBonus);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#1a1e32] border border-slate-700/80 rounded-2xl shadow-2xl p-6 overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bonus-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Zap size={20} />
            </div>
            <div>
              <h3 id="bonus-title" className="text-lg font-bold text-white">
                Daily Bonus Opportunity
              </h3>
              <p className="text-xs text-slate-400">
                Unlock dynamic VE multipliers based on your activity streak.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="py-4 space-y-4">
          {/* Streak Ladder (Day 1 - Day 7) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                <Flame size={15} />
                <span>Active Streak: {streakDays} Days</span>
              </div>
              <span className="text-[11px] text-slate-400">7-Day Mega Multiplier</span>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                const isCompleted = day <= streakDays;
                const isCurrent = day === streakDays + 1;
                return (
                  <div
                    key={day}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-center border transition-all ${
                      isCompleted
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                        : isCurrent
                        ? 'bg-blue-500/20 border-blue-400 text-blue-300 ring-2 ring-blue-400/30'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-mono">D{day}</span>
                    <span className="text-xs font-bold mt-0.5">
                      {isCompleted ? '✓' : day === 7 ? '3.5×' : `${1 + day * 0.3}×`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Vault Core */}
          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {claimedReward ? (
              <div className="animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/50 mx-auto flex items-center justify-center text-amber-300 mb-3">
                  <Sparkles size={32} />
                </div>
                <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Multiplier Applied: {claimedMultiplier}×
                </div>
                <div className="text-3xl font-extrabold text-white mt-1 tabular-nums">
                  +{claimedReward} VE
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Bonus VEs have been added to your live wallet balance.
                </p>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 mx-auto mb-3 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-amber-300">
                    <Award size={30} />
                  </div>
                </div>
                <h4 className="text-base font-bold text-white">Daily Mystery Multiplier</h4>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                  Tap below to roll today’s bonus tier multiplier and boost your earnings.
                </p>
              </div>
            )}
          </div>

          {/* Claim Action */}
          <div className="pt-2">
            {claimedReward ? (
              <button
                onClick={onClose}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={16} />
                <span>Return to Dashboard</span>
              </button>
            ) : (
              <button
                onClick={handleClaim}
                disabled={isUnlocking}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isUnlocking ? (
                  <>
                    <Sparkles size={16} className="animate-spin" />
                    <span>Unlocking Dynamic Multiplier...</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    <span>Roll & Claim Today’s Bonus Multiplier</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
