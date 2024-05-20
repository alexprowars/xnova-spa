<template>
	<InfoContent :page="page"/>
</template>

<script>
	import InfoContent from '~/components/page/info/content.vue'
	import { defineNuxtComponent } from '#imports';
	import useStore from '~/store';

	export default defineNuxtComponent({
		components: {
			InfoContent,
		},
		async asyncData () {
			await useStore().loadPage();

			return {}
		},
		watchQuery: true,
		middleware: 'auth',
	})
</script>