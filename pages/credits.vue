<template>
	<div class="page-credits">
		<div class="block">
			<div class="content container-fluid">
				<div class="row">
					<div class="col th border-0">
						<br>
						Для развития проекта Вы можете поддержать нас, получая кредиты по следующему курсу:<br><br>
						<div class="text-center">
							1 кредит - 1 руб.
						</div>
						<br><br>
					</div>
				</div>
			</div>
		</div>
		<div class="block">
			<div class="title text-center">
				Покупка кредитов
			</div>
			<div class="content container-fluid">
				<div class="row">
					<div v-if="!page['payment']" class="col th border-0">
						<br><br>
						Ваш ID: <span class="neutral">{{ page['id'] }}</span>
						<br><br>


						<RouterForm action="/credits/">
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
						</RouterForm>

						<br><br>
					</div>
					<div v-else class="col th">
						<br>
						Счет сформирован. Нажмите кнопку "перейти к оплате" для продолжения процедуры покупки кредитов
						<br><br>

						<form action="http://www.free-kassa.ru/merchant/cash.php" method="post" target="_blank">
							<input type="hidden" name="MrchLogin" :value="page['payment']['merchant']">
							<input type="hidden" name="InvDesc" value="Покупка кредитов">
							<input type="hidden" name="InvId" :value="page['payment']['id']">
							<input type="hidden" name="Email" :value="page['payment']['email']">
							<input type="hidden" name="Shp_UID" :value="page['id']">
							<input type="hidden" name="SignatureValue" :value="page['payment']['hash']">
							<input type="hidden" name="Culture" value="RU">
							<input type="hidden" name="OutSum" :value="page['payment']['summ']">
							<br>
							<button type="submit">Перейти к оплате</button>
						</form>

						<br><br>
						Счет выставлен для ID
						<span class="neutral">{{ page['id'] }}</span>

						<br><br>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Покупка кредитов',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>