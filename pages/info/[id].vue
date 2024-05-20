<template>
	<InfoContent :page="page"/>
</template>

<script>
	import InfoContent from '~/components/Page/Info/Content.vue'
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