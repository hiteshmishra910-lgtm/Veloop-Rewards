import React from 'react';
import { BannerId } from '../../types/rewards';
import { ShieldCheck, RefreshCw, Zap, Gift, CreditCard, Sparkles, CheckCircle } from 'lucide-react';

interface SpecsInspectorProps {
  activeBannerId: BannerId;
}

export const SpecsInspector: React.FC<SpecsInspectorProps> = ({ activeBannerId }) => {
  const getBannerSpecs = (id: BannerId) => {
    switch (id) {
      case 'refer-earn':
        return {
          title: 'Refer & Earn Banner',
          objective: 'Viral user acquisition & high-retention community growth without gaming tropes.',
          visualMetaphor:
            'Stylized node connection network bridging Referrer (Alex) and Invitee (Sara) with an embossed navy & gold gift chest, floating geometric VE coins, and tier status cards.',
          animations:
            'SVG dash-array network pulse (20s linear), dual floating VE coins with subtle rotation, 4s levitation on gift box, hover elevation.',
          ctaRole: 'Launches full referral cockpit with link generator, code copy, and tier rewards.',
          fintechPalette: 'Deep Navy (#1C2138), Satin Gold (#F59E0B), Soft Blue (#60A5FA), Silver (#CBD5E1).',
          targetHeights: 'Desktop: 430px | Tablet: 400px–440px | Mobile: 420px (stacked layout).',
          antiSlopAudit: 'Zero neon green/pink, zero pill capsules on metadata, clean unboxed typographic labels.',
        };
      case 'swap-center':
        return {
          title: 'Swap Center Banner',
          objective: 'Instant platform token & liquidity conversion utility (VE Activity Points ⇄ SVE Staked Yield).',
          visualMetaphor:
            'Dual institutional ledger cards displaying live balances, central circular 180° rotation swap node, and guaranteed zero-slippage verification pill.',
          animations:
            'Interactive hover card elevation, 180° rotational toggle on hover, subtle 4s pulse glow around circular node.',
          ctaRole: 'Opens interactive swap calculator with live exchange rate, slippage lock, and instant balance update.',
          fintechPalette: 'Slate Dark Navy (#1A223C), Amber Core (#FBBF24), Sapphire Blue (#3B82F6).',
          targetHeights: 'Desktop: 430px | Tablet: 400px | Mobile: 420px.',
          antiSlopAudit: 'Strict utility framing; distinctly separate from earning or reward redemption.',
        };
      case 'bonus-ves':
        return {
          title: 'Bonus VEs Banner',
          objective: 'Streak motivation and dynamic yield opportunities without claiming a fixed promise.',
          visualMetaphor:
            'Hexagonal high-tech vault core with radiant VE coin, dynamic multiplier floating badge (Up to 3.5×), and 5-Day activity streak progress meter.',
          animations:
            'Vault levitation (4s alternate), multiplier badge gentle pop (3s), meter shimmer fill, floating multiplied coins.',
          ctaRole: 'Opens Streak Tracker modal with interactive multiplier roll & celebratory micro-confetti.',
          fintechPalette: 'Royal Navy (#161A2E), Warm Gold (#F59E0B), Radiant Yellow (#FEF08A).',
          targetHeights: 'Desktop: 430px | Tablet: 410px | Mobile: 430px.',
          antiSlopAudit: 'Avoids fixed jackpot promises; emphasizes activity-linked multiplier.',
        };
      case 'captcha-tasks':
        return {
          title: 'Captcha Tasks Banner',
          objective: 'Accuracy-based human verification tasks clearly distinct from ad-click earning.',
          visualMetaphor:
            'Institutional security terminal with Human Verification Protocol header, interactive slide-track puzzle piece, verified task pill, and accuracy check validation badge.',
          animations:
            'Slide track knob simulation (5s loop), verified checkmark indicator, floating reward available stamp.',
          ctaRole: 'Launches real interactive alphanumeric security challenge with validation & reward credit.',
          fintechPalette: 'Deep Security Navy (#121626), Cyber Blue (#3B82F6), Emerald Verification (#34D399).',
          targetHeights: 'Desktop: 410px–450px | Tablet: 380px–540px | Mobile: 330px–520px.',
          antiSlopAudit: 'Zero scammy ad aesthetics; strictly presented as a verification task with quality scoring.',
        };
      case 'exchange-center':
      default:
        return {
          title: 'Exchange Center',
          objective: 'Real-world payout redemption into UPI Direct and partner e-gift cards (Amazon, Apple, Steam).',
          visualMetaphor:
            'Fanned physical & digital redemption instruments (UPI contactless settlement card + retail e-gift voucher) with eligible VE conversion indicator.',
          animations:
            'Card fan rotation on hover (-12° and 0°), floating VE coin entering settlement stream, rate pill levitation.',
          ctaRole: 'Opens payout catalog modal with UPI VPA input, voucher selection, and digital receipt generation.',
          fintechPalette: 'Midnight Slate (#0F172A), Gold Accent (#F59E0B), Emerald Settlement (#10B981).',
          targetHeights: 'Desktop: 410px–450px | Tablet: 380px–540px | Mobile: 330px–520px.',
          antiSlopAudit: 'Strict distinction from Swap Center: this executes external payout redemption.',
        };
    }
  };

  const specs = getBannerSpecs(activeBannerId);

  return (
    <div className="w-full bg-[#181C2E] border border-slate-700/80 rounded-2xl p-6 shadow-xl text-slate-200 mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
            Design System Inspection
          </span>
          <h3 className="text-xl font-bold text-white mt-0.5">{specs.title}</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
          <CheckCircle size={14} />
          <span>Fintech Quality Certified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 text-xs">
        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <span className="text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Feature Objective
          </span>
          <p className="text-slate-200 leading-relaxed">{specs.objective}</p>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <span className="text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Visual Metaphor
          </span>
          <p className="text-slate-200 leading-relaxed">{specs.visualMetaphor}</p>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <span className="text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Animation & Transitions
          </span>
          <p className="text-slate-200 leading-relaxed">{specs.animations}</p>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <span className="text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Interactive CTA Action
          </span>
          <p className="text-slate-200 leading-relaxed">{specs.ctaRole}</p>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <span className="text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Color Palette & Contrast
          </span>
          <p className="text-slate-200 leading-relaxed font-mono">{specs.fintechPalette}</p>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <span className="text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Responsive Target Dimensions
          </span>
          <p className="text-slate-200 leading-relaxed font-mono">{specs.targetHeights}</p>
        </div>
      </div>
    </div>
  );
};
