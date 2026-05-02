import { defineNuxtConfig } from 'nuxt/config';
import svgLoader from 'vite-svg-loader'

let config = {
	app: {
		head: {
			title: 'XNova Game',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
				{ name: 'mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
				{ name: 'format-detection', content: 'telephone=no' },
				{ name: 'og:title', content: 'XNova Game' },
				{ name: 'og:image', content: '/images/logo.jpg' },
				{ name: 'og:image:width', content: '300' },
				{ name: 'og:image:height', content: '300' },
				{ name: 'og:site_name', content: 'Звездная Империя' },
				{ name: 'og:description', content: 'Вы являетесь межгалактическим императором, который распространяет своё влияние посредством различных стратегий на множество галактик.' },
			],
			link: [
				{ rel: 'image_src', href: '/images/pwa/icon_512.png' },
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'icon', type: 'image/png', sizes: '196x196', href: '/images/pwa/icon_192.png' },
				{ rel: 'apple-touch-icon', type: 'image/png', sizes: '512x512', href: '/images/pwa/icon_512.png' },
				{ rel: 'manifest', href: '/manifest.json' },
			]
		},
		pageTransition: false,
		layoutTransition: false,
	},
	router: {
		options: {
			linkActiveClass: 'active-link',
			linkExactActiveClass: 'active',
		},
	},
	css: [
		'~/assets/styles.css',
	],
	telemetry: false,
	devtools: {
		enabled: false,
	},
	experimental: {
		checkOutdatedBuildInterval: 1000 * 60 * 5,
	},
	typescript: {
		tsConfig: {
			include: [
				'../types/*.ts',
			],
		},
	},
	ssr: true,
	routeRules: {
		'/': { ssr: true },
		'/content/**': { ssr: true },
		'/stats/**': { ssr: true },
		'/players/**': { ssr: true },
		'/**': { ssr: false },
	} as any,
	vite: {
		build: {
			assetsInlineLimit: 0,
			target: ['chrome85', 'safari14.1'],
			modulePreload: {
				polyfill: false,
			}
		},
		define: {
			__DEV__: false,
		},
		plugins: [
			svgLoader({
				svgoConfig: {
					plugins: [{
						name: 'preset-default',
						params: {
							overrides: {
								removeViewBox: false,
							},
						},
					}],
				}
			})
		],
		optimizeDeps: {
			include: [
				'laravel-echo',
				'pusher-js',
				'dayjs',
				'dayjs/plugin/utc',
				'dayjs/plugin/timezone',
				'dayjs/plugin/dayOfYear',
				'dayjs/plugin/weekOfYear',
				'dayjs/plugin/customParseFormat',
				'dayjs/plugin/relativeTime',
				'dayjs/locale/en',
				'dayjs/locale/ru',
				'mitt',
				'vue-final-modal',
				'vue3-touch-events',
				'floating-vue',
				'vue3-toastify',
				'@gtm-support/vue-gtm',
				'@vuelidate/core',
				'@vuelidate/validators',
				'@vueuse/core',
			]
		}
	},
	postcss: {
		plugins: {
			"@tailwindcss/postcss": {},
		},
	},
	features: {
		inlineStyles: false,
	},
	vue: {
		compilerOptions: {
			whitespace: 'preserve',
		}
	},
	modules: [
		'@nuxtjs/i18n',
		'@pinia/nuxt',
	],
	i18n: {
		locales: [
			{ code: 'en', language: 'en-US', file: 'en.json' },
			{ code: 'ru', language: 'ru-RU', file: 'ru.json' },
		],
		lazy: true,
		defaultLocale: 'en',
		strategy: 'no_prefix',
		customRoutes: 'config',
		detectBrowserLanguage: false,
		trailingSlash: false,
		compilation: {
			strictMessage: false,
		},
	},
	runtimeConfig: {
		public: {
			gtmId: null,
			recaptchaKey: null,
			reverbAppKey: null,
			reverbHost: null,
			reverbPort: null,
			reverbScheme: null,
		}
	},
	nitro: {
		devProxy: {},
	},
	compatibilityDate: '2026-05-01'
}

if (typeof process.env.PROXY_URL !== 'undefined' && process.env.PROXY_URL.length) {
	const proxyUrl = process.env.PROXY_URL;

	config.routeRules['/admin/**'] = { proxy: proxyUrl + '/admin/**' };
	config.routeRules['/api/**'] = { proxy: proxyUrl + '/api/**' };
	config.routeRules['/broadcasting/**'] = { proxy: proxyUrl + '/broadcasting/**' };
	config.routeRules['/storage/**'] = { proxy: proxyUrl + '/storage/**' };
}

export default defineNuxtConfig(config as any);