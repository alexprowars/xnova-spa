<template>
	<div>
		<router-form action="/alliance/search/">
			<table class="table">
				<tr>
					<td class="c" colspan="2">Поиск альянса</td>
				</tr>
				<tr>
					<th>Строка поиска</th>
					<th>
						<input type="text" name="searchtext" value="" title="">
						<input type="submit" value="Поиск">
					</th>
				</tr>
			</table>
		</router-form>

		<div v-if="page['result'].length">
			<div class="separator"></div>
			<table class="table">
				<tr>
					<td class="c" colspan="3">Найденые альянсы:</td>
				</tr>
				<tr v-for="r in page['result']">
					<th class="text-center">
						{{ r['tag'] }}
					</th>
					<th class="text-center">
						{{ r['name'] }}
					</th>
					<th class="text-center">
						{{ r['members'] }}
					</th>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		name: "alliance-search",
		async asyncData ({ store }) {
			return await store.dispatch('loadPage')
		},
		watchQuery: true,
		middleware: 'auth',
	}
</script>