import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { BannerControls } from './components/BannerControls/BannerControls';
import { ReferEarnBanner } from './components/ReferEarnBanner/ReferEarnBanner';
import { SwapCenterBanner } from './components/SwapCenterBanner/SwapCenterBanner';
import { BonusVEsBanner } from './components/BonusVEsBanner/BonusVEsBanner';
import { CaptchaTasksBanner } from './components/CaptchaTasksBanner/CaptchaTasksBanner';
import { ExchangeCenterBanner } from './components/ExchangeCenterBanner/ExchangeCenterBanner';
import { ReferEarnModal } from './components/Modals/ReferEarnModal';
import { SwapCenterModal } from './components/Modals/SwapCenterModal';
import { BonusModal } from './components/Modals/BonusModal';
import { CaptchaTaskModal } from './components/Modals/CaptchaTaskModal';
import { ExchangeModal } from './components/Modals/ExchangeModal';
import { SpecsInspector } from './components/SpecsInspector/SpecsInspector';
import { ToastContainer, ToastMessage } from './components/Toast/Toast';
import { BannerId, DisplayLayoutMode, ViewportMode, UserWalletState } from './types/rewards';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, Shield, ArrowUpRight } from 'lucide-react';

export default function App() {
  // Live user reward wallet state
  const [wallet, setWallet] = useState<UserWalletState>({
    veBalance: 4850,
    sveBalance: 1200,
    tier: 'Platinum',
    completedTasks: 42,
    referralsCount: 8,
    streakDays: 5,
  });

  // Presentation & layout settings
  const [layoutMode, setLayoutMode] = useState<DisplayLayoutMode>('carousel');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [activeBannerId, setActiveBannerId] = useState<BannerId>('refer-earn');
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modal states
  const [activeModal, setActiveModal] = useState<BannerId | 'quick-earn' | null>(null);

  const bannerOrder: BannerId[] = [
    'refer-earn',
    'swap-center',
    'bonus-ves',
    'captcha-tasks',
    'exchange-center',
  ];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance carousel when active and not paused
  useEffect(() => {
    if (layoutMode !== 'carousel' || !autoPlay) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveBannerId((curr) => {
        const nextIdx = (bannerOrder.indexOf(curr) + 1) % bannerOrder.length;
        return bannerOrder[nextIdx];
      });
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [layoutMode, autoPlay]);

  const addToast = (type: 'success' | 'info', title: string, description?: string) => {
    const newToast: ToastMessage = {
      id: Date.now().toString(),
      type,
      title,
      description,
    };
    setToasts((prev) => [...prev.slice(-3), newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Carousel manual controls
  const handlePrevBanner = () => {
    const currIdx = bannerOrder.indexOf(activeBannerId);
    const prevIdx = (currIdx - 1 + bannerOrder.length) % bannerOrder.length;
    setActiveBannerId(bannerOrder[prevIdx]);
  };

  const handleNextBanner = () => {
    const currIdx = bannerOrder.indexOf(activeBannerId);
    const nextIdx = (currIdx + 1) % bannerOrder.length;
    setActiveBannerId(bannerOrder[nextIdx]);
  };

  // Handlers for modal actions with state updates
  const handleInviteSuccess = (rewardAmount: number) => {
    setWallet((prev) => ({
      ...prev,
      veBalance: prev.veBalance + rewardAmount,
      referralsCount: prev.referralsCount + 1,
    }));
    addToast('success', 'Referral Reward Credited', `+${rewardAmount} VE points added to your balance.`);
  };

  const handleExecuteSwap = (fromCurrency: 'VE' | 'SVE', fromAmount: number, toAmount: number) => {
    setWallet((prev) => {
      if (fromCurrency === 'VE') {
        return {
          ...prev,
          veBalance: prev.veBalance - fromAmount,
          sveBalance: prev.sveBalance + toAmount,
        };
      } else {
        return {
          ...prev,
          sveBalance: prev.sveBalance - fromAmount,
          veBalance: prev.veBalance + toAmount,
        };
      }
    });
    addToast('success', 'Currency Swap Executed', `Swapped ${fromAmount} ${fromCurrency} successfully.`);
  };

  const handleClaimBonus = (rewardAmount: number) => {
    setWallet((prev) => ({
      ...prev,
      veBalance: prev.veBalance + rewardAmount,
      streakDays: Math.min(7, prev.streakDays + 1),
    }));
    addToast('success', 'Bonus Multiplier Unlocked', `Claimed +${rewardAmount} VE from daily streak!`);
  };

  const handleCompleteCaptcha = (rewardAmount: number) => {
    setWallet((prev) => ({
      ...prev,
      veBalance: prev.veBalance + rewardAmount,
      completedTasks: prev.completedTasks + 1,
    }));
    addToast('success', 'Task Verified', `Earned +${rewardAmount} VE for completing human verification.`);
  };

  const handleRedeemRewards = (veCost: number, rewardLabel: string) => {
    setWallet((prev) => ({
      ...prev,
      veBalance: prev.veBalance - veCost,
    }));
    addToast('success', 'Redemption Dispatched', `Redeemed ${rewardLabel} using ${veCost} VE.`);
  };

  // Render individual banner by ID
  const renderBanner = (id: BannerId) => {
    switch (id) {
      case 'refer-earn':
        return (
          <ReferEarnBanner
            key="refer-earn"
            onOpenReferralModal={() => setActiveModal('refer-earn')}
          />
        );
      case 'swap-center':
        return (
          <SwapCenterBanner
            key="swap-center"
            onOpenSwapModal={() => setActiveModal('swap-center')}
          />
        );
      case 'bonus-ves':
        return (
          <BonusVEsBanner
            key="bonus-ves"
            onOpenBonusModal={() => setActiveModal('bonus-ves')}
          />
        );
      case 'captcha-tasks':
        return (
          <CaptchaTasksBanner
            key="captcha-tasks"
            onOpenCaptchaModal={() => setActiveModal('captcha-tasks')}
          />
        );
      case 'exchange-center':
      default:
        return (
          <ExchangeCenterBanner
            key="exchange-center"
            onOpenExchangeModal={() => setActiveModal('exchange-center')}
          />
        );
    }
  };

  // Viewport simulator container styles
  const getViewportContainerStyles = (): React.CSSProperties => {
    if (viewportMode === 'tablet') {
      return {
        maxWidth: '768px',
        margin: '0 auto',
        padding: '0 1rem',
        borderLeft: '1px dashed rgba(255,255,255,0.15)',
        borderRight: '1px dashed rgba(255,255,255,0.15)',
      };
    }
    if (viewportMode === 'mobile') {
      return {
        maxWidth: '390px',
        margin: '0 auto',
        padding: '0 0.5rem',
        borderLeft: '1px dashed rgba(255,255,255,0.2)',
        borderRight: '1px dashed rgba(255,255,255,0.2)',
      };
    }
    return {
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
    };
  };

  return (
    <div
      className={`min-h-screen bg-[#161827] text-slate-100 flex flex-col ${
        isReducedMotion ? 'motion-reduce' : ''
      }`}
    >
      {/* Zone 1, 2, 3 Top Bar Contract */}
      <Navbar
        veBalance={wallet.veBalance}
        sveBalance={wallet.sveBalance}
        onNavigateToSection={(sectionId) => {
          setLayoutMode('stack');
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenQuickEarn={() => setActiveModal('bonus-ves')}
      />

      {/* Presentation & Testing Controls Toolbar */}
      <BannerControls
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        viewportMode={viewportMode}
        setViewportMode={setViewportMode}
        activeBannerId={activeBannerId}
        setActiveBannerId={setActiveBannerId}
        isReducedMotion={isReducedMotion}
        setIsReducedMotion={setIsReducedMotion}
      />

      {/* Main Banner Presentation Canvas */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div style={getViewportContainerStyles()} className="transition-all duration-300">
          {/* Header Context Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-1">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                VELOOP Rewards Engagement System
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                Fintech Promotion & Utility Suite
              </h1>
            </div>

            {/* Quick status information */}
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Live Settlement Network
              </span>
              <span>·</span>
              <span className="font-mono text-slate-300">{wallet.tier} Member</span>
            </div>
          </div>

          {/* MODE 1: Interactive Featured Carousel */}
          {layoutMode === 'carousel' && (
            <div className="relative space-y-4">
              {/* Active Banner Container */}
              <div className="w-full transition-opacity duration-300">
                {renderBanner(activeBannerId)}
              </div>

              {/* Carousel Pagination & Indicator Controls */}
              <div className="flex items-center justify-between px-2 pt-2">
                {/* Dots indicator */}
                <div className="flex items-center gap-2">
                  {bannerOrder.map((id, idx) => (
                    <button
                      key={id}
                      onClick={() => setActiveBannerId(id)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeBannerId === id
                          ? 'w-8 bg-amber-400'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows & Auto-play Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAutoPlay(!autoPlay)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                    title={autoPlay ? 'Pause Auto-Play' : 'Start Auto-Play'}
                    aria-label={autoPlay ? 'Pause Auto-Play' : 'Start Auto-Play'}
                  >
                    {autoPlay ? <Pause size={14} /> : <Play size={14} />}
                  </button>

                  <button
                    onClick={handlePrevBanner}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    aria-label="Previous Banner"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    onClick={handleNextBanner}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    aria-label="Next Banner"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: Full Vertical Stack (All 5 Banners) */}
          {layoutMode === 'stack' && (
            <div className="space-y-8">
              {bannerOrder.map((id) => (
                <div key={id} className="w-full">
                  {renderBanner(id)}
                </div>
              ))}
            </div>
          )}

          {/* MODE 3: 2-Column Responsive Grid View */}
          {layoutMode === 'grid' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bannerOrder.map((id) => (
                <div key={id} className="w-full">
                  {renderBanner(id)}
                </div>
              ))}
            </div>
          )}

          {/* MODE 4: Design Specs Inspector View */}
          {layoutMode === 'inspect' && (
            <div className="space-y-6">
              <div className="w-full">{renderBanner(activeBannerId)}</div>
              <SpecsInspector activeBannerId={activeBannerId} />
            </div>
          )}
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="w-full bg-[#131522] border-t border-white/[0.08] py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">VELOOP Rewards</span>
            <span>·</span>
            <span>Fintech Engagement Architecture</span>
            <span>·</span>
            <span className="text-slate-500 font-mono">v2.4 Production</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Desktop: 410px–450px</span>
            <span>Tablet: 380px–540px</span>
            <span>Mobile: 330px–520px</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals for every banner CTA */}
      <ReferEarnModal
        isOpen={activeModal === 'refer-earn'}
        onClose={() => setActiveModal(null)}
        onInviteSuccess={handleInviteSuccess}
        userReferrals={wallet.referralsCount}
      />

      <SwapCenterModal
        isOpen={activeModal === 'swap-center'}
        onClose={() => setActiveModal(null)}
        veBalance={wallet.veBalance}
        sveBalance={wallet.sveBalance}
        onExecuteSwap={handleExecuteSwap}
      />

      <BonusModal
        isOpen={activeModal === 'bonus-ves'}
        onClose={() => setActiveModal(null)}
        streakDays={wallet.streakDays}
        onClaimBonus={handleClaimBonus}
      />

      <CaptchaTaskModal
        isOpen={activeModal === 'captcha-tasks'}
        onClose={() => setActiveModal(null)}
        onCompleteTask={handleCompleteCaptcha}
      />

      <ExchangeModal
        isOpen={activeModal === 'exchange-center'}
        onClose={() => setActiveModal(null)}
        veBalance={wallet.veBalance}
        onRedeemRewards={handleRedeemRewards}
      />

      {/* Global Toast Feedback Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
