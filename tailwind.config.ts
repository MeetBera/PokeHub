import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					glass: 'hsl(var(--card-glass))',
					border: 'hsl(var(--card-border))'
				},
				// Pokemon type colors
				fire: 'hsl(var(--fire))',
				water: 'hsl(var(--water))',
				grass: 'hsl(var(--grass))',
				electric: 'hsl(var(--electric))',
				psychic: 'hsl(var(--psychic))',
				ice: 'hsl(var(--ice))',
				dragon: 'hsl(var(--dragon))',
				dark: 'hsl(var(--dark))',
				fairy: 'hsl(var(--fairy))',
				fighting: 'hsl(var(--fighting))',
				poison: 'hsl(var(--poison))',
				ground: 'hsl(var(--ground))',
				flying: 'hsl(var(--flying))',
				bug: 'hsl(var(--bug))',
				rock: 'hsl(var(--rock))',
				ghost: 'hsl(var(--ghost))',
				steel: 'hsl(var(--steel))',
				normal: 'hsl(var(--normal))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-pokemon': 'var(--gradient-pokemon)',
				'gradient-fire': 'var(--gradient-fire)',
				'gradient-water': 'var(--gradient-water)',
				'gradient-grass': 'var(--gradient-grass)',
				'gradient-electric': 'var(--gradient-electric)',
				'gradient-background': 'var(--gradient-background)'
			},
			backdropBlur: {
				glass: '16px'
			},
			boxShadow: {
				glass: 'var(--glass-shadow)',
				glow: '0 0 20px rgba(139, 69, 19, 0.3)',
				'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
				'glow-green': '0 0 20px rgba(34, 197, 94, 0.3)',
				'glow-yellow': '0 0 20px rgba(234, 179, 8, 0.3)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				'scale-in': 'scale-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
