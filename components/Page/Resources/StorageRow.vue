<template>
	<div class="row">
		<div class="col-2 th">
			{{ $t('resources.' + resource) }}
		</div>
		<div class="col-1 th">
			{{ storage * 100 }}%
		</div>
		<div class="col-9 th">
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

	const storage = computed(() => Math.min(100, Math.max(0, Math.floor((planet.value['resources'][props.resource]['value'] / planet.value['resources'][props.resource]['capacity']) * 100))));
</script>