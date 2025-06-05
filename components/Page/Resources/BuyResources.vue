<template>
	<div v-if="visible" class="block">
		<div class="title text-center">
			Покупка ресурсов (8 ч. выработка ресурсов)
		</div>
		<div class="content border-0">
			<div class="block-table">
				<div class="row">
					<div class="col-4 th">
						<span v-if="!data['time']">
							<a @click.prevent="buyResources" class="button">Купить за 10 кредитов</a>
						</span>
						<span v-else>
							Следующая покупка через
							<br>
							{{ $formatTime(data['time']) }}
						</span>
					</div>
					<div class="col-8 th middle">
						<div>
							Вы можете купить:
							<Colored :value="data['metal'] || 0"/> металла,
							<Colored :value="data['crystal'] || 0"/> кристалла,
							<Colored :value="data['deuterium'] || 0"/> дейтерия
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { openConfirmModal, useApiSubmit, useSuccessNotification, refreshNuxtData } from '#imports';
	import { computed } from 'vue';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store';

	defineProps({
		data: Object,
	});

	const { user, planet } = storeToRefs(useStore());

	const visible = computed(() => {
		return planet.value.type === 1 && user.value.vacation === null;
	});

	function buyResources() {
		openConfirmModal(
			null,
			'Купить ресурсы за 10 кредитов?',
			[{
				title: 'Нет',
			}, {
				title: 'Да',
				handler: () => {
					useApiSubmit('/resources/buy', {}, (result) => {
						useSuccessNotification('Вы успешно купили ' + result['metal'] + ' металла, ' + result['crystal'] + ' кристалла, ' + result['deuterium'] + ' дейтерия');

						refreshNuxtData();
					});
				}
			}]
		);
	}
</script>