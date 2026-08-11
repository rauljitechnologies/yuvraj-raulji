import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Space_Grotesk } from 'next/font/google';
import { UIProvider } from '../components/ui-context';
import './globals.css';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas',
});

const grotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesk',
});

export const viewport: Viewport = { themeColor: '#060606' };

export const metadata: Metadata = {
  metadataBase: new URL('https://yuvrajraulji.com'),
  authors: [{ name: 'Yuvraj Raulji', url: 'https://yuvrajraulji.com' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${grotesk.variable}`}>
      <body className="bg-bg text-[#f4f4f4] font-grotesk overflow-x-hidden">
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
