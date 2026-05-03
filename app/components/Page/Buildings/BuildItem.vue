<template>
	<div @click.prevent="setActive" class="buldings-list-item" :class="[!available ? 'disabled' : '']">
		<img :src="'/images/elements/' + item['id'] + '.webp'" :alt="item['name']">
		<div class="name">
			{{ item['name'] }}
		</div>
		<div class="level">
			{{ level }}
		</div>
		<div v-if="inQueue" class="upgrade active">
			<IconUpgrade/>
		</div>
		<div v-else-if="available && user['queue_max'] > queueByType('build').length" class="upgrade" @click.prevent.stop="emit('build', item['id'])">
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

	const { tm } = useI18n();
	const { planet, user, queueByType, fieldsEmpty } = storeToRefs(useStore());
	const emit = defineEmits(['select', 'build']);

	const level = computed(() => planet.value['buildings'][props['item']['code']] || 0);

	const hasResources = computed(() => {
		return Object.keys(tm('resources')).every(res => {
			if (typeof props.item.price[res] !== 'undefined' && typeof planet.value['resources'][res] !== 'undefined' && props.item.price[res] > 0) {
				if (res === 'energy') {
					if (planet.value['resources'][res].capacity < props.item.price[res]) {
						return false
					}
				} else if (planet.value['resources'][res].value < props.item.price[res]) {
					return false
				}
			}

			return true
		})
	});

	const available = computed(() => {
		return props.item['available'] && hasResources.value && fieldsEmpty.value > 0 && !user.value.vacation;
	});

	const inQueue = computed(() => {
		return queueByType.value('build').filter((item) => item['item'] === props.item['id']).length > 0;
	})

	function setActive() {
		emit('select');
	}
</script>