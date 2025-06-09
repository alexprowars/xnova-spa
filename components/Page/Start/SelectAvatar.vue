<template>
	<div class="block start">
		<div class="title">Основная информация</div>
		<div class="content">
			<div class="block-table">
				<div class="grid grid-cols-2">
					<div class="th">Введите ваш игровой ник</div>
					<div class="th"><input name="name" size="20" maxlength="30" type="text" v-model="name"></div>
				</div>
				<div class="grid">
					<div class="c">Выберите ваш игровой образ</div>
				</div>
				<div class="grid">
					<div class="th">
						<Tabs>
							<Tab name="Мужской">
								<div class="grid grid-cols-4">
									<div v-for="i in 8">
										<input type="radio" :value="'1_'+i" :id="'f1_'+i" v-model="avatar">
										<label :for="'f1_'+i" class="avatar">
											<img :src="'/images/faces/1/'+i+'s.png'" alt="">
										</label>
									</div>
								</div>
							</Tab>
							<Tab name="Женский">
								<div class="grid grid-cols-4">
									<div v-for="i in 8">
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
				<div v-if="name && avatar" class="grid">
					<div class="th">
						<button @click.prevent="save">Продолжить</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { storeToRefs } from 'pinia';
	import useStore from '~/store';
	import { ref } from 'vue';
	import { useApiPost } from '#imports';

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