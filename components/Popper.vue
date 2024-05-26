<template>
	<Tooltip v-bind="attrs" :triggers="['hover', 'focus']">
		<slot/>
		<template #popper="props">
			<slot name="content" v-bind="props"/>
		</template>
	</Tooltip>
</template>

<script setup>
	import { Tooltip } from 'floating-vue';
	import { useAttrs } from 'vue';

	const attrs = useAttrs();
</script>