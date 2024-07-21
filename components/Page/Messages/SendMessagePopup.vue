<template>
	<a href="" @click.prevent="openPopup">
		<span class="sprite skin_m"></span>
	</a>
</template>

<script setup>
	import { openPopupModal, useApiGet, useLoadingIndicator } from '#imports';
	import MessageForm from '~/components/Page/Messages/Form.vue';

	const props = defineProps({
		id: Number,
	});

	async function openPopup() {
		const { start, finish } = useLoadingIndicator();

		start();

		const { id, to, message } = await useApiGet('/messages/write/' + props.id)
			.then(({ data }) => data);

		finish();

		await openPopupModal(MessageForm, { id, to, message });
	}
</script>