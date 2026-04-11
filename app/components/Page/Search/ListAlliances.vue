<template>
	<table class="table">
		<tbody>
		<tr>
			<td class="c">{{ $t('pages.search.column_abbreviation') }}</td>
			<td class="c">{{ $t('pages.search.column_name') }}</td>
			<td class="c">{{ $t('pages.search.column_members') }}</td>
			<td class="c">{{ $t('pages.search.column_points') }}</td>
		</tr>
		<tr v-for="item in items">
			<td class="th">
				<NuxtLink :to="'/alliance/info/' + item['id']">
					{{ item['tag'] }}
				</NuxtLink>
			</td>
			<td class="th">{{ item['name'] }}</td>
			<td class="th">{{ item['members'] }}</td>
			<td class="th">{{ item['total_points'] }}</td>
		</tr>
		<tr v-if="items.length === 0">
			<td class="th" colspan="6">{{ $t('pages.search.no_results') }}</td>
		</tr>
		</tbody>
	</table>
</template>

<script setup>
	defineProps({
		items: {
			type: Array,
			default: () => [],
		}
	})
</script>