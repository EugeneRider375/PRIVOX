'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, ArrowDown, Monitor, Radio, Droplets, AlertCircle } from 'lucide-react';

const steps = [
  { icon: Droplets, color: 'blue', key: 'step1' },
  { icon: Cpu, color: 'cyan', key: 'step2' },
  { icon: Radio, color: 'green', key: 'step3' },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    glow: 'rgba(59,130,246,0.2)',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    glow: 'rgba(6,182,212,0.3)',
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    text: 'text-green-400',
    glow: 'rgba(34,197,94,0.2)',
  },
};

function AnimatedArch() {
  return (
    <div className="hidden lg:flex flex-col items-center gap-0 my-12">
      {/* Layer 1 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 px-6 py-3 glass border border-blue-500/20 rounded-xl"
      >
        <div className="flex gap-2">
          {['Sensor A', 'GPS Unit', 'Radio', 'Camera'].map((device) => (
            <div key={device} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[11px] text-blue-300 font-mono">{device}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Arrow Down */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center gap-0 py-4"
      >
        <div className="w-px h-6 bg-gradient-to-b from-blue-500/50 to-cyan-500/50" />
        <div className="w-2 h-2 border-r-2 border-b-2 border-cyan-500/50 rotate-45 -mt-1" />
      </motion.div>

      {/* PRIVOX CORE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="relative px-10 py-5 rounded-2xl border border-cyan-500/40 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(59,130,246,0.05))',
          boxShadow: '0 0 40px rgba(6,182,212,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="relative flex flex-col items-center">
          <div className="flex items-center gap-3 mb-1">
            <Cpu size={20} className="text-cyan-400" />
            <span className="text-white font-bold tracking-[0.2em] text-lg">PRIVOX CORE</span>
          </div>
          <p className="text-xs text-slate-400 font-mono">Event Processing · Intelligent Dispatch · Real-Time Alerts</p>
          <div className="flex gap-3 mt-3">
            {['PROCESSING', 'ROUTING', 'DISPATCH'].map((s) => (
              <div key={s} className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] text-cyan-500/70 font-mono">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Arrow Down */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col items-center gap-0 py-4"
      >
        <div className="w-px h-6 bg-gradient-to-b from-cyan-500/50 to-green-500/50" />
        <div className="w-2 h-2 border-r-2 border-b-2 border-green-500/50 rotate-45 -mt-1" />
      </motion.div>

      {/* Layer 3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-3 px-6 py-3 glass border border-green-500/20 rounded-xl"
      >
        <div className="flex gap-2">
          {['Radio PTT', 'Mobile App', 'Dashboard', 'API'].map((device) => (
            <div key={device} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] text-green-300 font-mono">{device}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="relative section-padding bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div ref={ref} className="relative container-width">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass border border-cyan-500/20 rounded-full mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-medium text-cyan-400 tracking-widest uppercase">{t('badge')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Architecture Flow */}
        <AnimatedArch />

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {steps.map(({ icon: Icon, color, key }, i) => {
            const colors = colorMap[color];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                className="glass-hover rounded-2xl p-6 relative overflow-hidden group"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                  style={{ boxShadow: `inset 0 0 40px ${colors.glow}` }} />

                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={22} className={colors.text} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-mono ${colors.text} opacity-60`}>0{i + 1}</span>
                      <h3 className="text-sm font-semibold text-white">
                        {t(`${key}Title` as keyof ReturnType<typeof t>)}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {t(`${key}Desc` as keyof ReturnType<typeof t>)}
                    </p>
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
