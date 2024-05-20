<template>
	<div v-html="page.html"></div>
</template>

<script>
	import { defineNuxtComponent } from '#imports';
	import useStore from '~/store';

	export default defineNuxtComponent({
		name: "html-content",
		props: {
			popup: {
				type: Object
			}
		},
		async asyncData () {
			const data = await useStore().loadPage();

			return {
				data: data.page
			}
		},
		watchQuery: true,
		data () {
			return {
				page: {}
			}
		},
		created () {
			this.page = this.popup !== undefined ? this.popup : this.data
		},
	})
</script>