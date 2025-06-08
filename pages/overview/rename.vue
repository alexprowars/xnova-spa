<template>
	<div class="page-overview-rename">
		<div class="block">
			<div class="title">Переименовать или покинуть планету</div>
			<div class="content !border-0">
				<div class="block-table middle">
					<div class="grid grid-cols-3">
						<div class="th hidden sm:flex middle">{{ planet['coordinates']['galaxy'] }}:{{ planet['coordinates']['system'] }}:{{ planet['coordinates']['planet'] }}</div>
						<div class="th middle">{{ planet['name'] }}</div>
						<div class="th middle">
							<button type="button" @click.prevent="deletePlanet">Покинуть колонию</button>
						</div>
					</div>
					<div class="grid grid-cols-3">
						<div class="th hidden sm:flex middle">Сменить название</div>
						<div class="th middle"><input type="text" :placeholder="planet['name']" v-model="name" maxlength="20"></div>
						<div class="th middle"><button v-if="name" @click.prevent="changeName">Сменить название</button></div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="type" class="block page-overview-planet-image">
			<div class="title">Сменить фон планеты</div>
			<div class="content !border-0 p-2">
				<div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
					<div v-for="i in planetImages[type]">
						<input type="radio" v-model="image" :value="i" :id="'image_'+i">
						<label :for="'image_'+i">
							<img :src="'/images/planeten/' + type + 'planet'+(i < 10 ? '0' : '')+i+'.jpg'" align="absmiddle" width="100%" alt="">
						</label>
					</div>
				</div>
				<div v-if="image > 0" class="grid">
					<div class="th">
						<button @click.prevent="changeImage">Сменить картинку (1 кредит)</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, openConfirmModal, useHead, navigateTo, useApiSubmit, useSuccessNotification, refreshNuxtData } from '#imports';
	import useStore from '~/store';
	import { computed, ref } from 'vue';
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

	const { planet } = storeToRefs(useStore());
	const name = ref('');
	const image = ref(0);

	const planetImages = {
		trocken: 20,
		wuesten: 4,
		dschjungel: 19,
		normaltemp: 15,
		gas: 16,
		wasser: 18,
		eis: 20,
	};

	const type = computed(() => {
		for (let type in planetImages) {
			if (planet.value.image.includes(type)) {
				return type;
			}
		}

		return null;
	});

	function changeName() {
		useApiSubmit('/planet/rename', {
			name: name.value
		}, () => {
			useSuccessNotification('Название планеты изменено');

			navigateTo('/overview');
		});
	}

	function changeImage() {
		useApiSubmit('/planet/image', {
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
					useApiSubmit('/planet/delete', {
						_method: 'DELETE',
					}, async () => {
						useSuccessNotification('Колония успешно удалена');

						await refreshNuxtData();
					});
				}
			}]
		);
	}
</script>