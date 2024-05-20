import { Emitter } from 'mitt';

type Events = {
};

export const useEvents = (): Emitter<Events> => {
  const nuxtApp = useNuxtApp();
  return nuxtApp.$events;
}