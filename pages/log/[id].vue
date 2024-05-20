<template>
	<div id="report" class="table-responsive" v-html="page['raport']"></div>
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
	})
</script>