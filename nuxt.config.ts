import { defineNuxtConfig } from 'nuxt/config';

let config = {
	app: {
		head: {
			title: 'XNova Game',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
				{ name: 'og:title', content: 'XNova Game' },
				{ name: 'og:image', content: '/images/logo.jpg' },
				{ name: 'og:image:width', content: '300' },
				{ name: 'og:image:height', content: '300' },
				{ name: 'og:site_name', content: 'Звездная Империя' },
				{ name: 'og:description', content: 'Вы являетесь межгалактическим императором, который распространяет своё влияние посредством различных стратегий на множество галактик.' },
			],
			link: [
				{ rel: 'image_src', href: '/images/logo.jpg' },
				{ rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png' },
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
		'~/assets/vendors.scss',
		'~/assets/styles.scss',
	],
	telemetry: false,
	devtools: {
		enabled: false,
	},
	ssr: false,
	vite: {
		build: {
			target: ['chrome64', 'safari12'],
		},
		define: {
			__DEV__: false,
		},
	},
	experimental: {
		appManifest: false,
	},
	vue: {
		compilerOptions: {
			whitespace: 'preserve',
			isCustomElement: (tag) => ['font'].includes(tag),
		}
	},
	modules: [
		'@nuxtjs/i18n',
		'@pinia/nuxt',
	],
	i18n: {
		baseUrl: 'https://xnova.su',
		locales: [
			{ code: 'ru', iso: 'ru-RU', file: 'ru.json' },
		],
		lazy: true,
		langDir: './locales/',
		defaultLocale: 'ru',
		strategy: 'prefix_except_default',
		customRoutes: 'config',
		detectBrowserLanguage: false,
		trailingSlash: false,
		compilation: {
			strictMessage: false,
		},
	},
	buildModules: [
		'@nuxtjs/gtm',
	],
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
		devProxy: {}
	},
}

if (process.env.NODE_ENV !== 'production' || (typeof process.env.PROXY_URL !== 'undefined' && process.env.PROXY_URL.length)) {
	const proxyUrl = process.env.PROXY_URL;

	config.nitro.devProxy = {
		'/admin/': { target: proxyUrl + '/admin/', changeOrigin: true, cookieDomainRewrite: {"*": ""}, secure: false },
		'/api/': { target: proxyUrl + '/api/', changeOrigin: true, cookieDomainRewrite: {"*": ""}, secure: false },
		'/broadcasting/': { target: proxyUrl + '/broadcasting/', cookieDomainRewrite: {"*": ""}, changeOrigin: true, secure: false },
		'/upload/': { target: proxyUrl + '/upload/', changeOrigin: true, secure: false },
	}

	config.runtimeConfig.public.baseUrl = null
}

export default defineNuxtConfig(config);