import { defineNuxtConfig } from 'nuxt/config';

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
		'~/assets/styles.scss',
	],
	telemetry: false,
	devtools: {
		enabled: false,
	},
	ssr: false,
	vite: {
		define: {
			__DEV__: false,
		},
		css: {
			preprocessorOptions: {
				scss: {
					quietDeps: true,
					silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin']
				},
			}
		},
	},
	postcss: {
		plugins: {
			tailwindcss: {},
		},
	},
	experimental: {
		appManifest: false,
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
		'@pinia/nuxt'
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
		bundle: {
			optimizeTranslationDirective: false,
		},
	},
	buildModules: [
		'@nuxtjs/gtm',
	],
	runtimeConfig: {
		public: {
			baseUrl: null,
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
	routeRules: {
		//'/api/**': { proxy: 'https://xnova.su/api/**' },
	},
	compatibilityDate: '2025-05-01'
}

if (typeof process.env.PROXY_URL !== 'undefined' && process.env.PROXY_URL.length) {
	const proxyUrl = process.env.PROXY_URL;

	config.nitro.devProxy = {
		'/admin/': { target: proxyUrl + '/admin/', changeOrigin: true, cookieDomainRewrite: {"*": ""}, secure: false },
		'/api/': { target: proxyUrl + '/api/', changeOrigin: true, cookieDomainRewrite: {"*": ""}, secure: false },
		'/broadcasting/': { target: proxyUrl + '/broadcasting/', cookieDomainRewrite: {"*": ""}, changeOrigin: true, secure: false },
		'/storage/': { target: proxyUrl + '/storage/', changeOrigin: true, secure: false },
	}

	config.runtimeConfig.public.baseUrl = null
}

export default defineNuxtConfig(config);