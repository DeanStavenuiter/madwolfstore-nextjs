import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
    }
  },
  plugins: [require('daisyui'), require('tailwindcss-3d')],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        dark: { raw: '(prefers-color-scheme: dark)' },
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        logoAnimation: {
          '0%': {
            transform: 'translateY(-500px) ',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0px) ',
            opacity: '1',
          },
        },
        navbarAnimation: {
          '0%': {
            opacity: '0',
          },
          '35%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-15px)' },
          '50%': { transform: 'translateY(0px)' },
        },
        Opacity: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        logoAnimation: 'logoAnimation 1.2s ease-out',
        navbarAnimation: 'navbarAnimation 3s ease-out',
        bounceAnimation: 'bounce 2s ease-in-out infinite',
        Opacity: 'Opacity 1.3s ease-out',
      },
    },
  },
};

export default config;
