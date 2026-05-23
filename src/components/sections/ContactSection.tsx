'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Send, CalendarDays, CheckCircle, Clock, Shield, Zap } from 'lucide-react';

export default function ContactSection() {
  const t = useTranslations('contact');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const infoItems = [
    { icon: Clock, text: t('info1') },
    { icon: Shield, text: t('info2') },
    { icon: Zap, text: t('info3') },
  ];

  return (
    <section id="contact" className="relative section-padding bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">

          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 flex flex-col justify-center gap-6"
          >
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">Ready to Deploy?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tell us about your operational environment and we will tailor a PRIVOX deployment plan for your specific needs.
              </p>
            </div>

            <div className="space-y-4">
              {infoItems.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-cyan-400" />
                  </div>
                  <span className="text-sm text-slate-300">{text}</span>
                </div>
              ))}
            </div>

            {/* Signal graphic */}
            <div className="p-4 rounded-xl" style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.15)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-slate-400 font-mono">SYSTEMS OPERATIONAL</span>
              </div>
              <div className="flex items-end gap-1 h-8">
                {[3, 5, 7, 4, 8, 6, 9, 7, 5, 8, 6, 10].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-cyan-500/60 to-cyan-500/20"
                    style={{ height: `${h * 10}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center py-16 px-8 text-center rounded-2xl"
                style={{
                  background: 'rgba(6,182,212,0.05)',
                  border: '1px solid rgba(6,182,212,0.2)',
                }}
              >
                <CheckCircle size={48} className="text-cyan-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Request Received</h3>
                <p className="text-slate-400 text-sm">We will contact you within 24 hours to schedule your personalized PRIVOX demo.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-6 sm:p-8 space-y-4"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(6,182,212,0.15)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                }}
              >
                {/* Top border glow */}
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t('namePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder={t('companyPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    />
                  </div>
                </div>

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t('emailPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                />

                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t('messagePlaceholder')}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500/50 resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                />

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl transition-all hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
                  >
                    <Send size={16} />
                    {t('sendBtn')}
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2.5 px-6 py-3.5 glass border border-cyan-500/25 text-white font-semibold rounded-xl hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all"
                  >
                    <CalendarDays size={16} className="text-cyan-400" />
                    {t('demoBtn')}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
