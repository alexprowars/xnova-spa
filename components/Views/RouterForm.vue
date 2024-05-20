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

	async function send () {
		startLoading();

		let formData = new FormData(formRef.value);

		let action = props.action;

		if (action.length === 0) {
			action = useRoute().fullPath;
		}

		try {
			const result = await useApiPost(action, formData)

			store.PAGE_LOAD(result)
			stopLoading()
		} catch(e) {
			alert(e.message)
		}
	}
</script>