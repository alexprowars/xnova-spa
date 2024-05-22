<template>
	<div class="page-tutorial tutorial-detail">
		<div class="block">
			<div class="title text-center">
				{{ page['info']['TITLE'] }}
			</div>
			<div class="content border-0">
				<div class="block-table tutorial">
					<div class="row">
						<div class="col k text-start">
							<div class="row">
								<div class="col-3 text-center">
									<img :src="'/images/tutorial/'+page['stage']+'.jpg'" class="img-fluid" alt="">
								</div>
								<div class="col-9">
									<div class="description" v-html="page['info']['DESCRIPTION']"></div>
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
							<input v-if="!page['errors']" type="button" class="end" @click.prevent="$router.push('/tutorial/'+page['stage']+'/?continue=Y')" value="Закончить">
							<div class="solution" v-html="page['info']['SOLUTION']"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	useHead({
		title: 'Задание. ' + page.value['info']['TITLE'],
	});
</script>