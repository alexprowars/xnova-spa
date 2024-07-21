import { defineStore } from 'pinia';
import { useRouter, useApiGet, navigateTo, startLoading, stopLoading } from '#imports';
import { toast } from 'vue3-toastify';
import { computed } from 'vue';

export const useStore = defineStore('app', {
	state: () => ({
		initialized: false,
		version: null,
		redirect: null,
		messages: null,
		page: null,
		stats: null,
		speed: null,
		user: null,
		planet: null,
		queue: [],
	}),
	getters: {
		isAuthorized: state => {
			return state.user && state.user.id > 0
		},
		queueByType: state => type => {
			return state.queue.filter((item) => item.type === type);
		},
		fieldsEmpty: state => {
			return state.planet['field_max'] - state.planet['field_used'] - state.queueByType('build').length;
		},
	},
	actions: {
		async loadState() {
			const data = await useApiGet('/state');

			this.PAGE_LOAD(data);
		},
		async loadPage (url = undefined, params = {}) {
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

			try {
				const responce = await useApiGet(url, params);

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

				this.PAGE_LOAD(responce);

				return page;
			} catch {} finally {
				stopLoading();
			}
		},
		PAGE_LOAD (data) {
			for (let key in data) {
				if (data.hasOwnProperty(key))
					this[key] = data[key];
			}
		},
	}
});

export default useStore;