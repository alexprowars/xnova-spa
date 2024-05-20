<template>
	<vue-final-modal
		v-bind="$attrs"
		content-class="dialog-content"
		content-transition="vfm-modal"
	>
		<button class="dialog-close" @click="emit('update:modelValue', false)">×</button>
		<slot></slot>
	</vue-final-modal>
</template>

<script setup>
	import { VueFinalModal } from 'vue-final-modal';

	const emit = defineEmits(['update:modelValue'])
</script>

<script>
	export default {
		inheritAttrs: false,
	}
</script>