<template>
	<div class="page-tutorial">
		<div class="block">
			<div class="title text-center">
				Текущие задания
			</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row" v-for="quest in page['list']">
						<div class="col-1 th" style="max-width:30px">{{ quest['ID'] }}</div>
						<div class="col-1 th" style="max-width:30px">
							<img :src="'/images/'+(quest['FINISH'] ? 'check' : 'none')+'.gif'" height="11" width="12" alt="">
						</div>
						<div class="col th text-start">
							<NuxtLinkLocale v-if="quest['AVAILABLE']" :to="'/tutorial/'+quest['ID']+'/'"><span class="positive">{{ quest['TITLE'] }}</span></NuxtLinkLocale>
							<span v-else class="positive">{{ quest['TITLE'] }}</span>
							<template v-if="quest['AVAILABLE'] === false && Object.keys(quest['REQUIRED']).length > 0">
								<br><br>Требования:
									<div v-for="(req, key) in quest['REQUIRED']">
										<span v-if="key === 'QUEST'" :class="[(page['quests'][req] === undefined || page['quests'][req]['finish'] === 0) ? 'negative' : 'positive']">Выполнение задания №{{ req }}</span>
										<span v-else-if="key === 'LEVEL_MINIER'" :class="[user.lvl_minier < req ? 'negative' : 'positive']">Промышленный уровень {{ req }}</span>
										<span v-else-if="key === 'LEVEL_RAID'" :class="[user.lvl_raid < req ? 'negative' : 'positive']">Военный уровень {{ req }}</span>
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
	import { showError, useAsyncData, definePageMeta, useRoute } from '#imports';
	import useStore from '~/store';
	import { toRefs, watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();

	const { data, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	const { page } = toRefs(data.value);
</script>