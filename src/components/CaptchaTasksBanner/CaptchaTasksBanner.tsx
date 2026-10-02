import React from 'react';
import { RewardBanner } from '../RewardBanner/RewardBanner';
import { ShieldCheck, CheckCircle2, ChevronRight, Lock, Sparkles, Terminal } from 'lucide-react';
import styles from './CaptchaTasksBanner.module.css';

interface CaptchaTasksBannerProps {
  onOpenCaptchaModal: () => void;
}

export const CaptchaTasksBanner: React.FC<CaptchaTasksBannerProps> = ({ onOpenCaptchaModal }) => {
  const illustration = (
    <div className={styles.captchaVisualContainer}>
      {/* Floating Reward Stamp */}
      <div className={styles.rewardStamp}>
        <div className="flex items-center gap-1">
          <Sparkles size={13} className="text-yellow-200" />
          <span>Reward Available · Demo</span>
        </div>
      </div>

      {/* Terminal Card Simulation */}
      <div className={styles.terminalCard}>
        {/* Terminal Header */}
        <div className={styles.terminalHeader}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <ShieldCheck size={14} />
            </div>
            <span className="text-xs font-semibold text-slate-200">
              Human Verification Protocol
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Queue</span>
          </div>
        </div>

        {/* Captcha Challenge Box */}
        <div className={styles.challengeBlock}>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-mono">
              <Terminal size={12} className="text-slate-500" />
              <span>Demo Task: Accuracy Check</span>
            </div>
            <span className="text-slate-400">Drag to complete</span>
          </div>

          {/* Interactive Slide Track Animation */}
          <div className={styles.sliderTrack}>
            <div className={styles.sliderKnob}>
              <ChevronRight size={18} />
            </div>
          </div>
        </div>

        {/* Validation Result Status */}
        <div className="flex items-center justify-between pt-1">
          <div className={styles.verificationPill}>
            <CheckCircle2 size={13} />
            <span>Verified Task</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Validation</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">Accuracy Check</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <RewardBanner
      id="captcha-tasks"
      kicker="Accuracy-Based Verification"
      badge="Active Queue (Demo)"
      heading="Captcha Tasks"
      description="Complete available captcha tasks accurately and earn rewards for eligible submissions."
      ctaText="Start Task →"
      onCtaClick={onOpenCaptchaModal}
      ctaVariant="blue"
      ambientColor="rgba(59, 130, 246, 0.15)"
      metrics={[
        { label: 'Submissions', value: 'Accuracy Check', subtext: 'verification protocol' },
        { label: 'Bonus Yield', value: 'Bonus Opportunities', subtext: 'for eligible tasks' },
        { label: 'Task Queue', value: 'Eligible Tasks', subtext: 'active queue (demo)' },
      ]}
      illustration={illustration}
      ariaLabel="Captcha Tasks: Complete available captcha tasks accurately and earn rewards"
    />
  );
};
