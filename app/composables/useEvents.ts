import type { Emitter } from 'mitt';

type Events = {
	logout: void;
	login: void;
	stateUpdated: void;
};

export const useEvents = (): Emitter<Events> => {
	const nuxtApp = useNuxtApp();
	return nuxtApp.$events;
}