<template>
	<div class="block page-overview-bonus">
		<div class="title text-center">
			Ежедневный бонус
		</div>
		<div class="content block-table">
			<div class="grid">
				<div class="th text-center">
					<div>Сейчас вы можете получить по <b class="positive">{{ $formatNumber(amount) }}</b> Металла, Кристаллов и Дейтерия.</div>
					<div class="mb-4">Каждый день размер бонуса будет увеличиваться.</div>
					<button @click.prevent="getBonus" class="button">Получить ресурсы</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useApiPost, number, useErrorNotification, useSuccessNotification } from '#imports';
	import useStore from '~/store/index.js';

	defineProps({
		amount: Number,
	})

	async function getBonus () {
		try {
			const result = await useApiPost('/user/daily');

			useSuccessNotification('Спасибо за поддержку!<br>Вы получили в качестве бонуса по <b>' + number(result['resources']) + '</b> Металла, Кристаллов и Дейтерия' + (result['credits'] ? ', а также 1 кредит.' : ''));

			await useStore().loadState();
		} catch (e) {
			useErrorNotification(e.message);
		}
	}
</script>