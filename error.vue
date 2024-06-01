<template>
	<DefaultLayout v-if="error.data && error.data.error">
		<ErrorMessage :data="error.data.error"/>
	</DefaultLayout>
	<div v-else class="application">
		<div class="error">
			<div class="row">
				<div v-if="error.statusCode === 404" class="e404">Вы попали на несуществующую страницу!</div>
				<div v-else>{{ error['message'] }}</div>
			</div>
			<div class="row">
				<LayoutGame/>
			</div>
		</div>
	</div>
</template>

<script setup>
	import DefaultLayout from '~/layouts/default.vue'

	defineProps({
		error: Object,
	});
</script>