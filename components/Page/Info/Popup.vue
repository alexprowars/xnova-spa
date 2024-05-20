<template>
	<a :href="'/info/'+this.id+'/'" @click.prevent="openPopup">
		<slot></slot>
	</a>
</template>

<script>
	import InfoContent from '~/components/Page/Info/Content.vue'
	import { openAjaxPopupModal } from '~/composables/useModals';

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

				openAjaxPopupModal(InfoContent, '/info/'+this.id+'/')
			},
		}
	}
</script>