/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', 'system-ui', 'sans-serif']
      },
      colors: {
        bg: {
          DEFAULT: '#FAF8F2',
          soft: '#F3F0E8'
        },
        ink: {
          DEFAULT: '#2C3315',
          soft: '#5A6340'
        },
        card: {
          DEFAULT: '#FFFFFF',
          soft: '#FDFCF8'
        },
        line: 'rgba(44, 51, 21, 0.12)',
        brand: {
          DEFAULT: '#2D6A4F',
          light: '#40916C',
          dark: '#1B4332'
        },
        soil: '#8B6914',
        leaf: {
          DEFAULT: '#40916C',
          light: '#74C69D',
          pale: '#D8F3DC'
        },
        water: '#2F6F8F',
        sun: {
          DEFAULT: '#E7A83A',
          light: '#F2D280',
          pale: '#FFF8E7'
        },
        accent: '#C45D3E',
        cream: '#FAF5E4',
        earth: {
          DEFAULT: '#8B7355',
          light: '#C4A882',
          pale: '#F5EFE6'
        }
      },
      boxShadow: {
        card: '0 1px 3px rgba(44, 51, 21, 0.06), 0 8px 24px rgba(44, 51, 21, 0.06)',
        'card-hover': '0 4px 12px rgba(44, 51, 21, 0.10), 0 16px 40px rgba(44, 51, 21, 0.10)',
        hero: '0 4px 30px rgba(44, 51, 21, 0.15)'
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px'
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #2D6A4F 0%, #40916C 40%, #74C69D 70%, #E7A83A 100%)',
        'hero-overlay': 'linear-gradient(180deg, rgba(45, 106, 79, 0.85) 0%, rgba(64, 145, 108, 0.70) 50%, rgba(231, 168, 58, 0.50) 100%)',
        'section-warm': 'linear-gradient(180deg, #FAF8F2 0%, #FFF8E7 100%)',
        'section-green': 'linear-gradient(180deg, #FAF8F2 0%, #D8F3DC33 100%)',
        'card-accent': 'linear-gradient(135deg, #FDFCF8 0%, #FFF8E7 100%)'
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'slide-in': 'slide-in 0.4s ease-out both'
      }
    }
  },
  plugins: []
};
