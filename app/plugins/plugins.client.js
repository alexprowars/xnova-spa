import dayjs from 'dayjs';
import { defineNuxtPlugin, stopLoading, useRouter, useLoading } from '#imports';
import Vue3Toastify, { toast } from 'vue3-toastify';
import { isNavigationFailure } from 'vue-router';

window.dataLayer = window.dataLayer || [];

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Vue3Toastify, {
		autoClose: 3000,
		position: toast.POSITION.TOP_CENTER,
		clearOnUrlChange: false,
		pauseOnHover: false,
		pauseOnFocusLoss: false,
		dangerouslyHTMLString: true,
	});

	nuxtApp.hook('i18n:beforeLocaleSwitch', async ({ oldLocale, newLocale }) => {
		if (oldLocale === newLocale) {
			return;
		}

		dayjs.locale(newLocale);
	});

	const router = useRouter();

	router.beforeEach(() => {
		const loading = useLoading();

		if (loading.value) {
			return false;
		} else {
			return true;
		}
	})

	router.afterEach((to, from, failure) => {
		stopLoading();

		if (isNavigationFailure(failure)) {
			console.log('failed navigation', failure, to.fullPath, from.fullPath);
		}
	});

	router.onError((error, to) => {
		if (error.message.includes('Failed to fetch dynamically imported module') || error.message.includes('Importing a module script failed')) {
			window.location = to.fullPath;
		}
	});
})