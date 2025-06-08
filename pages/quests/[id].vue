<template>
	<div class="page-quests quests-detail">
		<div class="block">
			<div class="title text-center">
				{{ page['title'] }}
			</div>
			<div class="content !border-0">
				<div class="block-table quests">
					<div class="grid">
						<div class="k text-left">
							<div class="grid grid-cols-12 gap-3 m-3">
								<div class="col-span-3 text-center">
									<img :src="'/images/quests/' + page['id'] + '.jpg'" class="inline" alt="">
								</div>
								<div class="col-span-9 text-left">
									<div class="description" v-html="page['description']"></div>
									<div class="text-xl mt-4">Задачи:</div>
									<ul>
										<li v-for="task in page['task']">
											<span v-html="task[0]"></span>
											<span>
												<img :src="'/images/'+(task[1] ? 'check' : 'none')+'.gif'" height="11" width="12" alt="">
											</span>
										</li>
									</ul>
									<div style="color:orange;">
										Награда: <span v-html="page['rewd']"></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="grid">
						<div class="k">
							<input v-if="!page['errors']" type="button" class="end" @click.prevent="finish" value="Закончить">
							<div v-if="page['solution']" class="solution m-3" v-html="page['solution']"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute, navigateTo, useApiSubmit, useSuccessNotification, useApiGet } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const store = useStore();

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/quests/' + useRoute().params.id);
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	useHead({
		title: 'Задание. ' + page.value['title'],
	});

	function finish() {
		useApiSubmit('quests/' + page.value['id'], {}, () => {
			useSuccessNotification('Квест завершен');

			store.loadState();

			navigateTo('/quests');
		});
	}
</script>