import { defineNuxtPlugin, useRuntimeConfig, useRouter } from '#imports';
import VueGtm, { useGtm } from '@gtm-support/vue-gtm';

export default defineNuxtPlugin((nuxtApp) => {
	const runtimeConfig = useRuntimeConfig();

	if (typeof runtimeConfig.public.gtmId === 'undefined' || !runtimeConfig.public.gtmId || process.env.NODE_ENV === 'development') {
		return;
	}

	nuxtApp.vueApp.use(VueGtm, {
		id: runtimeConfig.public.gtmId,
		enabled: false,
		vueRouter: useRouter(),
	});

	window.addEventListener('scroll', initGtm,{ passive: true });
	window.addEventListener('click', initGtm,{ passive: true });
	window.addEventListener('mousemove', initGtm,{ passive: true });
	window.addEventListener('touchstart', initGtm,{ passive: true });
	window.addEventListener('keydown', initGtm,{ passive: true });
	const timer = setTimeout(initGtm, 5000)

	function initGtm () {
		clearTimeout(timer)
		window.removeEventListener('scroll', initGtm);
		window.removeEventListener('click', initGtm);
		window.removeEventListener('mousemove', initGtm);
		window.removeEventListener('touchstart', initGtm);
		window.removeEventListener('keydown', initGtm);

		useGtm().enable(true)
	}
});