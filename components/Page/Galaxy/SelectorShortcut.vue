<template>
	<table style="max-width:200px;width:100%;margin: 0 auto">
		<tbody>
			<tr>
				<td class="c">
					<select v-model="selected" style="width:100%">
						<option >--- выберите планету ---</option>
						<option v-for="item in items" :value="item['id']">
							{{ item.name }} [{{ item.galaxy }}:{{ item.system }}:{{ item.planet }}]
						</option>
					</select>
				</td>
			</tr>
			<tr>
				<th>
					<input value="Просмотр" type="submit" style="width:100%">
				</th>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
	import { navigateTo } from '#imports';
	import { ref, watch } from 'vue';

	const props = defineProps({
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

	const selected = ref(null);

	const item = props.items.find((item) =>
		item['galaxy'] === props.galaxy && item['system'] === props.system
	);

	if (item) {
		selected.value = item['id'];
	}

	watch(selected, (val) => {
		let item = props.items.find((item) => item['id'] === val);

		if (item) {
			navigateTo('/galaxy/?galaxy='+ item.galaxy + '&system=' + item.system);
		}
	});
</script>