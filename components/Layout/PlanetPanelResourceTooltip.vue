<template>
	<div class="resource-panel-item-tooltip">
		<h1>{{ $t('resources.' + type) }}</h1>
		<div class="line"></div>
		<table>
			<tbody>
				<tr>
					<td width="30%">Мощность:</td>
					<td align="right">{{ resource['factor'] * 100 }}%</td>
				</tr>
				<tr>
					<td>Производство:</td>
					<td align="right">{{ $formatNumber(resource['production']) }}</td>
				</tr>
				<tr>
					<td>Вместимость:</td>
					<td align="right">{{ $formatNumber(resource['capacity']) }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
	defineProps({
		resource: {
			type: Object
		},
		type: {
			type: String,
			default: ''
		}
	})
</script>