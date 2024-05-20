<template>
	<div class="page-overview-delete">
		<div class="block">
			<div class="title">Система безопасности</div>
			<div class="content border-0">
				<ViewsRouterForm action="/overview/delete/">
					<input type="hidden" name="id" :value="page['id']">
					<input type="hidden" name="password" :value="page['number_check']">
					<div class="block-table">
						<div class="row">
							<div class="col th">
								Подтвердите удаление планеты {{ page['galaxy'] }}:{{ page['system'] }}:{{ page['planet'] }} вводом правильного ответа
							</div>
						</div>
						<div class="row">
							<div class="col th">{{ page['number_1'] }} + {{ page['number_2'] }} * {{ page['number_3'] }} = ???</div>
							<div class="col th"><input type="text" name="pw"></div>
							<div class="col th"><input type="submit" name="action" value="Удалить колонию"></div>
						</div>
					</div>
				</ViewsRouterForm>
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