<template>
	<div>
		<div class="block-table">
			<div class="row">
				<div class="col-1 c middle">TOP50</div>
				<div class="col c middle">Зал Славы</div>
				<div class="col-3 c middle">
					<select v-model.number="page['type']">
						<option value="0">Одиночные</option>
						<option value="1">Командные</option>
					</select>
				</div>
			</div>
		</div>
		<div class="separator"></div>
		<div class="block-table">
			<div class="row">
				<div class="col-1 c">Место</div>
				<div class="col c">
					{{ page['type'] === 0 ? 'Самые разрушительные бои' : 'Самые разрушительные групповые бои' }}
				</div>
				<div class="col-1 c">Итог</div>
				<div class="col-2 c">Дата</div>
			</div>
			<div v-for="(log, i) in page['hall']" class="row">
				<div class="col-1 th">{{ i + 1 }}</div>
				<div class="col th">
					<a :href="'/log/'+log['log']+'/'" target="_blank">{{ log['title'] }}</a>
				</div>
				<div class="col-1 th">
					<template v-if="log['won'] === 0">Н</template>
					<template v-if="log['won'] === 1">А</template>
					<template v-else>О</template>
				</div>
				<div class="col-2 th" :class="{positive: page['time'] === log['time']}">
					{{ $date(log['time'], 'd.m.y H:i') }}
				</div>
			</div>
			<div v-if="page['hall'].length === 0" class="row">
				<div class="col th">В этой вселенной еще не было крупных боев</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiPost, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { watch } from 'vue';

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
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	watch(() => page.value.type, () => {
		load();
	});

	async function load() {
		try {
			const result = await useApiPost('/hall/', {
				type: page.value['type']
			})

			page.value = result['data']
		} catch(e) {
			alert(e.message)
		}
	}
</script>