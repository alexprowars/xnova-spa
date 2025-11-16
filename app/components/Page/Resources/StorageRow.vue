<template>
	<div class="grid grid-cols-12">
		<div class="col-span-2 th">
			{{ $t('resources.' + resource) }}
		</div>
		<div class="col-span-1 th text-center">
			{{ storage }}%
		</div>
		<div class="col-span-9 th text-center">
			<ResourcesBar :value="storage"/>
		</div>
	</div>
</template>

<script setup>
	import ResourcesBar from '~/components/Page/Resources/Bar.vue';
	import { computed } from 'vue';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store';

	const props = defineProps({
		resource: String,
	});

	const { planet } = storeToRefs(useStore());

	const storage = computed(() => Math.max(0, Math.floor((planet.value['resources'][props.resource]['value'] / planet.value['resources'][props.resource]['capacity']) * 100)));
</script>