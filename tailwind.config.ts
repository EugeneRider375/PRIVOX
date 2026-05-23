import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'privox': {
          dark: '#030712',
          darker: '#020208',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          glow: '#0ea5e9',
          surface: 'rgba(255,255,255,0.03)',
          border: 'rgba(6,182,212,0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)
        `,
        'radial-glow': 'radial-gradient(circle at center, rgba(6,182,212,0.15) 0%, transparent 70%)',
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.12) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'scan-line': 'scanLine 4s linear infinite',
        'data-flow': 'dataFlow 2s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(6,182,212,0.6), 0 0 80px rgba(6,182,212,0.2)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        dataFlow: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(10px)' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.1)',
        'glow-blue': '0 0 20px rgba(59,130,246,0.4), 0 0 60px rgba(59,130,246,0.1)',
        'glow-sm': '0 0 10px rgba(6,182,212,0.3)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
