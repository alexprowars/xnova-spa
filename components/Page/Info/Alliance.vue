<template>
	<div class="block">
		<div class="title">Отправка топлива</div>
		<div class="content border-0">
			<form method="post" action="" @submit.prevent="send">
				<div class="block-table">
					<div class="row">
						<div class="col th">Флоты на удержании возле планеты</div>
					</div>
					<div class="row">
						<div class="col th">
							<select name="fleet" v-model="fleet">
								<option :value="0">-</option>
								<option v-for="fleet in data['fleets']" :value="fleet['id']">[{{ fleet['galaxy'] }}:{{ fleet['system'] }}:{{ fleet['planet'] }}] {{ fleet['name']}}</option>
							</select>
						</div>
					</div>
					<div v-if="fleet" class="row">
						<div class="col th">
							<button type="submit">Отправить {{ data['cost'] }} дейтерия</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { useApiSubmit } from '#imports';
	import { toast } from 'vue3-toastify';

	const props = defineProps({
		data: Object
	});

	const fleet = ref(0);

	function send() {
		useApiSubmit('/info/' + props.item + '/alliance', {
			fleetId: fleet.value,
		}, () => {
			toast('Ракета с дейтерием отправлена на орбиту вашей планете', {
				type: 'success',
			});
		});
	}
</script>