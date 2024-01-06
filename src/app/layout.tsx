import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './navbar/navbar';
import { Footer } from './footer/Footer';
import SessionProvider from './SessionProvider';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

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
  const headersList = headers();
  // const pathname = headersList.get('next-url');
  const referer = headersList.get('referer');

  // console.log('pathname', pathname);
  if (referer && referer[referer.length-1] === '/') {
    console.log('referer', referer);
  }
  

  // if (referer && referer[referer.length-1] === '/') {}
    

  return (
    <html lang='en'>
      <body className={`${inter.className} h-full w-[100%]`}>
        <SessionProvider>
          {referer && referer[referer.length-1] === '/' && <Navbar />}
          <main className='max-w-8xl m-auto h-screen min-w-[300px]'>
            {children}
          </main>
          {referer && referer[referer.length-1] === '/' && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}
