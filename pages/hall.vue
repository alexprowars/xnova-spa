<template>
	<div>
		<div class="block-table">
			<div class="grid grid-cols-12">
				<div class="col-span-1 c middle">TOP50</div>
				<div class="col-span-8 c middle">Зал Славы</div>
				<div class="col-span-3 c middle">
					<select v-model.number="page['type']">
						<option value="0">Одиночные</option>
						<option value="1">Командные</option>
					</select>
				</div>
			</div>
		</div>
		<div class="block-table text-center">
			<div class="grid grid-cols-12">
				<div class="col-span-1 c">Место</div>
				<div class="col-span-7 c">
					{{ page['type'] === 0 ? 'Самые разрушительные бои' : 'Самые разрушительные групповые бои' }}
				</div>
				<div class="col-span-1 c">Итог</div>
				<div class="col-span-3 c">Дата</div>
			</div>
			<div v-for="(item, i) in page['hall']" class="grid grid-cols-12">
				<div class="col-span-1 th">{{ i + 1 }}</div>
				<div class="col-span-7 th text-left">
					<a :href="'/logs/' + item['log']" target="_blank">{{ item['title'] }}</a>
				</div>
				<div class="col-span-1 th">
					<template v-if="item['won'] === 0">Н</template>
					<template v-if="item['won'] === 1">А</template>
					<template v-else>О</template>
				</div>
				<div class="col-span-3 th" :class="{ positive: dayjs(page['time']).diff(dayjs(item['time'])) === 0 }">
					{{ $formatDate(item['time'], 'DD MMM YYYY HH:mm:ss') }}
				</div>
			</div>
			<div v-if="page['hall'].length === 0" class="grid">
				<div class="th">В этой вселенной еще не было крупных боев</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useApiPost, useAsyncData, useHead, useRoute } from '#imports';
	import { watch } from 'vue';
	import dayjs from 'dayjs';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Зал славы',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return useApiGet('/hall');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	watch(() => page.value.type, () => {
		load();
	});

	async function load() {
		try {
			page.value = await useApiPost('/hall', {
				type: page.value['type']
			})
		} catch(e) {
			alert(e.message)
		}
	}
</script>