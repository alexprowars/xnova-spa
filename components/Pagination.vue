<template>
	<nav>
		<ul class="pagination">
			<li v-for="item in items" class="page-item" :class="{active: options['page'] === item}">
				<a v-if="item > 0" href @click.prevent="load(item)" class="page-link">{{ item }}</a>
				<a v-else href @click.prevent="load(item)" class="page-link">...</a>
			</li>
		</ul>
	</nav>
</template>

<script setup>
	import { navigateTo, useRoute } from '#imports';
	import { computed } from 'vue';

	const props = defineProps({
		options: {
			type: Object
		}
	});

	const pages = computed(() => {
		return Math.ceil(props.options['total'] / props.options['limit']);
	});

	const items = computed(() => {
		let end = false;
		let arr = [];

		for (let i = 1; i <= pages.value; i++) {
			if ((props.options['page'] <= i + 3 && props.options['page'] >= i - 3) || i === 1 || i === pages.value || pages.value <= 6) {
				end = false;

				arr.push(i);
			} else {
				if (end === false)
					arr.push(0);

				end = true;
			}
		}

		return arr;
	});

	function load (page) {
		const route = useRoute();
		route.query['p'] = page;

		navigateTo({ path: route.path, query: route.query, force: true });
	}
</script>