<template>
	<div class="block start">
		<div class="title">Обмен сырья</div>
		<div class="content border-0">
			<form method="post" class="container-fluid table" @submit.prevent="exchange">
				<div class="row">
					<div class="col th">
						Вы можете вызвать межгалактического торговца для обмена ресурсов.<br>
						<div class="negative">Каждая операция обмена будет стоить вам 1 кредит.</div><br><br>

						<select v-model="type">
							<option value="">Выберите ресурс для обмена</option>
							<option value="metal">{{ $t('resources.metal') }}</option>
							<option value="crystal">{{ $t('resources.crystal') }}</option>
							<option value="deuterium">{{ $t('resources.deuterium') }}</option>
						</select>

						<br><br>
						(курс {{ modifiers['deuterium'] }}/{{ modifiers['crystal'] }}/{{ modifiers['metal'] }})
						<br><br>
					</div>
					<div v-if="type !== ''" class="col th">
						<div class="block-table">
							<div class="row">
								<div class="c col">Обменять {{ $t('resources.' + type).toLowerCase() }} на</div>
							</div>
							<div class="row">
								<div class="col-3 th"></div>
								<div class="col-3 th">Курс</div>
								<div class="col-6 th"></div>
							</div>
							<div v-for="res in ['metal', 'crystal', 'deuterium']" class="row">
								<div class="col-3 th middle">{{ $t('resources.' + res) }}</div>
								<div class="col-3 th middle">{{ modifiers[res] / modifiers[type] }}</div>
								<div class="col-6 th middle">
									<Number v-if="type !== res" min="0" v-model="resources[res]" placeholder="введите кол-во" @input="calculate"/>
									<span v-else>{{ resources[res] }}</span>
								</div>
							</div>
							<div class="row">
								<div class="col th negative">Внимание! Стоимость обмена 1 кредит</div>
							</div>
							<div class="row">
								<div class="col c">
									<button type="submit">Обменять ресурсы</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, useApiSubmit, useHead, useI18n, useSuccessNotification } from '#imports';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';
	import { computed, ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Торговец',
	});

	const { t } = useI18n();
	const store = useStore();
	const { settings } = storeToRefs(store);

	const type = ref('');
	const resources = ref({ metal: 0, crystal: 0, deuterium: 0 });
	const modifiers = computed(() => settings.value['merchant']);

	function calculate () {
		let res = 0;

		['metal', 'crystal', 'deuterium'].forEach((item) => {
			if (type.value !== item) {
				res += resources.value[item] * (modifiers.value[item] / modifiers.value[type.value]);
			}
		});

		resources.value[type.value] = res;
	}

	function exchange() {
		useApiSubmit('/merchant/exchange', {
			type: type.value, ...resources.value
		}, async (result) => {
			useSuccessNotification('Вы обменяли ' + result['exchange'] + ' ' + t('resources.' + result['type']));

			type.value = '';

			await store.loadState();
		});
	}
</script>