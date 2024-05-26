<template>
	<form ref="formRef" @submit.prevent="send" :method="method">
		<slot></slot>
	</form>
</template>

<script setup>
	import { useApiPost } from '~/composables/useApi';
	import useStore from '~/store';
	import { ref } from 'vue';
	import { startLoading, stopLoading, useRoute } from '#imports';

	const props = defineProps({
		method: {
			type: String,
			default: 'post'
		},
		action: {
			type: String,
			default: ''
		}
	});

	const store = useStore();
	const formRef = ref(null);
	const emit = defineEmits(['submit', 'page']);

	async function send () {
		startLoading();

		let formData = new FormData(formRef.value);

		let action = props.action;

		if (action.length === 0) {
			action = useRoute().fullPath;
		}

		try {
			const result = await useApiPost(action, formData);

			if (result['data'] !== null) {
				emit('page', result['data']);
				delete result['data'];
			}

			store.PAGE_LOAD(result);
			stopLoading();

			emit('submit');
		} catch(e) {
			alert(e.message);
		}
	}
</script>