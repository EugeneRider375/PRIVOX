'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Radio, Cpu, MapPin, Bell, Monitor, Lock } from 'lucide-react';

const features = [
  { icon: Radio, key: 'ptt', color: 'cyan', gradient: 'from-cyan-500/20 to-blue-500/5' },
  { icon: Cpu, key: 'sensors', color: 'blue', gradient: 'from-blue-500/20 to-purple-500/5' },
  { icon: MapPin, key: 'gps', color: 'green', gradient: 'from-green-500/20 to-cyan-500/5' },
  { icon: Bell, key: 'alerts', color: 'orange', gradient: 'from-orange-500/20 to-red-500/5' },
  { icon: Monitor, key: 'dashboard', color: 'purple', gradient: 'from-purple-500/20 to-blue-500/5' },
  { icon: Lock, key: 'infra', color: 'slate', gradient: 'from-slate-500/20 to-cyan-500/5' },
];

const iconColors: Record<string, string> = {
  cyan: 'text-cyan-400',
  blue: 'text-blue-400',
  green: 'text-green-400',
  orange: 'text-orange-400',
  purple: 'text-purple-400',
  slate: 'text-slate-400',
};

const borderColors: Record<string, string> = {
  cyan: 'border-cyan-500/20 hover:border-cyan-500/50',
  blue: 'border-blue-500/20 hover:border-blue-500/50',
  green: 'border-green-500/20 hover:border-green-500/50',
  orange: 'border-orange-500/20 hover:border-orange-500/50',
  purple: 'border-purple-500/20 hover:border-purple-500/50',
  slate: 'border-slate-500/20 hover:border-slate-500/50',
};

const glowColors: Record<string, string> = {
  cyan: 'rgba(6,182,212,0.15)',
  blue: 'rgba(59,130,246,0.15)',
  green: 'rgba(34,197,94,0.15)',
  orange: 'rgba(249,115,22,0.15)',
  purple: 'rgba(168,85,247,0.15)',
  slate: 'rgba(148,163,184,0.15)',
};

export default function FeaturesSection() {
  const t = useTranslations('features');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="relative section-padding bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative container-width">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 glass border border-cyan-500/20 rounded-full mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
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

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, key, color, gradient }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-default overflow-hidden ${borderColors[color]}`}
              style={{
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ boxShadow: `inset 0 0 60px ${glowColors[color]}` }}
              />

              {/* Gradient background */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Icon */}
              <div className="relative mb-5">
                <div className={`w-12 h-12 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className={iconColors[color]} />
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-white font-semibold text-base mb-2">
                  {t(`${key}Title` as 'pttTitle')}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t(`${key}Desc` as 'pttDesc')}
                </p>
              </div>

              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-px h-12 bg-gradient-to-b ${color === 'cyan' ? 'from-cyan-500/40' : `from-${color}-500/40`} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`absolute top-0 right-0 h-px w-12 bg-gradient-to-l ${color === 'cyan' ? 'from-cyan-500/40' : `from-${color}-500/40`} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
