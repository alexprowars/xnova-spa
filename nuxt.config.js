const webpack = require('webpack')

const proxyUrl = process.env.PROXY_URL || 'https://xnova.su'

let config = {
	head: {
		title: 'XNova Game',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
			{ property: 'og:title', content: 'XNova Game', hid: 'og:title' },
			{ property: 'og:image', content: '/images/logo.jpg' },
			{ property: 'og:image:width', content: '300' },
			{ property: 'og:image:height', content: '300' },
			{ property: 'og:site_name', content: 'Звездная Империя' },
			{ property: 'og:description', content: 'Вы являетесь межгалактическим императором, который распространяет своё влияние посредством различных стратегий на множество галактик.' },
		],
		link: [
			{ rel: 'image_src', href: '/images/logo.jpg' },
			{ rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png' },
		]
	},
	css: [
		'~assets/styles/bootstrap/bootstrap.scss',
		'~assets/app.scss',
		'vuejs-dialog/dist/vuejs-dialog.min.css',
	],
	pageTransition: {
		css: false
	},
	plugins: [
		'~/plugins/api.js',
		'~/plugins/validate.js',
		'~/plugins/i18n.js',
		'~/plugins/filters.js',
		'~/plugins/components.js',
		'~/plugins/tooltip.js',
		{ src: '~/plugins/global.js', mode: 'client' },
		{ src: '~/plugins/echo.js', mode: 'client' },
		{ src: '~/plugins/modal.js', mode: 'client' },
		{ src: '~/plugins/router.js', mode: 'client' },
		{ src: '~/plugins/swipe.js', mode: 'client' },
		{ src: '~/plugins/toast.js', mode: 'client' },
		{ src: '~/plugins/dialog.js', mode: 'client' },
	],
	router: {
		base: '/',
		middleware: 'router',
		prefetchLinks: false,
		linkActiveClass: 'active',
		linkExactActiveClass: 'active',
	},
	loading: {
		color: '#9a1915',
	},
	components: false,
	telemetry: false,
	modern: process.env.NODE_ENV === 'production',
	render: {
		compressor: false,
	},
	features: {
		fetch: false,
		clientOnline: false,
		clientPrefetch: false,
		componentAliases: false,
		deprecations: false,
	},
	build: {
		indicator: false,
		cssSourceMap: false,
		extractCSS: process.env.NODE_ENV === 'production',
		publicPath: '/static/',
		loaders: {
			vue: {
				compilerOptions: {
					whitespace: 'preserve'
				}
			}
		},
		optimizeCSS: {
			cssProcessorPluginOptions: {
				preset: ['default', {
					discardComments: {
						removeAll: true
					}
				}],
			},
		},
		extend(config, { isClient }) {
			config.resolve.alias['socket.io-client'] = 'socket.io-client/dist/socket.io.slim.js'
			config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

			if (isClient) {
				config.module.rules.push({
					test: /vue-router(.*?)\.js$/,
					loader: 'string-replace-loader',
					options: {
						search: 'isSameRoute(route, current)',
						replace: 'false',
					}
				})
			}
		}
	},
	buildModules: [
		'@nuxtjs/gtm',
		'@nuxtjs/axios',
	],
	modules: [],
	axios: {
		prefix: '/api',
		proxy: true,
		proxyHeaders: true,
		credentials: true,
	},
	proxy: {
		'/api': { target: proxyUrl, cookieDomainRewrite: {"*": ""}, secure: false },
		'/broadcasting': { target: proxyUrl, cookieDomainRewrite: {"*": ""}, secure: false },
		'/upload': { target: proxyUrl, secure: false },
	},
	vue: {
		config: {
			productionTip: false
		}
	},
	gtm: {
		autoInit: false,
		enabled: process.env.NODE_ENV === 'production',
	},
	publicRuntimeConfig: {
		gtmId: process.env.GTM_ID || null,
	}
}

//if (process.env.NODE_ENV !== 'production' || (typeof process.env.PROXY_URL !== 'undefined' && process.env.PROXY_URL.length)) {
//	config.modules.push('@nuxtjs/proxy')
//}

module.exports = config