<script setup>
	import { showError, useAsyncData, useRoute } from '#imports';
	import useStore from '~/store';

	const router = useRoute();

	const { error } = await useAsyncData(
		async () => await useStore().loadPage(undefined, Object.assign({}, router.query))
	);

	if (error.value) {
		throw showError(error.value);
	}
</script>