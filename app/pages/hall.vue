<template>
	<div>
		<div class="block-table">
			<div class="grid grid-cols-12">
				<div class="col-span-1 c middle">TOP50</div>
				<div class="col-span-8 c middle">Зал Славы</div>
				<div class="col-span-3 c middle">
					<select v-model="type">
						<option value="single">Одиночные</option>
						<option value="team">Командные</option>
					</select>
				</div>
			</div>
		</div>
		<div class="block-table text-center">
			<div v-if="data['items'].length > 0" class="grid grid-cols-12">
				<div class="col-span-1 c">Место</div>
				<div class="col-span-7 c">
					{{ data['type'] === 'single' ? 'Самые разрушительные бои' : 'Самые разрушительные групповые бои' }}
				</div>
				<div class="col-span-1 c">Итог</div>
				<div class="col-span-3 c">Дата</div>
			</div>
			<div v-for="(item, i) in data['items']" class="grid grid-cols-12">
				<div class="col-span-1 th">{{ i + 1 }}</div>
				<div class="col-span-7 th text-left">
					<a v-if="item['report_id']" :href="'/logs/' + item['report_id']" target="_blank">{{ item['title'] }}</a>
					<span v-else>{{ item['title'] }}</span>
				</div>
				<div class="col-span-1 th">
					<template v-if="item['won'] === 0">Н</template>
					<template v-if="item['won'] === 1">А</template>
					<template v-else>О</template>
				</div>
				<div class="col-span-3 th" :class="{ positive: data['last'] === item['id'] }">
					{{ $formatDate(item['date'], 'DD MMM YYYY HH:mm:ss') }}
				</div>
			</div>
			<div v-if="data['items'].length === 0" class="grid">
				<div class="th">В этой вселенной еще не было крупных боев</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';
	import { watch, ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Зал славы',
	});

	const { data, error } = await useAsyncData(async () => {
		return useApiGet('/hall');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const type = ref(data.value.type);

	watch(() => type.value, () => {
		load();
	});

	async function load() {
		try {
			data.value = await useApiGet('/hall', {
				type: type.value,
			});
		} catch(e) {
			alert(e.message)
		}
	}
</script>