<template>
	<div class="page-quests">
		<div class="block">
			<div class="title text-center">
				Текущие задания
			</div>
			<div class="content">
				<div class="block-table">
					<div class="flex divide-x" v-for="quest in data.items">
						<div class="th w-10">{{ quest['id'] }}</div>
						<div class="th w-10">
							<img :src="'/images/'+(quest['finish'] ? 'check' : 'none')+'.gif'" class="inline" height="11" width="12" alt="">
						</div>
						<div class="th grow !text-left">
							<NuxtLink v-if="quest['available']" :to="'/quests/' + quest['id']"><span class="positive">{{ quest['title'] }}</span></NuxtLink>
							<span v-else class="positive">{{ quest['title'] }}</span>
							<template v-if="quest['available'] === false && Object.keys(quest['required']).length > 0">
								<br><br>Требования:
									<div v-for="(req, key) in quest['required']">
										<span v-if="key === 'quest'" :class="[(!data.quests[req] || data.quests[req]['finish'] === 0) ? 'negative' : 'positive']">Выполнение задания №{{ req }}</span>
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
	import { showError, useAsyncData, definePageMeta, useHead, useRoute, useApiGet } from '#imports';

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
		return await useApiGet('/quests');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>