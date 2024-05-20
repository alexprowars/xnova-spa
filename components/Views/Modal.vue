<template>
	<div class="dialog-box">
		<div class="dialog-container" @click.self="$close(false)">
			<div class="dialog-content">
				<button class="dialog-close" @click="$close(false)">×</button>
				<component
					:is="component"
					v-bind="props"
					v-on="events"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "modal",
		props: {
			component: {
				type: Object,
			},
			props: {
				type: Object,
				default: () => {
					return {}
				}
			},
			events: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		beforeMount ()
		{
			document.body.classList.add('loading')
			document.addEventListener('keyup', this.escape)

			this.$bus.$on('closeModals', () => this.$close(false))
		},
		beforeDestroy ()
		{
			document.body.classList.remove('loading')
			document.removeEventListener('keyup', this.escape)

			this.$bus.$off('closeModals', () => this.$close(false))
		},
		methods: {
			escape (event)
			{
				if (event.code.toLowerCase() === 'escape')
					this.$close(false)
			},
		}
	}
</script>