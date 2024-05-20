<template>
	<div class="log-layout">
		<ErrorMessage v-if="error" :data="error"/>
		<slot/>
	</div>
</template>

<script>
	import ErrorMessage from '~/components/Views/Message.vue'

	export default {
		components: {
			ErrorMessage,
		},
		computed: {
			error () {
				return this.$store.state.error || false;
			},
		}
	}
</script>