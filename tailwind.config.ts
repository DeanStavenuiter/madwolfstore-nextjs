import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('daisyui'), require('tailwindcss-3d')({ legacy: true })],
  theme: {
    extend: {
      DarkTheme: {
        primary: '#f4aa3a',
        secondary: '#f4f4a1',
        accent: '#1be885',
        neutral: '#272136',
        'base-100': '#ffffff',
        info: '#778ad4',
        success: '#23b893',
        warning: '#f79926',
        error: '#ea535a',
        body: {
          'background-color': '#e3e6e6',
        },
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        logoAnimation: {
          '0%': {
            transform: 'translateY(-500px) ',
            // transform: 'translateX(600px) ',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0px) ',
            // transform: 'translateX(0px) ',
            opacity: '1',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        logoAnimation: 'logoAnimation 1.2s ease-out',
      },
    },
  },
};

export default config;
