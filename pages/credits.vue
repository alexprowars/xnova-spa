<template>
	<div class="page-credits">
		<div class="block">
			<div class="title text-center">
				Информация
			</div>
			<div class="content text-center">
				<div class="th !p-4">
					Для развития проекта Вы можете поддержать нас, получая кредиты по следующему курсу:<br><br>
					<div>
						1 кредит - 1 руб.
					</div>
				</div>
			</div>
		</div>
		<div class="block">
			<div class="title text-center">
				Покупка кредитов
			</div>
			<div class="content text-center">
				<div class="th !p-4">
					<div class="mb-4">Ваш ID: <span class="neutral">{{ user['id'] }}</span></div>
					<form @click.prevent="pay">
						Введите ID игрока, на счет которого будут зачислены кредиты:
						<br>(если поле не заполнено, то кредиты поступят на ваш счет)
						<br><br>
						<input type="text" name="userId" value="">
						<br><br>
						Введите число желаемых кредитов:
						<br>
						<input type="text" name="summ" value="10">
						<br>
						<button type="submit">Купить</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { definePageMeta, useApiSubmit, useHead } from '#imports';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store/index.js';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Покупка кредитов',
	});

	const { user } = storeToRefs(useStore());

	function pay() {
		useApiSubmit('credits/pay', {}, () => {});
	}
</script>