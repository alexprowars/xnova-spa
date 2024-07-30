<template>
	<div v-if="planet['units']['interceptor_misil'] || planet['units']['interplanetary_misil']" class="block">
		<div class="title">Уничтожитель ракет</div>
		<div class="content border-0">
			<form method="post" action="" @submit.prevent="send">
				<div class="block-table">
					<div v-if="planet['units']['interceptor_misil']" class="row">
						<div class="col th">{{ $t('tech.502') }}: {{ planet['units']['interceptor_misil'] }}</div>
						<div class="col th"><Number v-model="interceptor"/></div>
					</div>
					<div v-if="planet['units']['interplanetary_misil']" class="row">
						<div class="col th">{{ $t('tech.502') }}: {{ planet['units']['interplanetary_misil'] }}</div>
						<div class="col th"><Number v-model="interplanetary"/></div>
					</div>
					<div v-if="interceptor > 0 || interplanetary > 0" class="row">
						<div class="col th">
							<button type="submit">Уничтожить</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { useApiSubmit, useSuccessNotification } from '#imports';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store/index.js';

	const props = defineProps({
		item: {
			type: Number,
		},
	});

	const { planet } = storeToRefs(useStore());
	const interceptor = ref(0);
	const interplanetary = ref(0);

	function send() {
		useApiSubmit('/info/' + props.item + '/missiles', {
			interceptor: interceptor.value,
			interplanetary: interplanetary.value,
		}, () => {
			useSuccessNotification('Ракеты уничтожены');

			interceptor.value = 0;
			interplanetary.value = 0;
		});
	}
</script>