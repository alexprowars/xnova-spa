<template>
	<div>
		<NuxtLayout>
			<NuxtLoadingIndicator color="#9a1915"/>
			<NuxtPage/>
		</NuxtLayout>
		<Loader/>
		<ClientOnly>
			<ModalsContainer />
		</ClientOnly>
	</div>
</template>

<script setup>
	import Loader from '~/components/Layout/Loader.vue'
	import { ModalsContainer } from 'vue-final-modal';
</script>