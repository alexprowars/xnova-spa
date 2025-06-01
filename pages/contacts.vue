<template>
	<div class="block">
		<div class="title">Начальство</div>
		<div class="content border-0">
			<div class="block-table">
				<div class="row">
					<div class="col th">
						<span style="color: orange">Здесь вы найдёте адреса всех администраторов и операторов игры для обратной связи</span>
					</div>
				</div>
				<div class="row">
					<div class="col c">Имя</div>
					<div class="col c">Должность</div>
					<div class="col c">E-mail</div>
				</div>
				<template v-for="item in items">
					<div class="row">
						<div class="col th">{{ item['name'] }}</div>
						<div class="col th">{{ item['role'] }}</div>
						<div class="col th">
							<a :href="'mailto:'+item['email']">{{ item['email'] }}</a>
						</div>
					</div>
					<div class="row" v-if="item['about'].length > 0">
						<div class="col c">
							<TextViewer :text="item['about']"/>
						</div>
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