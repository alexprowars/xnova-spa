<template>
	<form action="" method="post" @submit.prevent="send">
		<div class="block-table">
			<div class="row">
				<div class="col c">
					Начать ракетную атаку на [{{ page['galaxy'] }}:{{ page['system'] }}:{{ planet }}]
				</div>
			</div>
			<div class="row">
				<div class="col th">
					Количество ракет ({{ currentPlanet['units']['interplanetary_misil'] }}):
					<input type="number" style="width:25%" min="1" :max="currentPlanet['units']['interplanetary_misil']" v-model.number="count">
				</div>
				<div class="col th">
					Цель:
					<select name="target" v-model="target">
						<option value="all">Вся оборона</option>
						<option value="401">{{ $t('tech.401') }}</option>
						<option value="402">{{ $t('tech.402') }}</option>
						<option value="403">{{ $t('tech.403') }}</option>
						<option value="404">{{ $t('tech.404') }}</option>
						<option value="405">{{ $t('tech.405') }}</option>
						<option value="406">{{ $t('tech.406') }}</option>
						<option value="407">{{ $t('tech.407') }}</option>
						<option value="408">{{ $t('tech.408') }}</option>
					</select>
				</div>
			</div>
			<div class="row">
				<div class="col c">
					<button type="submit">Отправить</button>
					<button @click.prevent="$emit('close')">Отмена</button>
				</div>
			</div>
		</div>
		<div class="separator"></div>
	</form>
</template>

<script setup>
	import useStore from '~/store';
	import { ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useApiPost, useErrorNotification, useSuccessNotification } from '#imports';

	const props = defineProps({
		page: {
			type: Object
		},
		planet: {
			type: Number
		}
	});

	const { planet: currentPlanet } = storeToRefs(useStore());
	const target = ref('all');
	const count = ref(currentPlanet.value['units']['interplanetary_misil'] || 0);

	async function send() {
		try {
			await useApiPost('/rocket', {
				galaxy: props.page['galaxy'],
				system: props.page['system'],
				planet: props.planet,
				count: count.value,
				target: target.value,
			});

			useSuccessNotification('<b>' + count.value + '</b> межпланетные ракеты запущены для атаки удалённой планеты!');
		} catch (e) {
			useErrorNotification(e.message);
		}
	}
</script>