<template>
	<div class="page-overview-rename">
		<div class="block">
			<div class="title">Переименовать или покинуть планету</div>
			<div class="content border-0">
				<div class="block-table middle">
					<div class="row">
						<div class="col th d-none d-sm-flex">{{ planet['coordinates']['galaxy'] }}:{{ planet['coordinates']['system'] }}:{{ planet['coordinates']['planet'] }}</div>
						<div class="col th">{{ planet['name'] }}</div>
						<div class="col th">
							<button type="button" @click.prevent="deletePlanet">Покинуть колонию</button>
						</div>
					</div>
					<div class="row">
						<div class="col th d-none d-sm-flex">Сменить название</div>
						<div class="col th"><input type="text" :placeholder="planet['name']" v-model="name" maxlength="20"></div>
						<div class="col th"><button v-if="name" @click.prevent="changeName">Сменить название</button></div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="page['type'] !== ''" class="block page-overview-planet-image">
			<div class="title">Сменить фон планеты</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div v-for="i in page['images'][page['type']]" class="col-6 col-sm-3 col-md-2">
							<input type="radio" v-model="image" :value="i" :id="'image_'+i">
							<label :for="'image_'+i">
								<img :src="'/images/planeten/' + page['type'] + 'planet'+(i < 10 ? '0' : '')+i+'.jpg'" align="absmiddle" width="100%" alt="">
							</label>
						</div>
					</div>
					<div v-if="image > 0" class="row">
						<div class="col th">
							<button @click.prevent="changeImage">Сменить картинку (1 кредит)</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, openConfirmModal, showError, useAsyncData, useHead, useRoute, navigateTo, useApiSubmit, useSuccessNotification } from '#imports';
	import useStore from '~/store';
	import { ref } from 'vue';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Переименовать планету',
	});

	const { data: page, error, refresh } = await useAsyncData(
		async () => await useStore().loadPage(),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const { planet } = storeToRefs(useStore());
	const name = ref('');
	const image = ref(0);

	function changeName() {
		useApiSubmit('/overview/rename', {
			name: name.value
		}, () => {
			useSuccessNotification('Название планеты изменено');

			navigateTo('/overview');
		});
	}

	function changeImage() {
		useApiSubmit('/overview/image', {
			image: image.value
		}, () => {
			useSuccessNotification('Картинка планеты изменена');

			navigateTo('/overview');
		});
	}

	function deletePlanet() {
		openConfirmModal(
			null,
			'Удалить колонию?',
			[{
				title: 'Закрыть',
			}, {
				title: 'Удалить',
				handler: () => {
					useApiSubmit('/overview/delete/' + planet.value['id'], {
						_method: 'DELETE',
					}, async () => {
						useSuccessNotification('Колония успешно удалена');

						await refresh();
					});
				}
			}]
		);
	}
</script>