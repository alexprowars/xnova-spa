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
	import { definePageMeta, showError, useAsyncData, startLoading, stopLoading, useHead, useApiPost, useRoute, refreshNuxtData } from '#imports';
	import useStore from '~/store';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Оборона',
	});

	const store = useStore();

	const { data: page, error } = await useAsyncData('page-defense', async () => {
		return await store.loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const formRef = ref(null);
	const itemsRef = ref([]);

	async function constructAction () {
		startLoading()

		try {
			await useApiPost('/defense/queue', new FormData(formRef.value));

			itemsRef.value.forEach((item) => {
				if (typeof item['count'] !== 'undefined') {
					item['count'] = '';
				}
			});

			await refreshNuxtData('page-defense');
		} catch {
			alert('Что-то пошло не так!? Попробуйте еще раз')
		} finally {
			stopLoading();
		}
	}
</script>