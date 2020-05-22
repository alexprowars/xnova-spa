const webpack = require('webpack')

const GTM_ID = 'GTM-TD5227C'
const SENTRY_ID = 'https://07e2069e69bf41138e52c89088230e98@sentry.io/1524173'

const proxyUrl = process.env.PROXY_URL || 'http://test.xnova.su'

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
		'~/assets/styles/bootstrap/bootstrap.scss',
		'~/assets/app.scss',
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
		{src: '~/plugins/global.js', ssr: false},
		{src: '~/plugins/echo.js', ssr: false},
		{src: '~/plugins/modal.js', ssr: false},
		{src: '~/plugins/router.js', ssr: false},
		{src: '~/plugins/tooltip.js', ssr: true},
		{src: '~/plugins/swipe.js', ssr: false},
		{src: '~/plugins/toast.js', ssr: false},
		{src: '~/plugins/dialog.js', ssr: false},
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
	modern: process.env.NODE_ENV === 'production',
	render: {
		compressor: false,
	},
	features: {
		transitions: false,
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
				}}],
			},
		},
		extend (config, { isClient })
		{
			config.resolve.alias['socket.io-client'] = 'socket.io-client/dist/socket.io.slim.js'
			config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

			if (isClient)
			{
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
	modules: [
		'@nuxtjs/proxy',
		'@nuxtjs/axios',
	],
	axios: {
		prefix: '/api',
		proxy: true,
		proxyHeaders: true,
		credentials: true,
	},
	proxy: {
		'/api': {target: proxyUrl, cookieDomainRewrite: {"*": ""}},
		'/broadcasting': {target: proxyUrl, cookieDomainRewrite: {"*": ""}},
		'/upload': {target: proxyUrl},
	},
	vue: {
		config: {
			productionTip: false
		}
	},
}


if (SENTRY_ID !== '')
{
	config.modules.push('@nuxtjs/sentry')

	config.sentry = {
		dsn: SENTRY_ID,
		options: {
			disabled: process.env.NODE_ENV !== 'production'
		},
		clientIntegrations: {
			ReportingObserver: false,
		},
		clientConfig: {
			beforeSend (event)
			{
				if (event.message && event.message.indexOf('gCrWeb') > -1)
					return null

				return event
			},
		},
	}
}

if (GTM_ID !== '')
{
	config.modules.push(['@nuxtjs/google-tag-manager', {
		id: GTM_ID
	}])
}

module.exports = config