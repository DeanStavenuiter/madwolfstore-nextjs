import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './navbar/navbar';
import { Footer } from './footer/Footer';
import SessionProvider from './SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MadWolf Store',
  description: 'Timeless clothing with handmade designs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider >
          <Navbar />
          <main className='m-auto min-w-[300px] max-w-7xl p-4'>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
