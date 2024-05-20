<template>
	<div class="page-building page-building-tech">
		<div class="block">
			<div class="title">Исследования</div>
			<div class="content page-building-items">
				<div class="row">
					<TechRow v-for="(item, i) in page.items" :key="i" :item="item"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import TechRow from '~/components/Page/Buildings/TechRow.vue'
	import { defineNuxtComponent } from '#imports';
	import useStore from '~/store';

	export default defineNuxtComponent({
		components: {
			TechRow
		},
		async asyncData () {
			await useStore().loadPage();

			return {}
		},
		watchQuery: true,
		middleware: 'auth',
	})
</script>