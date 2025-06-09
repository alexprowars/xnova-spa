<template>
	<div v-if="planet['units']['interceptor_misil'] || planet['units']['interplanetary_misil']" class="block">
		<div class="title">Уничтожитель ракет</div>
		<div class="content">
			<form method="post" action="" class="block-table" @submit.prevent="send">
				<div v-if="planet['units']['interceptor_misil']" class="grid grid-cols-2">
					<div class="th">{{ $t('tech.502') }}: {{ planet['units']['interceptor_misil'] }}</div>
					<div class="th"><Number v-model="interceptor"/></div>
				</div>
				<div v-if="planet['units']['interplanetary_misil']" class="grid grid-cols-2">
					<div class="th">{{ $t('tech.502') }}: {{ planet['units']['interplanetary_misil'] }}</div>
					<div class="th"><Number v-model="interplanetary"/></div>
				</div>
				<div v-if="interceptor > 0 || interplanetary > 0" class="grid">
					<div class="th">
						<button type="submit">Уничтожить</button>
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