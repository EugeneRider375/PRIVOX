'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Shield, Droplets, Car, Factory, Leaf, Snowflake } from 'lucide-react';

const useCases = [
  { icon: Shield, key: 'security', span: 'col-span-1 md:col-span-2', size: 'large' },
  { icon: Droplets, key: 'garage', span: 'col-span-1', size: 'normal' },
  { icon: Car, key: 'parking', span: 'col-span-1', size: 'normal' },
  { icon: Factory, key: 'industrial', span: 'col-span-1', size: 'normal' },
  { icon: Leaf, key: 'agriculture', span: 'col-span-1 md:col-span-2', size: 'large' },
  { icon: Snowflake, key: 'refrigeration', span: 'col-span-1', size: 'normal' },
];

const caseColors = [
  { icon: 'text-blue-400', glow: 'rgba(59,130,246,0.2)', border: 'border-blue-500/20', bg: 'from-blue-900/30' },
  { icon: 'text-cyan-400', glow: 'rgba(6,182,212,0.2)', border: 'border-cyan-500/20', bg: 'from-cyan-900/30' },
  { icon: 'text-green-400', glow: 'rgba(34,197,94,0.2)', border: 'border-green-500/20', bg: 'from-green-900/30' },
  { icon: 'text-orange-400', glow: 'rgba(249,115,22,0.2)', border: 'border-orange-500/20', bg: 'from-orange-900/30' },
  { icon: 'text-emerald-400', glow: 'rgba(52,211,153,0.2)', border: 'border-emerald-500/20', bg: 'from-emerald-900/30' },
  { icon: 'text-sky-400', glow: 'rgba(56,189,248,0.2)', border: 'border-sky-500/20', bg: 'from-sky-900/30' },
];

export default function UseCasesSection() {
  const t = useTranslations('useCases');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="use-cases" className="relative section-padding overflow-hidden" style={{ background: 'linear-gradient(to bottom, #030712, #020510)' }}>
      <div className="absolute inset-0 grid-bg opacity-25" />

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

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {useCases.map(({ icon: Icon, key, span, size }, i) => {
            const colors = caseColors[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className={`${span} group relative rounded-2xl border overflow-hidden cursor-default transition-all duration-300 ${colors.border}`}
                style={{
                  background: `linear-gradient(135deg, rgba(3,7,18,0.95), rgba(3,7,18,0.8))`,
                  minHeight: size === 'large' ? '180px' : '160px',
                }}
              >
                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at top left, ${colors.glow} 0%, transparent 60%)` }}
                />

                {/* Animated indicator dots */}
                <div className="absolute top-3 right-3 flex gap-1">
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      className="w-1 h-1 rounded-full bg-current opacity-30 group-hover:opacity-70 transition-opacity"
                      style={{ color: colors.icon.replace('text-', '').replace('-400', '') }}
                    />
                  ))}
                </div>

                <div className="relative p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className={`w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={20} className={colors.icon} />
                    </div>
                    <h3 className="text-white font-semibold text-base mb-2">
                      {t(`${key}Title` as 'securityTitle')}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {t(`${key}Desc` as 'securityDesc')}
                    </p>
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center gap-2 mt-4">
                    <div className={`w-1.5 h-1.5 rounded-full ${colors.icon.replace('text', 'bg').replace('-400', '-500')} animate-pulse`} />
                    <span className="text-[11px] text-slate-500 font-mono tracking-wide">OPERATIONAL</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
