import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './RewardBanner.module.css';

export interface BannerMetric {
  label: string;
  value: string;
  subtext?: string;
}

export interface RewardBannerProps {
  id: string;
  kicker: string;
  heading: React.ReactNode;
  description: string;
  ctaText: string;
  onCtaClick: () => void;
  ctaVariant?: 'gold' | 'blue' | 'purple' | 'amber' | 'silver';
  ambientColor?: string;
  metrics?: BannerMetric[];
  illustration: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  badge?: string;
}

export const RewardBanner: React.FC<RewardBannerProps> = ({
  id,
  kicker,
  heading,
  description,
  ctaText,
  onCtaClick,
  ctaVariant = 'blue',
  ambientColor = 'rgba(59, 130, 246, 0.15)',
  metrics,
  illustration,
  className = '',
  ariaLabel,
  badge,
}) => {
  // Variant color definitions (fintech-grade, restrained)
  const getCtaStyle = () => {
    switch (ctaVariant) {
      case 'gold':
        return {
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          color: '#0F121F',
          boxShadow: '0 4px 14px rgba(245, 158, 11, 0.25)',
          border: '1px solid rgba(251, 191, 36, 0.4)',
        };
      case 'amber':
        return {
          background: 'linear-gradient(135deg, #FBBF24 0%, #B45309 100%)',
          color: '#0F121F',
          boxShadow: '0 4px 14px rgba(251, 191, 36, 0.25)',
          border: '1px solid rgba(253, 230, 138, 0.3)',
        };
      case 'purple':
        return {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
          color: '#FFFFFF',
          boxShadow: '0 4px 14px rgba(139, 92, 246, 0.25)',
          border: '1px solid rgba(167, 139, 250, 0.3)',
        };
      case 'silver':
        return {
          background: 'linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)',
          color: '#0F172A',
          boxShadow: '0 4px 14px rgba(148, 163, 184, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
        };
      case 'blue':
      default:
        return {
          background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
          color: '#FFFFFF',
          boxShadow: '0 4px 14px rgba(59, 130, 246, 0.25)',
          border: '1px solid rgba(96, 165, 250, 0.3)',
        };
    }
  };

  return (
    <article
      id={id}
      className={`${styles.bannerRoot} ${className}`}
      aria-label={ariaLabel || `${kicker}: ${typeof heading === 'string' ? heading : ''}`}
    >
      {/* Background texture & ambient lighting wrapped in contained layer */}
      <div className={styles.backgroundLayer} aria-hidden="true">
        <div className={styles.backgroundPattern} />
        <div
          className={styles.ambientOrb}
          style={{
            width: '380px',
            height: '380px',
            background: ambientColor,
            right: '5%',
            top: '-10%',
          }}
        />
        <div
          className={styles.ambientOrb}
          style={{
            width: '260px',
            height: '260px',
            background: 'rgba(255, 255, 255, 0.04)',
            left: '-5%',
            bottom: '-10%',
          }}
        />
      </div>

      <div className={styles.containerGrid}>
        {/* Left Column: Content */}
        <div className={styles.contentCol}>
          <div className={styles.metaHeader}>
            <span className={styles.metaKicker}>{kicker}</span>
            {badge && (
              <>
                <span className={styles.metaDot} aria-hidden="true">·</span>
                <span style={{ color: '#F59E0B' }}>{badge}</span>
              </>
            )}
          </div>

          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{description}</p>

          {/* Pill-less Clean Financial Metadata Row */}
          {metrics && metrics.length > 0 && (
            <div className={styles.metricRow}>
              {metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                    {metric.label}
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-base font-semibold text-slate-100 tabular-nums">
                      {metric.value}
                    </span>
                    {metric.subtext && (
                      <span className="text-xs text-slate-400 font-normal">
                        {metric.subtext}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Accessible Action Button */}
          <div>
            <button
              type="button"
              onClick={onCtaClick}
              className={styles.ctaButton}
              style={getCtaStyle()}
              aria-label={ctaText}
            >
              <span>{ctaText.replace(/\s*→\s*$/, '')}</span>
              <ArrowRight size={18} className={styles.ctaArrow} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Right Column: High-Fidelity Feature Visual */}
        <div className={styles.visualCol} aria-hidden="true">
          {illustration}
        </div>
      </div>
    </article>
  );
};
