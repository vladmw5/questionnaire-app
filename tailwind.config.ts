import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#333333',
        secondary: '#FBFBFF',
        powder: '#FFF0F0',
        'cold-steel': '#EAEEF7',
        ash: '  #E0E0E0',
      },
    },
  },
  plugins: [],
};

export default config;
