<template>
	<div class="block">
		<div class="title">Отправка топлива</div>
		<div class="content">
			<form method="post" action="" class="block-table" @submit.prevent="send">
				<div class="grid">
					<div class="th">Флоты на удержании возле планеты</div>
				</div>
				<div class="grid">
					<div class="th">
						<select name="fleet" v-model="fleet">
							<option :value="0">-</option>
							<option v-for="fleet in data['fleets']" :value="fleet['id']">[{{ fleet['galaxy'] }}:{{ fleet['system'] }}:{{ fleet['planet'] }}] {{ fleet['name']}}</option>
						</select>
					</div>
				</div>
				<div v-if="fleet" class="grid">
					<div class="th">
						<button type="submit">Отправить {{ data['cost'] }} дейтерия</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { useApiSubmit, useSuccessNotification } from '#imports';

	const props = defineProps({
		data: Object
	});

	const fleet = ref(0);

	function send() {
		useApiSubmit('/info/' + props.item + '/alliance', {
			fleetId: fleet.value,
		}, () => {
			useSuccessNotification('Ракета с дейтерием отправлена на орбиту вашей планете');
		});
	}
</script>