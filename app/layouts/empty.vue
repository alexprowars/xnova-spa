<template>
	<div class="log-layout">
		<ErrorMessage v-if="error" :data="error"/>
		<slot/>
	</div>
</template>

<script>
	import ErrorMessage from '~/components/ErrorMessage.vue'
	import useStore from '~/store';

	export default {
		components: {
			ErrorMessage,
		},
		computed: {
			error () {
				return useStore().error || false;
			},
		}
	}
</script>