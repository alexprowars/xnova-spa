<template>
	<div @click="setActive" class="buldings-list-item" :class="[!available ? 'disabled' : '']">
		<img :src="'/images/elements/' + item['id'] + '.webp'" :alt="item['name']">
		<div class="name">
			{{ item['name'] }}
		</div>
		<div class="level">
			{{ item['level'] }}
		</div>
		<div v-if="available" class="upgrade" @click.prevent="addAction">
			<IconUpgrade/>
		</div>
	</div>
</template>

<script setup>
	import IconUpgrade from '~/assets/images/icons/upgrade.svg';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store/index.js';
	import { useApiPost } from '~/composables/useApi.js';
	import { refreshNuxtData, useI18n } from '#imports';
	import { computed } from 'vue';

	const props = defineProps({
		item: {
			tyoe: Object,
		}
	});

	const model = defineModel();

	const { tm } = useI18n();
	const { planet, user, queueByType, fieldsEmpty } = storeToRefs(useStore());

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
		return props.item['available'] && hasResources.value && fieldsEmpty.value > 0
			&& !user.value.vacation && user.value['queue_max'] > queueByType.value('build').length;
	});

	async function addAction () {
		await useApiPost('/buildings/build/insert', {
			element: props.item['id']
		});

		await refreshNuxtData();
	}

	function setActive() {
		model.value = props.item['id'];
	}
</script>