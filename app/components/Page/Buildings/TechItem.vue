<template>
	<div @click="setActive" class="buldings-list-item" :class="[!available ? 'disabled' : '']">
		<img :src="'/images/elements/' + item['id'] + '.webp'" :alt="item['name']">
		<div class="name">
			{{ item['name'] }}
		</div>
		<div class="level">
			{{ item['level'] }}
		</div>
		<div v-if="typeof item['build'] === 'object'" class="upgrade active">
			<IconUpgrade/>
		</div>
		<div v-else-if="available && !queueByType('tech').length" class="upgrade" @click.prevent="emit('build', item['id'])">
			<IconUpgrade/>
		</div>
	</div>
</template>

<script setup>
	import IconUpgrade from '~/assets/images/icons/upgrade.svg';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store/index.js';
	import { useI18n } from '#imports';
	import { computed } from 'vue';

	const props = defineProps({
		item: {
			tyoe: Object,
		}
	});

	const model = defineModel();

	const { tm } = useI18n();
	const { planet, user, queueByType } = storeToRefs(useStore());
	const emit = defineEmits(['build']);

	console.log(queueByType.value('tech').length)

	const hasResources = computed(() => {
		return Object.keys(tm('resources')).every(res => {
			return !(typeof props.item.price[res] !== 'undefined' && planet.value['resources'][res] !== 'undefined' && props.item.price[res] > 0
				&& planet.value['resources'][res] && planet.value['resources'][res].value < props.item.price[res]);
		})
	});

	const available = computed(() => {
		return props.item['available'] && hasResources.value && !user.value.vacation;
	});

	function setActive() {
		model.value = props.item['id'];
	}
</script>