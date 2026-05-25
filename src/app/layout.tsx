import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PRIVOX — Unified Voice, Sensor & Dispatch Platform',
  description: 'Real-time voice communication, GPS tracking, smart sensors and operational alerts — all connected in one intelligent platform.',
  keywords: 'PTT, push to talk, operational platform, GPS dispatch, sensor monitoring, IoT, SCADA, field communication',
  icons: {
    icon: '/icons/privox-ptt-icon-192.png',
    apple: '/icons/privox-ptt-icon-192.png',
  },
  openGraph: {
    title: 'PRIVOX — Operational Intelligence Platform',
    description: 'Unified voice communication, sensor monitoring and GPS dispatch for mission-critical operations.',
    type: 'website',
    url: 'https://privox.tech',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
