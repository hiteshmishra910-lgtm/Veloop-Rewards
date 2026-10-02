import React from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Layers,
  SlidersHorizontal,
  Grid,
  Eye,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { DisplayLayoutMode, ViewportMode, BannerId } from '../../types/rewards';

interface BannerControlsProps {
  layoutMode: DisplayLayoutMode;
  setLayoutMode: (mode: DisplayLayoutMode) => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  activeBannerId: BannerId;
  setActiveBannerId: (id: BannerId) => void;
  isReducedMotion: boolean;
  setIsReducedMotion: (reduced: boolean) => void;
}

export const BannerControls: React.FC<BannerControlsProps> = ({
  layoutMode,
  setLayoutMode,
  viewportMode,
  setViewportMode,
  activeBannerId,
  setActiveBannerId,
  isReducedMotion,
  setIsReducedMotion,
}) => {
  const bannerList: { id: BannerId; label: string }[] = [
    { id: 'refer-earn', label: '1. Refer & Earn' },
    { id: 'swap-center', label: '2. Swap Center' },
    { id: 'bonus-ves', label: '3. Bonus VEs' },
    { id: 'captcha-tasks', label: '4. Captcha Tasks' },
    { id: 'exchange-center', label: '5. Exchange Center' },
  ];

  return (
    <section className="w-full bg-[#181C2E]/90 border-b border-white/[0.08] py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Presentation Layout Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setLayoutMode('carousel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              layoutMode === 'carousel'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Interactive Carousel View"
          >
            <Layers size={14} />
            <span className="hidden sm:inline">Carousel Slider</span>
          </button>

          <button
            onClick={() => setLayoutMode('stack')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              layoutMode === 'stack'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="All 5 Banners Stacked"
          >
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">Full Stack (All 5)</span>
          </button>

          <button
            onClick={() => setLayoutMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              layoutMode === 'grid'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Grid Comparison"
          >
            <Grid size={14} />
            <span className="hidden sm:inline">Grid Overview</span>
          </button>

          <button
            onClick={() => setLayoutMode('inspect')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              layoutMode === 'inspect'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Design Spec Inspector"
          >
            <Eye size={14} />
            <span className="hidden sm:inline">Specs Inspector</span>
          </button>
        </div>

        {/* Center: Banner Quick Switcher (when in carousel or inspect mode) */}
        {(layoutMode === 'carousel' || layoutMode === 'inspect') && (
          <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-full">
            {bannerList.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveBannerId(b.id)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md whitespace-nowrap transition-colors ${
                  activeBannerId === b.id
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50'
                    : 'text-slate-400 hover:text-white bg-slate-900/40'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        )}

        {/* Right: Viewport Simulator & Accessibility */}
        <div className="flex items-center gap-3">
          {/* Viewport Width Frame Simulator */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewportMode === 'desktop'
                  ? 'bg-slate-800 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View (100% / 1440px)"
              aria-label="Desktop View"
            >
              <Monitor size={15} />
            </button>
            <button
              onClick={() => setViewportMode('tablet')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewportMode === 'tablet'
                  ? 'bg-slate-800 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet View (768px Frame)"
              aria-label="Tablet View"
            >
              <Tablet size={15} />
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewportMode === 'mobile'
                  ? 'bg-slate-800 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile View (390px Frame)"
              aria-label="Mobile View"
            >
              <Smartphone size={15} />
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <button
            onClick={() => setIsReducedMotion(!isReducedMotion)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isReducedMotion
                ? 'bg-purple-900/40 border-purple-500/50 text-purple-300'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle CSS Animation & Transitions (a11y)"
          >
            <span>{isReducedMotion ? 'Motion Off' : 'Motion On'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
