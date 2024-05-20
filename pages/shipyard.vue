<template>
	<div class="page-building page-building-unit">
		<UnitQueue v-if="page.queue.length > 0" :queue="page.queue"/>
		<div class="block">
			<div class="content page-building-items">
				<form ref="form" action="" method="post" @submit.prevent="constructAction">
					<div class="row">
						<div class="col-12">
							<div class="c">
								<input type="submit" value="Построить">
							</div>
						</div>

						<UnitRow v-for="(item, i) in page.items" :key="i" :item="item"/>

						<div class="col-12">
							<div class="c">
								<input type="submit" value="Построить">
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import UnitRow from '~/components/Page/Buildings/unit-row.vue'
	import UnitQueue from '~/components/Page/Buildings/unit-queue.vue'
	import { defineNuxtComponent } from '#imports';
	import { useApiPost } from '~/composables/useApi';
	import useStore from '~/store';

	export default defineNuxtComponent({
		components: {
			UnitRow,
			UnitQueue
		},
		async asyncData () {
			await useStore().loadPage();

			return {}
		},
		watchQuery: true,
		middleware: 'auth',
		methods: {
			constructAction ()
			{
				useStore().setLoadingStatus(true)

				useApiPost('/'+this.page.mode+'/', new FormData(this.$refs['form']))
				.then((result) =>
				{
					this.$children.forEach((item) =>
					{
						if (typeof item['count'] !== 'undefined')
							item['count'] = '';
					});

					useStore().PAGE_LOAD(result)
					useStore().setLoadingStatus(false)
				})
				.catch(() => {
					alert('Что-то пошло не так!? Попробуйте еще раз')
				})
			}
		}
	})
</script>