<template>
	<div v-if="page" v-html="page['raport']"></div>
</template>

<script>
	import { defineNuxtComponent } from '#imports';
	import useStore from '~/store';

	export default defineNuxtComponent({
		async asyncData () {
			await useStore().loadPage();

			return {}
		},
		layout: 'empty',
		created ()
		{
			if (this.$store.state.user !== null && !this.page)
				this.$root.setLayout('default')
		}
	})
</script>