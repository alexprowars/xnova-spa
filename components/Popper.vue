<template>
	<Popper v-bind="attrs" hover>
		<slot/><template #content="props">
			<slot name="content" v-bind="props"/>
		</template>
	</Popper>
</template>

<script setup>
	import Popper from 'vue3-popper';
	import { useAttrs } from 'vue';

	const attrs = useAttrs();
</script>