import React from 'react';
import { Wallet, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface NavbarProps {
  veBalance: number;
  sveBalance: number;
  onNavigateToSection: (sectionId: string) => void;
  onOpenQuickEarn: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  veBalance,
  sveBalance,
  onNavigateToSection,
  onOpenQuickEarn,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#161827]/90 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#dashboard"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg"
        >
          <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
            VELOOP
          </span>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold px-1.5 py-0.5 border border-slate-700 rounded bg-slate-900/60">
            Rewards
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => onNavigateToSection('refer-earn')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap bg-transparent border-0 p-0 text-slate-300 cursor-pointer text-sm font-medium"
          >
            Refer & Earn
          </button>
          <button
            onClick={() => onNavigateToSection('swap-center')}
            className="hover:text-blue-400 transition-colors whitespace-nowrap bg-transparent border-0 p-0 text-slate-300 cursor-pointer text-sm font-medium"
          >
            Swap Center
          </button>
          <button
            onClick={() => onNavigateToSection('bonus-ves')}
            className="hover:text-yellow-400 transition-colors whitespace-nowrap bg-transparent border-0 p-0 text-slate-300 cursor-pointer text-sm font-medium"
          >
            Bonus VEs
          </button>
          <button
            onClick={() => onNavigateToSection('captcha-tasks')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap bg-transparent border-0 p-0 text-slate-300 cursor-pointer text-sm font-medium"
          >
            Captcha Tasks
          </button>
          <button
            onClick={() => onNavigateToSection('exchange-center')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap bg-transparent border-0 p-0 text-slate-300 cursor-pointer text-sm font-medium"
          >
            Exchange Center
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Live Wallet Balance Pill */}
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold font-mono tabular-nums">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{formatNumber(veBalance)} VE</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1 text-blue-300 font-mono tabular-nums">
              <span>{formatNumber(sveBalance)} SVE</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onOpenQuickEarn}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all shadow-sm whitespace-nowrap cursor-pointer"
          >
            + Quick Boost
          </button>
        </div>
      </div>
    </header>
  );
};
