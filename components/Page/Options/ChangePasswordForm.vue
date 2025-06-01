<template>
	<table class="table">
		<tbody>
			<tr>
				<th>Старый пароль</th>
				<th><input name="current_password" v-model="currentPassword" :class="{error: v$.currentPassword.$error}" size="20" value="" type="password" autocomplete="current-password"></th>
			</tr>
			<tr>
				<th>Новый пароль (мин. 8 Знаков)</th>
				<th><input name="password" v-model="newPassword" :class="{error: v$.newPassword.$error}" size="20" maxlength="40" type="password" autocomplete="new-password"></th>
			</tr>
			<tr>
				<th>Новый пароль (повтор)</th>
				<th><input name="password_confirmation" v-model="newPasswordConfirmation" :class="{error: v$.newPasswordConfirmation.$error}" size="20" maxlength="40" type="password" autocomplete="new-password"></th>
			</tr>
			<tr>
				<th colspan="2">
					<button type="button" @click.prevent="save">{{ $t('options.save') }}</button>
				</th>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
	import { useVuelidate } from '@vuelidate/core';
	import { required, sameAs } from '@vuelidate/validators';
	import { ref } from 'vue';
	import { navigateTo, useSuccessNotification, useApiSubmit } from '#imports';

	const currentPassword = ref('');
	const newPassword = ref('');
	const newPasswordConfirmation = ref('');

	const validations = {
		currentPassword: {
			required
		},
		newPassword: {
			required,
		},
		newPasswordConfirmation: {
			required,
			sameAsPassword: sameAs(newPassword)
		},
	}

	const v$ = useVuelidate(
		validations,
		{ currentPassword, newPassword, newPasswordConfirmation },
		{ $autoDirty: true }
	);

	async function save() {
		if (!await v$.value.$validate()) {
			return
		}

		await useApiSubmit('/options/password', {
			current_password: currentPassword.value,
			password: newPassword.value,
			password_confirmation: newPasswordConfirmation.value,
		}, async () => {
			useSuccessNotification('Ваш Пароль успешно изменен');
			navigateTo('/options');
		});
	}
</script>