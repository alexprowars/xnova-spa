<template>
	<a :href="'/info/' + id" @click.prevent="openPopup">
		<slot></slot>
	</a>
</template>

<script setup>
	import InfoContent from '~/components/Page/Info/Content.vue'
	import { openPopupModal, useApiGet, useWithLoadngIndicator } from '#imports';

	const props = defineProps({
		id: {
			type: Number,
			default: 0,
		}
	})

	function openPopup () {
		if (props.id <= 0) {
			return;
		}

		useWithLoadngIndicator(async () => {
			const result = await useApiGet('/info/' + props.id);

			await openPopupModal(InfoContent, { item: result });
		})
	}
</script>