<template>
	<div @click="setActive" class="buldings-list-item" :class="[!available ? 'disabled' : '']">
		<img :src="'/images/elements/' + item['id'] + '.webp'" :alt="item['name']">
		<div class="name">
			{{ item['name'] }}
		</div>
		<div class="level">
			{{ $formatNumber(level) }}
		</div>
	</div>
</template>

<script setup>
	import { storeToRefs } from 'pinia';
	import useStore from '~/store/index.js';
	import { computed } from 'vue';

	const props = defineProps({
		item: {
			tyoe: Object,
		}
	});

	const model = defineModel();

	const { user, planet } = storeToRefs(useStore());
	const emit = defineEmits(['build']);

	const level = computed(() => planet.value['units'][props['item']['code']] || 0);

	const available = computed(() => {
		return props.item['available'] && !user.value.vacation;
	});

	function setActive() {
		model.value = props.item['id'];
	}
</script>