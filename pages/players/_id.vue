<template>
	<PlayerInfo :page="page"/>
</template>

<script>
	import PlayerInfo from '~/components/page/players/info.vue'

	export default {
		name: 'players',
		components: {
			PlayerInfo,
		},
		async asyncData ({ store }) {
			return await store.dispatch('loadPage')
		},
		watchQuery: true,
	}
</script>