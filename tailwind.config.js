/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        chess: {
          dark: '#312e2b',
          darker: '#262421',
          green: '#769656',
          'light-green': '#81b64c',
          cream: '#f0f0e8',
          muted: '#8b8987',
          board: {
            light: '#eeeed2',
            dark: '#769656',
          },
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        crimson: ['"Crimson Pro"', 'serif'],
      },
    },
  },
  plugins: [],
};
