import { defineStore } from 'pinia';
import { useRouter } from '#imports';
import { useApiGet } from '~/composables/useApi';
import { toast } from 'vue3-toastify';
import { useNow } from '@vueuse/core';

export const useStore = defineStore('app', {
	state: () => ({
		path: null,
		version: null,
		host: null,
		redirect: null,
		messages: null,
		page: null,
		stats: null,
		view: null,
		title: null,
		url: null,
		user: null,
		menu: null,
		planet: null,
		start_time: Math.floor(useNow().value.getTime() / 1000),
	}),
	getters: {
		getServerTime: state => {
			return Math.floor(useNow().value.getTime() / 1000) + state.stats.time - state.start_time;
		},
		isAuthorized: state => {
			return state.user && state.user.id > 0
		},
		isMobile: _ => {
			return typeof window !== 'undefined' ? /Android|Mini|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent) : false
		},
	},
	actions: {
		async loadPage (url = undefined) {
			if (typeof url === 'undefined') {
				url = useRouter().currentRoute.value.path;
			}

			if (this.page !== null) {
				let page = JSON.parse(JSON.stringify(this.page));

				this.PAGE_LOAD({
					page: null
				})

				return new Promise((resolve) => {
					return resolve({
						page
					})
				})
			}

			const data = await useApiGet(url)

			if (typeof data['redirect'] !== 'undefined')
				return this.app.context.redirect(data['redirect'])

			if (typeof data['tutorial'] !== 'undefined' && data['tutorial']['popup'] !== '') {
				$.confirm({
					title: 'Обучение',
					content: data['tutorial']['popup'],
					confirmButton: 'Продолжить',
					cancelButton: false,
					backgroundDismiss: false,
					confirm: () => {
						if (data['tutorial']['url'] !== '')
							navigateTo(data['tutorial']['url']);
					}
				})
			}

			if (typeof data['tutorial'] !== 'undefined' && data['tutorial']['toast'] !== '') {
				toast(data['tutorial']['toast'], {
					type: 'info'
				})
			}

			let page = JSON.parse(JSON.stringify(data.page));

			delete data.page;

			this.PAGE_LOAD(data);
			this.setLoadingStatus(false);

			return {
				page
			}
		},
		PAGE_LOAD (data) {
			this.start_time = Math.floor(((new Date()).getTime()) / 1000);

			for (let key in data) {
				if (data.hasOwnProperty(key))
					this[key] = data[key];
			}

			if (data.page !== null && typeof data.page === 'object' && typeof data['url'] !== 'undefined') {
				navigateTo(data['url']);
			}
		},
		setLoadingStatus (status) {
			this.loading = status
		},
		setPlanetResources (resources) {
			for (let res in resources) {
				if (resources.hasOwnProperty(res)) {
					this.planet.resources[res]['current'] = resources[res]
				}
			}
		},
	}
});

export default useStore;