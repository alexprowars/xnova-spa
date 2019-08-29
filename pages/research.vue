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
	import TechRow from '~/components/page/buildings/tech-row.vue'

	export default {
		name: 'tech',
		components: {
			TechRow
		},
		async asyncData ({ store }) {
			return await store.dispatch('loadPage')
		},
		watchQuery: true,
		middleware: 'auth',
	}
</script>