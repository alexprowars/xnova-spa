<template>
	<div class="block">
		<div class="title">История изменений</div>
		<div class="content border-0">
			<div class="table">
				<div class="row">
					<div class="col-2 c">Версия</div>
					<div class="col-10 c">Описание</div>
				</div>
				<div v-for="item in page['items']" class="row">
					<div class="col-2 th" v-html="item['title']"></div>
					<div class="col-10 text-left b" v-html="item['text']"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { defineNuxtComponent } from '#imports';
	import useStore from '~/store';

	export default defineNuxtComponent({
		async asyncData () {
			await useStore().loadPage();

			return {}
		},
		watchQuery: true,
		middleware: 'auth',
	})
</script>