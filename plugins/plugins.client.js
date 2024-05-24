import dayjs from 'dayjs';
import { defineNuxtPlugin, useRouter } from '#imports';
import 'vite/modulepreload-polyfill';
import 'core-js/es/global-this.js';
import 'core-js/es/array/flat.js';
import 'core-js/proposals/promise-all-settled.js';
import { raport_to_bb } from '~/utils/helpers'
import Vue3TouchEvents from 'vue3-touch-events'
import FloatingVue from 'floating-vue';
import Vue3Toastify, { toast } from 'vue3-toastify';
import { isNavigationFailure } from 'vue-router';

window.dataLayer = window.dataLayer || [];
window.raport_to_bb = raport_to_bb;

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Vue3TouchEvents, {
		touchHoldTolerance: 100,
	});

	nuxtApp.vueApp.use(FloatingVue);

	nuxtApp.vueApp.use(Vue3Toastify, {
		autoClose: 3000,
		position: toast.POSITION.TOP_CENTER,
		clearOnUrlChange: false,
		pauseOnHover: false,
		pauseOnFocusLoss: false,
		dangerouslyHTMLString: true,
	});

	nuxtApp.hook('i18n:beforeLocaleSwitch', async ({ newLocale }) => {
		dayjs.locale(newLocale);
	});

	useRouter().afterEach((to, from, failure) => {
		if (isNavigationFailure(failure)) {
			console.log('failed navigation', failure);
		}
	});
})