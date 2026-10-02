import React, { useState } from 'react';
import { X, Copy, Check, Users, Gift, Share2, Award, Sparkles } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface ReferEarnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInviteSuccess: (rewardAmount: number) => void;
  userReferrals: number;
}

export const ReferEarnModal: React.FC<ReferEarnModalProps> = ({
  isOpen,
  onClose,
  onInviteSuccess,
  userReferrals,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [inviteSimulated, setInviteSimulated] = useState(false);

  if (!isOpen) return null;

  const referralCode = 'VELOOP-VIP88';
  const referralLink = `https://veloop.rewards/join?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSimulateInvite = () => {
    setInviteSimulated(true);
    onInviteSuccess(500);
    setTimeout(() => setInviteSimulated(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-[#1a1e32] border border-slate-700/80 rounded-2xl shadow-2xl p-6 overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="refer-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Gift size={20} />
            </div>
            <div>
              <h3 id="refer-title" className="text-lg font-bold text-white">
                Refer & Earn Program
              </h3>
              <p className="text-xs text-slate-400">
                Invite friends and unlock rewards when they complete eligible activities.
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
        <div className="py-4 space-y-5">
          {/* Referral Stats Banner */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Your Referrals</span>
              <span className="text-lg font-bold text-white tabular-nums">{userReferrals} Active</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Bonus Per Invite</span>
              <span className="text-lg font-bold text-amber-400 tabular-nums">500 VE</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Activity Match</span>
              <span className="text-lg font-bold text-blue-400 tabular-nums">10% Tier</span>
            </div>
          </div>

          {/* Share Referral Link Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Your Exclusive Invitation Link</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs font-mono text-slate-300 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copiedLink ? <Check size={15} /> : <Copy size={15} />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Referral Code Quick Copy */}
          <div className="flex items-center justify-between p-3 bg-slate-900/40 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Referral Code:</span>
              <span className="font-mono text-sm font-bold text-amber-300">{referralCode}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedCode ? 'Copied' : 'Copy code'}</span>
            </button>
          </div>

          {/* Tier Milestones */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Referral Tier Milestones</span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2">
                  <Award size={15} className="text-slate-400" />
                  <span>Tier 1 (1 - 5 Friends)</span>
                </div>
                <span className="font-semibold text-amber-400">500 VE / friend</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg border border-amber-500/30">
                <div className="flex items-center gap-2">
                  <Award size={15} className="text-amber-400" />
                  <span className="text-amber-200">Tier 2 (6 - 20 Friends)</span>
                </div>
                <span className="font-semibold text-amber-400">750 VE + 5% Match</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-purple-400" />
                  <span>Tier 3 (21+ VIP Ambassadors)</span>
                </div>
                <span className="font-semibold text-purple-300">1,000 VE + 10% Match</span>
              </div>
            </div>
          </div>

          {/* Test Simulation Button */}
          <div className="pt-2">
            <button
              onClick={handleSimulateInvite}
              disabled={inviteSimulated}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Users size={16} />
              <span>
                {inviteSimulated ? 'Simulated Friend Joined! (+500 VE Credited)' : 'Simulate Friend Signup & Earn +500 VE'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
