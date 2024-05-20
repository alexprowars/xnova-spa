<template>
	<div class="page-fleet-shortcut">
		<div class="block">
			<div class="title">
				Быстрые ссылки
			</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div v-for="(item, i) in page['items']" class="col-6 th">
							<NuxtLinkLocale :to="'/fleet/shortcut/'+i+'/'">{{ item['name'] }} [{{ item['galaxy'] }}:{{ item['system'] }}:{{ item['planet'] }}] {{ item['type'] }}</NuxtLinkLocale>
						</div>
						<div v-if="page['items'].length === 0" class="col th">Список ссылок пуст</div>
					</div>
					<div class="row">
						<div class="col c">
							<NuxtLinkLocale to="/fleet/shortcut/add/" class="button">Добавить</NuxtLinkLocale>
							<NuxtLinkLocale to="/fleet/" class="button">Назад</NuxtLinkLocale>
						</div>
					</div>
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