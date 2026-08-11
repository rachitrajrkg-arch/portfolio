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
        paper: '#FAF7F2',
        ink: '#2B2B28',
        forest: {
          50: '#EEF3EF',
          100: '#DCE7DF',
          200: '#B9D0C0',
          300: '#8FB49B',
          400: '#5E9575',
          500: '#3A7A57',
          600: '#1F4A3D',
          700: '#193C31',
          800: '#132E26',
          900: '#0D211B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
