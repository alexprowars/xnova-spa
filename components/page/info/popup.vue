<template>
	<a :href="'/info/'+this.id+'/'" @click.prevent="openPopup">
		<slot></slot>
	</a>
</template>

<script>
	import InfoContent from '~/components/page/info/content.vue'

	export default {
		name: "info-popup",
		props: {
			id: {
				type: Number,
				default: 0,
			}
		},
		methods: {
			openPopup ()
			{
				if (this.id <= 0)
					return

				this.$modal.showAjax(InfoContent, '/info/'+this.id+'/')
			},
		}
	}
</script>