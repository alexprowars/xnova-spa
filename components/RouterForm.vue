<template>
	<form ref="formRef" @submit.prevent="send" :method="method">
		<slot></slot>
	</form>
</template>

<script setup>
	import useStore from '~/store';
	import { ref } from 'vue';
	import { useRoute, useApiSubmit } from '#imports';

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

	function send () {
		let action = props.action;

		if (action.length === 0) {
			action = useRoute().fullPath;
		}

		useApiSubmit(action, new FormData(formRef.value), (result) => {
			store.PAGE_LOAD(result);
		});
	}
</script>