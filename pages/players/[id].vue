<template>
	<PlayerInfo :page="page"/>
</template>

<script>
	import PlayerInfo from '~/components/page/players/info.vue'
	import { defineNuxtComponent } from '#imports';
	import useStore from '~/store';

	export default defineNuxtComponent({
		components: {
			PlayerInfo,
		},
		async asyncData () {
			await useStore().loadPage();

			return {}
		},
		watchQuery: true,
	})
</script>