<template>
	<div class="page-start">
		<div v-if="!user['sex'] || !user['avatar']" class="block start">
			<div class="title">Основная информация</div>
			<div class="content border-0">
				<RouterForm @submit="onSubmit">
					<div class="block-table">
						<div class="row">
							<div class="col th">Введите ваш игровой ник</div>
							<div class="col th"><input name="username" size="20" maxlength="30" type="text" :value="user['name']" title=""></div>
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
												<input type="radio" name="avatar" :value="'1_'+i" :id="'f1_'+i" title="">
												<label :for="'f1_'+i" class="avatar">
													<img :src="'/images/faces/1/'+i+'s.png'" alt="">
												</label>
											</div>
										</div>
									</Tab>
									<Tab name="Женский">
										<div class="row">
											<div v-for="i in 8" class="col-3">
												<input type="radio" name="avatar" :value="'2_'+i" :id="'f2_'+i" title="">
												<label :for="'f2_'+i" class="avatar">
													<img :src="'/images/faces/2/'+i+'s.png'" alt="">
												</label>
											</div>
										</div>
									</Tab>
								</Tabs>
							</div>
						</div>
						<div class="row">
							<div class="col th">
								<button type="submit">Продолжить</button>
							</div>
						</div>
					</div>
				</RouterForm>
			</div>
		</div>
		<div v-else-if="!user['race']" class="block start race">
			<div class="title">Выбор фракции</div>
			<div class="content">
				<RouterForm id="tabs">
					<template v-for="(race, index) in Object.keys($tm('races'))">
						<input type="radio" name="race" :value="race" :id="'f_'+race">
						<label :for="'f_'+race" class="avatar">
							<img :src="'/images/skin/race' + race + '.gif'" alt=""><br>
							<h3>{{ $t('races.' + race) }}</h3>
							<span v-html="$t('info.' + (701 + index))"></span>
						</label>
					</template>
					<br>
					<button type="submit">Продолжить</button>
					<br><br>
				</RouterForm>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, useHead } from '#imports';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		view: {
			header: false,
			menu: false,
			resources: false,
		}
	});

	useHead({
		title: 'Выбор персонажа',
	});

	const { user } = storeToRefs(useStore());

	function onSubmit() {
		useStore().loadState();
	}
</script>