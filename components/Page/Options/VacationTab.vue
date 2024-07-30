<template>
	<form ref="formRef" method="post" @submit.prevent="send">
		<table class="table">
			<tbody>
				<tr>
					<td class="c" colspan="2">{{ $t('options.vacation_mode') }}</td>
				</tr>
				<tr>
					<th colspan="2">{{ $t('options.vacation_mode_until') }}: <br/>{{ dayjs(data['um_end_date']).tz().format('DD MMM YYYY HH:mm:ss') }}</th>
				</tr>
				<tr>
					<th>{{ $t('options.nickname') }}</th>
					<th><input name="username" size="20" :value="data['opt_usern_data']" type="hidden">{{ data['opt_usern_data'] }}</th>
				</tr>
				<tr>
					<th><a :title="$t('options.vacation_tip')">{{ $t('options.vacation_on') }}</a></th>
					<th><input name="vacation" v-model="data['opt_modev_data']" type="checkbox"></th>
				</tr>
				<tr>
					<th><a :title="$t('options.delete_tip')">{{ $t('options.delete_on') }}</a></th>
					<th><input name="delete" v-model="data['opt_delac_data']" type="checkbox"></th>
				</tr>
				<tr>
					<th colspan="2">
						<button type="submit">{{ $t('options.save') }}</button>
					</th>
				</tr>
			</tbody>
		</table>
	</form>
</template>

<script setup>
	import dayjs from 'dayjs';
	import { refreshNuxtData, useApiSubmit, useSuccessNotification } from '#imports';
	import { ref } from 'vue';

	defineProps({
		data: Object,
	});

	const formRef = ref(null);

	function send() {
		useApiSubmit('/options', new FormData(formRef.value), () => {
			useSuccessNotification('Настройки успешно изменены');

			refreshNuxtData('page-options');
		});
	}
</script>