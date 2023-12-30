const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        marquee2: 'marquee2 60s linear infinite',
        'text-slide': 'text-slide 8s cubic-bezier(0.83, 0, 0.17, 1) infinite',
        wide: 'wide 4s ease-in-out infinite',
        gradient: 'gradient 10s linear infinite',
        float1: 'float 6s linear infinite',
        float2: 'float 7s linear infinite',
        float3: 'float 8s linear infinite',
        float4: 'float 9s linear infinite'
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0%)' },
          '33%': { transform: 'translateY(9%)' },
          '66%': { transform: 'translateY(2%)' },
          '100%': { transform: 'translateY(0%)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        'text-slide': {
          '0%, 26.66%': {
            transform: 'translateY(0%)'
          },
          '33.33%, 60%': {
            transform: 'translateY(-25%)'
          },
          '66.66%, 93.33%': {
            transform: 'translateY(-50%)'
          },
          '100%': {
            transform: 'translateY(-75%)'
          }
        },
        wide: {
          '0%': { letterSpacing: 'normal' },
          '70%': { letterSpacing: '0.5rem' },
          '100%': { letterSpacing: '0.6rem' }
        },
        gradient: {
          to: { 'background-position': '200% center' }
        }
      }
    }
  },
  plugins: [
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()'
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    })
  ]
};
