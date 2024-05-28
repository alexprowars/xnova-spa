import { defineStore } from 'pinia';
import { useRouter, useApiGet, navigateTo, startLoading, stopLoading } from '#imports';
import { toast } from 'vue3-toastify';
import { useNow } from '@vueuse/core';

export const useStore = defineStore('app', {
	state: () => ({
		initialized: false,
		version: null,
		redirect: null,
		error: null,
		messages: null,
		page: null,
		stats: null,
		speed: null,
		user: null,
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
	},
	actions: {
		async loadState() {
			const data = await useApiGet('/state');

			this.PAGE_LOAD(data);
		},
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
					return resolve(page)
				})
			}

			startLoading();

			const responce = await useApiGet(url);

			if (typeof responce['redirect'] !== 'undefined') {
				return navigateTo({ path: responce['redirect'], force: true });
			}

			if (typeof responce['tutorial'] !== 'undefined' && responce['tutorial']['popup'] !== '') {
				$.confirm({
					title: 'Обучение',
					content: responce['tutorial']['popup'],
					confirmButton: 'Продолжить',
					cancelButton: false,
					backgroundDismiss: false,
					confirm() {
						if (responce['tutorial']['url'] !== '') {
							navigateTo(responce['tutorial']['url']);
						}
					}
				})
			}

			if (typeof responce['tutorial'] !== 'undefined' && responce['tutorial']['toast'] !== '') {
				toast(responce['tutorial']['toast'], {
					type: 'info'
				})
			}

			const page = JSON.parse(JSON.stringify(responce['data'] || {}));
			delete responce['data'];

			stopLoading();

			this.PAGE_LOAD(responce);

			return page;
		},
		PAGE_LOAD (data) {
			this.start_time = Math.floor((useNow().value.getTime()) / 1000);

			for (let key in data) {
				if (data.hasOwnProperty(key))
					this[key] = data[key];
			}
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