<template>
	<div v-if="loading" class="preloader">
		<div class="preloader-spinner"></div>
	</div>
</template>

<script setup>
	import { useLoading } from '#imports';
	import { watch } from 'vue';

	const loading = useLoading();

	watch(loading, (value) => {
		if (value) {
			if (!document.querySelector('.dialog-box')) {
				document.body.classList.add('loading');
			}
		} else {
			if (!document.querySelector('.dialog-box')) {
				document.body.classList.remove('loading');
			}
		}
	})
</script>

<style>
	.preloader {
		background: rgba(0, 0, 0, 0.2);
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 5000;
	}

	.preloader-spinner {
		position: fixed;
		z-index: 9999;
		top: 50%;
		left: 50%;
		width: 100px;
		height: 100px;
		margin-left: -50px;
		margin-top: -50px;
		background: url('/images/loader-cat.svg') no-repeat transparent;
	}

	body.loading {
		overflow: hidden;
		overscroll-behavior-y: none;
		margin-right: calc(var(--scrollbar-compensate, 0px));
	}
</style>