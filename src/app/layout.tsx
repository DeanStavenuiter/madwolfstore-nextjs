import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from './footer/Footer';
import SessionProvider from './SessionProvider';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
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
  // const headersList = headers();
  // // const pathname = headersList.get('next-url');
  // const referer = headersList.get('referer');
  // console.log('headers', headersList);

  // // console.log('pathname', pathname);
  // if (referer && referer[referer.length-1] === '/') {
  //   console.log('referer', referer[referer.length-1]);
  // }

  // console.log('referer', referer);

  // if (referer && referer[referer.length-1] === '/') {}

  return (
    <html lang='en'>
      <body className={`${inter.className} h-full w-full`}>
        <SessionProvider>
          {/* {referer && referer[referer.length-1] !== '/' && <Navbar />} */}
          <Navbar />
          <main className='margin-auto flex min-h-screen flex-col lg:p-4'>
            {children}
          </main>
          {/* {referer && referer[referer.length-1] !== '/' && <Footer />} */}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
