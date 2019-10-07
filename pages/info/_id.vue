<template>
	<InfoContent :page="page"/>
</template>

<script>
	import InfoContent from '~/components/page/info/content.vue'

	export default {
		name: 'info',
		components: {
			InfoContent,
		},
		async asyncData ({ store }) {
			return await store.dispatch('loadPage')
		},
		watchQuery: true,
		middleware: 'auth',
	}
</script>