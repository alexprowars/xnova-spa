<template>
	<div class="page-start">
		<div v-if="page['sex'] === 0 || page['avatar'] === 0" class="block start">
			<div class="title">Основная информация</div>
			<div class="content border-0">
				<RouterForm action="">
					<input type="hidden" name="save" value="Y">
					<div class="block-table">
						<div class="row">
							<div class="col th">Введите ваш игровой ник</div>
							<div class="col th"><input name="character" size="20" maxlength="20" type="text" :value="page['name']" title=""></div>
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
												<input type="radio" name="face" :value="'1_'+i" :id="'f1_'+i" title="">
												<label :for="'f1_'+i" class="avatar">
													<img :src="'/images/faces/1/'+i+'s.png'" alt="">
												</label>
											</div>
										</div>
									</Tab>
									<Tab name="Женский">
										<div class="row">
											<div v-for="i in 8" class="col-3">
												<input type="radio" name="face" :value="'2_'+i" :id="'f2_'+i" title="">
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
		<div v-else="page['race'] === 0" class="block start race">
			<div class="title">Выбор фракции</div>
			<div class="content">
				<RouterForm action="" id="tabs">
					<input type="hidden" name="save" value="Y">
					<template v-for="race in page['races']">
						<input type="radio" name="race" :value="race['i']" :id="'f_'+race['i']">
						<label :for="'f_'+race['i']" class="avatar">
							<img :src="'/images/skin/race'+race['i']+'.gif'" alt=""><br>
							<h3>{{ race['name'] }}</h3>
							<span v-html="race['description']"></span>
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
	import { showError, useAsyncData, useHead } from '#imports';
	import useStore from '~/store';

	useHead({
		title: 'Выбор персонажа',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	if (error.value) {
		throw showError(error.value);
	}
</script>