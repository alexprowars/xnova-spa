<template>
	<div class="block">
		<div class="title">
			Информация об альянсе
		</div>
		<div class="content">
			<div class="block-table text-center">
				<div v-if="page['image']">
					<div class="th"><img :src="page['image']" style="max-width:100%" alt=""></div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">Аббревиатура</div>
					<div class="th">{{ page['tag'] }}</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">Имя</div>
					<div class="th">{{ page['name'] }}</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">Участники</div>
					<div class="th">{{ page['member_scount'] }}</div>
				</div>
				<div v-if="page['description']">
					<div class="b min-h-20 p-2 text-left">
						<TextViewer :text="page['description']"/>
					</div>
				</div>
				<div v-if="page['web']" class="grid grid-cols-2">
					<div class="th">Сайт альянса:</div>
					<div class="th"><a :href="page['web']" target="_blank">{{ page['web'] }}</a></div>
				</div>
				<div v-if="page['request']">
					<div class="th">
						<NuxtLink :to="'/alliance/join/' + page['id']" class="button">Вступить в альянс</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/alliance/info/' + useRoute().params.id);
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	useHead({
		title: 'Альянс ' + page.value['name'],
	});
</script>