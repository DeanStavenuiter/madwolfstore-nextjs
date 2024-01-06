import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './navbar/navbar';
import { Footer } from './footer/Footer';
import SessionProvider from './SessionProvider';
import { headers } from 'next/headers';

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
  const pathname = headersList.get('next-url');

  console.log('pathname', pathname);

  return (
    <html lang='en'>
      <body className={`${inter.className} w-[100%] h-full` }>
        <SessionProvider>
          {pathname !== "/" && <Navbar />}
          <main className='m-auto h-screen min-w-[300px] max-w-8xl'>
            {children}
          </main>
          {pathname !== "/" && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}
