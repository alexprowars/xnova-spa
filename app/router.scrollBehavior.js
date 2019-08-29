export default function (to, from, savedPosition)
{
	let position = false

	if (to.path === from.path)
		return false

	if (to.matched.length < 2 && from.matched.length < 2)
		position = { x: 0, y: 0 }
	else if (to.matched.length >= 2 && from.matched.length < 2)
		position = { x: 0, y: 0 }
	else if (to.matched.length < 2 && from.matched.length >= 2)
		position = { x: 0, y: 0 }
	else if (to.matched.some((r) => r.components.default.options.scrollToTop))
    	position = { x: 0, y: 0 }

	if (savedPosition)
		position = savedPosition

	return new Promise(resolve =>
	{
		window.$nuxt.$once('triggerScroll', () => {
			resolve(position)
		})
	})
}