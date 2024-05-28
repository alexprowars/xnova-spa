<template>
	<a :href="to" @click.prevent="load" :title="title">
		<slot></slot>
	</a>
</template>

<script setup>
	import { useApiGet } from '~/composables/useApi';
	import { openPopupModal } from '~/composables/useModals';
	import useStore from '~/store';
	import { isMobile } from '~/utils/helpers.js';

	const props = defineProps({
		to: String,
		width: {
			type: Number,
			default: 600
		},
		title: {
			type: String,
			default: ''
		},
	})

	async function load () {
		if (isMobile()) {
			return window.location.href = props.to.split('ajax').join('').split('popup').join('');
		}

		const result = await useApiGet(props.to, {
			popup: 'Y'
		});

		let component = useRouter().resolve(props.to)
			.matched.flatMap(record => Object.values(record.components));

		if (component.length) {
			let comp;

			if (typeof component[0] === 'object') {
				comp = component[0];
			} else {
				comp = await component[0]();
			}

			await openPopupModal(comp, {
				popup: result['page'],
			})
		}
	}
</script>