<template>
	<div class="page-building page-building-build">
		<div class="block">
			<div class="title">
				<div class="row">
					<div class="col-12 col-sm-6">
						Занято полей
						<span class="positive">{{ planet['field_used'] }}</span> из <span class="negative">{{ planet['field_max'] }}</span>
					</div>
					<div class="text-sm-right col-12 col-sm-6">
						Осталось
						<span class="positive">{{ fields_empty }}</span>
						{{ fields_empty | morph('свободное', 'свободных', 'свободных') }}
						{{ fields_empty | morph('поле', 'поля', 'полей') }}
					</div>
				</div>
			</div>

			<BuildQueue v-if="page.queue && page.queue.length" :queue="page.queue"/>

			<div class="content page-building-items">
				<div class="row">
					<BuildRow v-for="(item, i) in page.items" :key="i" :item="item"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BuildRow from '~/components/page/buildings/build-row.vue'
	import BuildQueue from '~/components/page/buildings/build-queue.vue'
	import { mapState } from 'pinia'
	import useStore from '~/store';
	import { defineNuxtComponent } from '#imports';

	export default defineNuxtComponent({
		components: {
			BuildRow,
			BuildQueue
		},
		async asyncData () {
			await useStore().loadPage();

			return {}
		},
		watchQuery: true,
		middleware: 'auth',
		computed: {
			...mapState(useStore, [
				'planet'
			]),
			fields_empty ()
			{
				if (!this.page)
					return 0

				return this.planet['field_max'] - this.planet['field_used'] - this.page.queue.length
			}
		},
	})
</script>