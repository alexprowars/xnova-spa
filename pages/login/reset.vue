<script setup>
	import { navigateTo, showError, useApiGet, useAsyncData, useRoute } from '#imports';

	const router = useRoute();

	const { error } = await useAsyncData(
		async () => await useApiGet('login/reset', Object.assign({}, router.query))
	);

	if (error.value) {
		throw showError(error.value);
	}

	navigateTo('/');
</script>