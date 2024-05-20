import { useRouter, defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin(() => {
	useRouter().beforeEach((to, from, next) => {
		if (to.path === from.path && to.query.r === undefined) {
			to.query.r = Math.random();

			return next({
				path: to.path,
				replace: true,
				query: to.query
			});
		}

		return next();
	})
});