<template>
	<div class="page-tutorial tutorial-detail">
		<div class="block">
			<div class="title text-center">
				{{ page['title'] }}
			</div>
			<div class="content border-0">
				<div class="block-table tutorial">
					<div class="row">
						<div class="col k text-start">
							<div class="row">
								<div class="col-3 text-center">
									<img :src="'/images/tutorial/'+page['id']+'.jpg'" class="img-fluid" alt="">
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
	import { definePageMeta, showError, useAsyncData, useHead, useRoute, navigateTo, useApiSubmit } from '#imports';
	import useStore from '~/store';
	import { toast } from 'vue3-toastify';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const store = useStore();

	const { data: page, error } = await useAsyncData(async () => {
		return await store.loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	useHead({
		title: 'Задание. ' + page.value['title'],
	});

	function finish() {
		useApiSubmit('tutorial/' + page.value['id'], {}, () => {
			toast('Квест завершен', {
				type: 'success'
			});

			navigateTo('/tutorial');
		});
	}
</script>