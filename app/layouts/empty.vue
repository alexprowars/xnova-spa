<template>
	<div class="application">
		<main>
			<div class="main-content">
				<div class="main-content-row">
					<ErrorMessage v-if="error" :data="error"/>
					<slot/>
				</div>
			</div>
		</main>
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