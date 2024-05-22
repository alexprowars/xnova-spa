<template>
	<div class="block start">
		<div class="title">Обмен сырья</div>
		<div class="content border-0">
			<RouterForm action="/merchant/" class="container-fluid table">
				<input type="hidden" name="exchange" value="Y">
				<input type="hidden" name="type" v-model="type">
				<div class="row">
					<div class="col th">
						Вы можете вызвать межгалактического торговца для обмена ресурсов.<br>
						<div class="negative">Каждая операция обмена будет стоить вам 1 кредит.</div><br><br>

						<select v-model="type">
							<option value="">Выберите ресурс для обмена</option>
							<option value="metal">Металл</option>
							<option value="crystal">Кристалл</option>
							<option value="deuterium">Дейтерий</option>
						</select>

						<br><br>
						(курс {{ page['modifiers']['deuterium'] }}/{{ page['modifiers']['crystal'] }}/{{ page['modifiers']['metal'] }})
						<br><br>
					</div>
					<div v-if="type !== ''" class="col th">
						<div class="block-table">
							<div class="row">
								<div class="c col">Обменять {{ $lower($t('resources.'+type)) }} на</div>
							</div>
							<div class="row">
								<div class="col-3 th"></div>
								<div class="col-3 th">Курс</div>
								<div class="col-6 th"></div>
							</div>
							<div v-for="res in ['metal', 'crystal', 'deuterium']" class="row">
								<div class="col-3 th middle">{{ $t('resources.'+res) }}</div>
								<div class="col-3 th middle">{{ page['modifiers'][res] / page['modifiers'][type] }}</div>
								<div class="col-6 th middle">
									<Number v-if="type !== res" :name="res" min="0" v-model="exchange[res]" placeholder="введите кол-во" v-on:input="calculate"/>
									<span v-else>{{ exchange[res] }}</span>
								</div>
							</div>
							<div class="row">
								<div class="col th negative">Внимание! Стоимость обмена 1 кредит</div>
							</div>
							<div class="row">
								<div class="col c"><input type="submit" value="Обменять ресурсы"></div>
							</div>
						</div>
					</div>
				</div>
			</RouterForm>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useRoute } from '#imports';
	import useStore from '~/store';
	import { ref, watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	const type = ref('');
	const exchange = ref({
		metal: 0, crystal: 0, deuterium: 0
	});

	function calculate () {
		let res = 0;

		['metal', 'crystal', 'deuterium'].forEach((item) => {
			if (type.value !== item) {
				res += exchange.value[item] * (page.value['modifiers'][item] / page.value['modifiers'][type.value]);
			}
		});

		exchange.value[type.value] = res;
	}
</script>