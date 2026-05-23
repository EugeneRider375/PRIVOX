'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Thermometer, Droplets, Car, Radio, ArrowUpRight } from 'lucide-react';

const pilots = [
  {
    icon: Thermometer,
    key: 'climate',
    accentColor: '#06b6d4',
    statusKey: 'climateStatus' as const,
    metrics: [{ label: 'Zones', value: '12' }, { label: 'Alerts/d', value: '48' }],
    chartData: [40, 55, 45, 65, 50, 70, 60, 75, 65, 80],
  },
  {
    icon: Droplets,
    key: 'garage',
    accentColor: '#3b82f6',
    statusKey: 'garageStatus' as const,
    metrics: [{ label: 'Sensors', value: '8' }, { label: 'Events', value: '124' }],
    chartData: [30, 45, 35, 50, 40, 60, 45, 65, 50, 70],
  },
  {
    icon: Car,
    key: 'parking',
    accentColor: '#22c55e',
    statusKey: 'parkingStatus' as const,
    metrics: [{ label: 'Spots', value: '64' }, { label: 'Live', value: '41/64' }],
    chartData: [60, 70, 75, 65, 80, 72, 85, 78, 90, 82],
  },
  {
    icon: Radio,
    key: 'ptt',
    accentColor: '#a855f7',
    statusKey: 'pttStatus' as const,
    metrics: [{ label: 'Users', value: '24' }, { label: 'Uptime', value: '99.9%' }],
    chartData: [20, 35, 25, 45, 30, 55, 40, 60, 45, 65],
  },
];

/* Status badge styles */
const statusStyles: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Pilot: {
    bg: 'rgba(6,182,212,0.1)',
    text: '#06b6d4',
    border: 'rgba(6,182,212,0.25)',
    dot: '#06b6d4',
  },
  Пилот: {
    bg: 'rgba(6,182,212,0.1)',
    text: '#06b6d4',
    border: 'rgba(6,182,212,0.25)',
    dot: '#06b6d4',
  },
  Prototype: {
    bg: 'rgba(249,115,22,0.1)',
    text: '#f97316',
    border: 'rgba(249,115,22,0.25)',
    dot: '#f97316',
  },
  Прототип: {
    bg: 'rgba(249,115,22,0.1)',
    text: '#f97316',
    border: 'rgba(249,115,22,0.25)',
    dot: '#f97316',
  },
  'In Development': {
    bg: 'rgba(168,85,247,0.1)',
    text: '#a855f7',
    border: 'rgba(168,85,247,0.25)',
    dot: '#a855f7',
  },
  'В разработке': {
    bg: 'rgba(168,85,247,0.1)',
    text: '#a855f7',
    border: 'rgba(168,85,247,0.25)',
    dot: '#a855f7',
  },
};

function getStatusStyle(status: string) {
  return statusStyles[status] ?? {
    bg: 'rgba(100,116,139,0.1)',
    text: '#94a3b8',
    border: 'rgba(100,116,139,0.25)',
    dot: '#64748b',
  };
}

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 30;
  const w = 76;
  const pts = data.map((v, i) =>
    `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`
  ).join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`g-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={`0,${h} ${pts} ${w},${h}`}
        fill={`url(#g-${color.replace('#', '')})`}
      />
    </svg>
  );
}

export default function PilotProjectsSection() {
  const t = useTranslations('pilots');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pilots" className="relative section-padding bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/4 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative container-width">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 glass border border-cyan-500/20 rounded-full mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
            <span className="text-xs font-medium text-cyan-400 tracking-widest uppercase">{t('badge')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pilots.map(({ icon: Icon, key, accentColor, statusKey, metrics, chartData }, i) => {
            const statusLabel = t(statusKey);
            const styles = getStatusStyle(statusLabel);

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${accentColor}20`,
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}45`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${accentColor}12`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}20`;
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(to right, transparent, ${accentColor}55, transparent)` }}
                />

                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}
                    >
                      <Icon size={18} style={{ color: accentColor }} />
                    </div>

                    {/* Status badge */}
                    <div
                      className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-medium font-mono"
                      style={{
                        background: styles.bg,
                        color: styles.text,
                        border: `1px solid ${styles.border}`,
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: styles.dot }}
                      />
                      {statusLabel}
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-white font-bold text-base mb-1.5">
                    {t(`${key}Title` as 'climateTitle')}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {t(`${key}Desc` as 'climateDesc')}
                  </p>

                  {/* Chart row */}
                  <div className="flex items-end justify-between mb-3">
                    <MiniChart data={chartData} color={accentColor} />
                    <div className="flex flex-col items-end gap-1">
                      {metrics.map((m) => (
                        <div key={m.label} className="text-right">
                          <div className="text-xs font-bold text-white">{m.value}</div>
                          <div className="text-[9px] text-slate-600 font-mono">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* View details */}
                  <button
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100"
                    style={{
                      background: `${accentColor}12`,
                      color: accentColor,
                      border: `1px solid ${accentColor}25`,
                    }}
                  >
                    {t('viewProject')}
                    <ArrowUpRight size={11} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
