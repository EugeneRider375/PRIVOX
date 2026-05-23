'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

export default function WhyPrivoxSection() {
  const t = useTranslations('why');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const traditionalItems = ['t1', 't2', 't3', 't4', 't5'];
  const privoxItems = ['p1', 'p2', 'p3', 'p4', 'p5'];

  return (
    <section id="why-privox" className="relative section-padding overflow-hidden" style={{ background: 'linear-gradient(to bottom, #030712, #020510, #030712)' }}>
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/4 rounded-full blur-3xl pointer-events-none" />

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
            {t('description')}
          </motion.p>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">

          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(239,68,68,0.03)',
              border: '1px solid rgba(239,68,68,0.15)',
            }}
          >
            <div className="px-6 py-4 border-b border-red-500/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <X size={16} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-300">{t('traditionalLabel')}</h3>
                <p className="text-xs text-slate-600 font-mono">FRAGMENTED SYSTEMS</p>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {traditionalItems.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-lg"
                  style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.08)' }}
                >
                  <X size={14} className="text-red-400/60 flex-shrink-0" />
                  <span className="text-sm text-slate-400">{t(key as 't1')}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* PRIVOX */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(6,182,212,0.03)',
              border: '1px solid rgba(6,182,212,0.2)',
              boxShadow: '0 0 40px rgba(6,182,212,0.05)',
            }}
          >
            {/* Glow top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            <div className="px-6 py-4 border-b border-cyan-500/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                <CheckCircle size={16} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{t('privoxLabel')}</h3>
                <p className="text-xs text-cyan-600 font-mono">UNIFIED PLATFORM</p>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {privoxItems.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-lg"
                  style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.12)' }}
                >
                  <CheckCircle size={14} className="text-cyan-400 flex-shrink-0" />
                  <span className="text-sm text-slate-200">{t(key as 'p1')}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Arrow connector */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, type: 'spring' }}
          className="hidden md:flex items-center justify-center mt-8"
        >
          <div className="flex items-center gap-3 px-5 py-3 glass border border-cyan-500/20 rounded-full">
            <span className="text-xs text-slate-400">Replace complexity with clarity</span>
            <ArrowRight size={14} className="text-cyan-400" />
            <span className="text-xs text-cyan-400 font-semibold">One Platform</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
