<template>
	<div class="page-tutorial">
		<div class="block">
			<div class="title text-center">
				Текущие задания
			</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row" v-for="quest in items">
						<div class="col-1 th" style="max-width:30px">{{ quest['id'] }}</div>
						<div class="col-1 th" style="max-width:30px">
							<img :src="'/images/'+(quest['finish'] ? 'check' : 'none')+'.gif'" height="11" width="12" alt="">
						</div>
						<div class="col th text-start">
							<NuxtLinkLocale v-if="quest['available']" :to="'/tutorial/' + quest['id']"><span class="positive">{{ quest['title'] }}</span></NuxtLinkLocale>
							<span v-else class="positive">{{ quest['title'] }}</span>
							<template v-if="quest['available'] === false && Object.keys(quest['required']).length > 0">
								<br><br>Требования:
									<div v-for="(req, key) in quest['required']">
										<span v-if="key === 'quest'" :class="[(!quests[req] || quests[req]['finish'] === 0) ? 'negative' : 'positive']">Выполнение задания №{{ req }}</span>
										<span v-else-if="key === 'level_minier'" :class="[user.lvl_minier < req ? 'negative' : 'positive']">Промышленный уровень {{ req }}</span>
										<span v-else-if="key === 'level_raid'" :class="[user.lvl_raid < req ? 'negative' : 'positive']">Военный уровень {{ req }}</span>
									</div>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { showError, useAsyncData, definePageMeta, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { toRefs } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Обучение',
	});

	const { data, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const { items, quests } = toRefs(data.value);
</script>