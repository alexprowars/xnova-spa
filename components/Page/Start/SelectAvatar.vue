<template>
	<div class="block start">
		<div class="title">Основная информация</div>
		<div class="content border-0">
			<div class="block-table">
				<div class="row">
					<div class="col th">Введите ваш игровой ник</div>
					<div class="col th"><input name="name" size="20" maxlength="30" type="text" v-model="name"></div>
				</div>
				<div class="row">
					<div class="col c">Выберите ваш игровой образ</div>
				</div>
				<div class="row">
					<div class="col th">
						<Tabs>
							<Tab name="Мужской">
								<div class="row">
									<div v-for="i in 8" class="col-3">
										<input type="radio" :value="'1_'+i" :id="'f1_'+i" v-model="avatar">
										<label :for="'f1_'+i" class="avatar">
											<img :src="'/images/faces/1/'+i+'s.png'" alt="">
										</label>
									</div>
								</div>
							</Tab>
							<Tab name="Женский">
								<div class="row">
									<div v-for="i in 8" class="col-3">
										<input type="radio" :value="'2_'+i" :id="'f2_'+i" v-model="avatar">
										<label :for="'f2_'+i" class="avatar">
											<img :src="'/images/faces/2/'+i+'s.png'" alt="">
										</label>
									</div>
								</div>
							</Tab>
						</Tabs>
					</div>
				</div>
				<div v-if="name && avatar" class="row">
					<div class="col th">
						<button @click.prevent="save">Продолжить</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { storeToRefs } from 'pinia';
	import useStore from '~/store/index.js';
	import { ref } from 'vue';
	import { useApiPost } from '~/composables/useApi.js';

	const { user } = storeToRefs(useStore());
	const name = ref(user.value['name']);
	const avatar = ref(null);

	async function save() {
		try {
			await useApiPost('/start', {
				name: name.value,
				avatar: avatar.value,
			});

			await useStore().loadState();
		} catch (e) {
			alert(e.data?.message || e.message);
		}
	}
</script>