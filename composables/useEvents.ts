import { Emitter } from 'mitt';

type Events = {
	logout: void;
	login: void;
};

export const useEvents = (): Emitter<Events> => {
	const nuxtApp = useNuxtApp();
	return nuxtApp.$events;
}