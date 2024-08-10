import { defineStore } from 'pinia';
import { useRouter, useApiGet, navigateTo, startLoading, stopLoading, useToast } from '#imports';
import dayjs from 'dayjs';

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
		isVacation: state => {
			return state.user && state.user['vacation'] !== null;
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

			if (typeof data['redirect'] !== 'undefined' && Object.keys(data).length === 1 && !this.initialized) {
				window.location.href = data['redirect'];
				return;
			}

			if (typeof data['tutorial'] !== 'undefined' && data['tutorial']['popup'] !== '') {
				$.confirm({
					title: 'Обучение',
					content: data['tutorial']['popup'],
					confirmButton: 'Продолжить',
					cancelButton: false,
					backgroundDismiss: false,
					confirm() {
						if (data['tutorial']['url'] !== '') {
							navigateTo(data['tutorial']['url']);
						}
					}
				})
			}

			if (typeof data['tutorial'] !== 'undefined' && data['tutorial']['toast'] !== '') {
				useToast(data['tutorial']['toast'], 'info')
			}

			this.PAGE_LOAD(data);
		},
		async loadPage (url = undefined, params = {}) {
			if (typeof url === 'undefined') {
				url = useRouter().currentRoute.value.path;
			}

			if (this.page !== null) {
				let page = JSON.parse(JSON.stringify(this.page));
				this.page = null;

				return new Promise((resolve) => resolve(page))
			}

			this.loadState().then(() => {}, () => {});

			startLoading();

			try {
				const responce = await useApiGet(url, params);

				if (typeof responce['redirect'] !== 'undefined') {
					return navigateTo({ path: responce['redirect'], force: true });
				}

				this.initialized = true;

				return responce;
			} catch {} finally {
				stopLoading();
			}
		},
		PAGE_LOAD (data) {
			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					this[key] = data[key];
				}
			}
		},
		setTimezone() {
			const tz = this.user?.options.timezone || null;

			if (tz !== null) {
				dayjs.tz.setDefault((tz >= 0 ? '+' : '-') + (Math.abs(tz) < 10 ? '0' : '') + Math.abs(tz) + ':00');
			} else {
				dayjs.tz.setDefault();
			}
		},
	}
});

export default useStore;