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
					Количество ракет ({{ planet['units']['interplanetary_misil'] }}):
					<input type="number" style="width:25%" min="1" :max="planet['units']['interplanetary_misil']" v-model.number="count">
				</div>
				<div class="col th">
					Цель:
					<select name="target" v-model="target">
						<option value="all">Вся оборона</option>
						<option value="0">{{ $t('tech.401') }}</option>
						<option value="1">{{ $t('tech.402') }}</option>
						<option value="2">{{ $t('tech.403') }}</option>
						<option value="3">{{ $t('tech.404') }}</option>
						<option value="4">{{ $t('tech.405') }}</option>
						<option value="5">{{ $t('tech.406') }}</option>
						<option value="6">{{ $t('tech.407') }}</option>
						<option value="7">{{ $t('tech.408') }}</option>
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
	import { useApiPost } from '~/composables/useApi';
	import useStore from '~/store';
	import { ref } from 'vue';
	import { storeToRefs } from 'pinia';

	const props = defineProps({
		page: {
			type: Object
		},
		planet: {
			type: Number
		}
	});

	const { planet } = storeToRefs(useStore());
	const target = ref('all');
	const count = ref(planet.value['units']['interplanetary_misil'] || 0);

	function send () {
		useApiPost('/rocket/', {
			galaxy: props.page['galaxy'],
			system: props.page['system'],
			planet: props.planet,
			count: count.value,
			target: target.value,
		})
		.then((result) => {
			useStore().PAGE_LOAD(result)
		})
	}
</script>