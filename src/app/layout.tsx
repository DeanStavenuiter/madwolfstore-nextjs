import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from './footer/Footer';
import SessionProvider from './SessionProvider';
import Navbar from './navbar/navbar';

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
      <body className={`${inter.className} h-full w-full bg-neutral-900 text-coolGray-400`}>
        <SessionProvider>
          <Navbar />
          <main
            className='margin-auto flex min-h-screen flex-col 

          lg:p-4'
          >
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
