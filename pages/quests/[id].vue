<template>
	<div class="page-quests quests-detail">
		<div class="block">
			<div class="title text-center">
				{{ page['title'] }}
			</div>
			<div class="content border-0">
				<div class="block-table quests">
					<div class="row">
						<div class="col k text-start">
							<div class="row">
								<div class="col-3 text-center">
									<img :src="'/images/quests/'+page['id']+'.jpg'" class="img-fluid" alt="">
								</div>
								<div class="col-9">
									<div class="description" v-html="page['description']"></div>
									<h3>Задачи:</h3>
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
					<div class="row">
						<div class="col k">
							<input v-if="!page['errors']" type="button" class="end" @click.prevent="finish" value="Закончить">
							<div v-if="page['solution']" class="solution" v-html="page['solution']"></div>
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