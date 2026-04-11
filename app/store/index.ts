import { defineStore } from 'pinia';
import { useApiGet, useToast, useNuxtApp } from '#imports';
import dayjs from 'dayjs';
import type { IUser, IPlanet } from '~~/types/types';

interface State {
	initialized: boolean
	version: string | null
	redirect: string | null
	user: IUser | null
	planet: IPlanet | null
	queue: any[]
	messages: any[]
	stats: {[key: string]: number}
	settings: any
	speed: any
}

export const useStore = defineStore('app', {
	state: (): State => ({
		initialized: false,
		version: null,
		redirect: null,
		messages: [],
		stats: {},
		settings: {
			language: 'en',
		},
		speed: {},
		user: null,
		planet: null,
		queue: [],
	}),
	getters: {
		isAuthorized(state): boolean {
			return state.user !== null && state.user.id > 0;
		},
		isVacation(state): boolean {
			return state.user !== null && state.user.vacation !== null;
		},
		queueByType: state => (type: string) => {
			return state.queue.filter((item) => item.planet_id === state.planet?.id && item.type === type);
		},
		fieldsEmpty(state): number {
			if (!state.planet) {
				return 0;
			}

			return state.planet.field_max - state.planet.field_used - this.queueByType('build').length;
		},
	},
	actions: {
		async loadState() {
			const data = await useApiGet('/state');

			/*if (typeof data['quest'] !== 'undefined' && data['quest']['popup'] !== '') {
				$.confirm({
					title: 'Обучение',
					content: data['quest']['popup'],
					confirmButton: 'Продолжить',
					cancelButton: false,
					backgroundDismiss: false,
					confirm() {
						if (data['quest']['url'] !== '') {
							navigateTo(data['quest']['url']);
						}
					}
				})
			}*/

			if (typeof data['quest'] !== 'undefined' && data['quest']['toast'] !== '') {
				useToast(data['quest']['toast'], 'info')
			}

			this.PAGE_LOAD(data);

			setTimeout(() => {
				useNuxtApp().$i18n.setLocale(data.settings.language);
				dayjs.locale(data.settings.language);
			});
		},
		PAGE_LOAD (data: any) {
			this.$patch(data);
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