<template>
	<div class="page-building page-building-unit">
		<UnitQueue v-if="page.queue.length > 0" :queue="page.queue"/>
		<div class="block">
			<div class="content page-building-items">
				<form ref="formRef" action="" method="post" @submit.prevent="constructAction">
					<div class="row">
						<div class="col-12">
							<div class="c">
								<input type="submit" value="Построить">
							</div>
						</div>

						<UnitRow v-for="(item, i) in page.items" ref="itemsRef" :key="i" :item="item"/>

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

<script setup>
	import UnitRow from '~/components/Page/Buildings/UnitRow.vue'
	import UnitQueue from '~/components/Page/Buildings/UnitQueue.vue'
	import { definePageMeta, showError, useAsyncData, useRoute, startLoading, stopLoading } from '#imports';
	import { useApiPost } from '~/composables/useApi';
	import useStore from '~/store';
	import { ref, watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();
	const store = useStore();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await store.loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	const formRef = ref(null);
	const itemsRef = ref([]);

	async function constructAction () {
		startLoading()

		try {
			const result = await useApiPost('/' + page.value.mode + '/', new FormData(formRef.value))

			itemsRef.value.forEach((item) => {
				if (typeof item['count'] !== 'undefined') {
					item['count'] = '';
				}
			});

			store.PAGE_LOAD(result)
			stopLoading();
		} catch {
			alert('Что-то пошло не так!? Попробуйте еще раз')
		}

		stopLoading();
	}
</script>