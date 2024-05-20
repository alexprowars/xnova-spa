<template>
	<ViewsRouterForm action="/alliance/admin/name">
		<div class="block">
			<div class="title">Введите новое название альянса</div>
			<div class="content table border-0 middle">
				<div class="row">
					<div class="col th">
						<input type="text" name="name" :value="page['name']">
						<input type="submit" value="Изменить">
					</div>
				</div>
				<div class="row c">
					<NuxtLinkLocale to="/alliance/admin">вернутся к обзору</NuxtLinkLocale>
				</div>
			</div>
		</div>
	</ViewsRouterForm>
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