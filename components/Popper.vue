<template>
	<Menu v-bind="attrs" placement="top" :triggers="['hover', 'focus', 'touch']">
		<slot/>
		<template #popper="props">
			<slot name="content" v-bind="props"/>
		</template>
	</Menu>
</template>

<script setup>
	import { Menu } from 'floating-vue';
	import { useAttrs } from 'vue';

	const attrs = useAttrs();
</script>