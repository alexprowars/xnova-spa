<template>
	<div class="block-table">
		<div class="row">
			<div class="col th">Обновлено в {{ $date(page['update'], 'H:i:s d.m.Y') }}</div>
		</div>
		<template v-for="(list, group) in page['items']">
			<div class="row">
				<div class="col c">{{ group }}</div>
				<div class="col c">Игрок</div>
				<div class="col-2 c">Уровень</div>
			</div>
			<div v-for="(info, building) in list" class="row">
				<div class="col th">{{ building }}</div>
				<div class="col th">{{ info['winner'] }}</div>
				<div class="col-2 th">{{ info['count'] }}</div>
			</div>
		</template>
	</div>
</template>

<script setup>
	import { showError, useAsyncData, useRoute } from '#imports';
	import useStore from '~/store';
	import { toRefs, watch } from 'vue';

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