import { defineNuxtPlugin } from '#imports';
import useStore from '~/store/index.js';

export default defineNuxtPlugin(async () => {
	await useStore().loadState()
});