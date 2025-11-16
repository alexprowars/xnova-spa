<script setup>
	import { showError, useApiGet, useAsyncData, useRoute } from '#imports';

	const router = useRoute();

	const { error } = await useAsyncData(async () => {
		return await useApiGet('/login/callback/' + router.params.service, Object.assign({}, router.query));
	});

	if (error.value) {
		throw showError(error.value);
	}
</script>