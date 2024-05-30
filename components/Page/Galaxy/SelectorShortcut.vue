<template>
	<table style="max-width:200px;width:100%;margin: 0 auto">
		<tbody>
			<tr>
				<td class="c">
					<select v-model="value" style="width:100%">
						<option :value="null">--- выберите планету ---</option>
						<option v-for="item in items" :value="item">
							{{ item.name }} [{{ item.galaxy }}:{{ item.system }}:{{ item.planet }}]
						</option>
					</select>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
	defineProps({
		items: {
			type: Array,
			default: []
		},
		galaxy: {
			type: Number,
			default: 1
		},
		system: {
			type: Number,
			default: 1
		},
	});

	const value = defineModel();
</script>