<template>
	<div class="block">
		<div class="title">Начальство</div>
		<div class="content !border-0">
			<div class="block-table text-center">
				<div class="th">
					<span style="color: orange">Здесь вы найдёте адреса всех администраторов и операторов игры для обратной связи</span>
				</div>
				<div class="grid grid-cols-3">
					<div class="c">Имя</div>
					<div class="c">Должность</div>
					<div class="c">E-mail</div>
				</div>
				<template v-for="item in items">
					<div class="grid grid-cols-3">
						<div class="th">{{ item['name'] }}</div>
						<div class="th">{{ item['role'] }}</div>
						<div class="th">
							<a :href="'mailto:'+item['email']">{{ item['email'] }}</a>
						</div>
					</div>
					<div class="c" v-if="item['about'].length > 0">
						<TextViewer :text="item['about']"/>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Администрация',
	});

	const { data: items, error } = await useAsyncData(async () => {
		return await useApiGet('/contacts');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>