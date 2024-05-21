<template>
	<RouterForm action="/alliance/admin/tag">
		<div class="block">
			<div class="title">Введите новую аббревиатуру альянса</div>
			<div class="content table border-0 middle">
				<div class="row">
					<div class="col th">
						<input type="text" name="tag" :value="page['tag']">
						<input type="submit" value="Изменить">
					</div>
				</div>
				<div class="row c">
					<NuxtLinkLocale to="/alliance/admin">вернутся к обзору</NuxtLinkLocale>
				</div>
			</div>
		</div>
	</RouterForm>
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