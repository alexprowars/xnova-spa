<template>
	<DefaultLayout v-if="error.item && error.item.error">
		<ErrorMessage :data="error.item.error"/>
	</DefaultLayout>
	<div v-else class="application">
		<div class="error">
			<div>
				<div v-if="error.statusCode === 404" class="e404">Вы попали на несуществующую страницу!</div>
				<div v-else>{{ error['message'] }}</div>
			</div>
			<div>
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