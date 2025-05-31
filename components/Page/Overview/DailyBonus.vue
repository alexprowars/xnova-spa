<template>
	<div class="block page-overview-bonus">
		<div class="title text-center">
			Ежедневный бонус
		</div>
		<div class="block-table">
			<div class="row">
				<div class="col th">
					Сейчас вы можете получить по <b class="positive">{{ $number(amount) }}</b> Металла, Кристаллов и Дейтерия.<br>
					Каждый день размер бонуса будет увеличиваться.<br>
					<br>
					<button @click.prevent="getBonus" class="button">Получить ресурсы</button><br>
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