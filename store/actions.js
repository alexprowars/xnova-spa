import { getLocation } from '~/utils/helpers'

let timer

export default {
	nuxtServerInit (store, context)
	{
		return context.app.$get(context.route.fullPath, {
			initial: 'Y'
		})
		.then((data) =>
		{
			if (data.redirect && data.redirect.length > 0)
				return context.redirect(data.redirect)

			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					store.state[key] = data[key];
				}
			}

			if (data.route && data.route.controller === 'error')
				throw new Error('Страница не найдена')
		})
		.catch((e) => {
			return context.error(e);
		})
	},

}