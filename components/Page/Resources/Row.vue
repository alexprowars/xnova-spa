<template>
	<tr>
		<th class="text-start" nowrap>
			<InfoPopup :id="item['id']" :title="$t('TECH.'+item['id'])">
				{{ $t('TECH.'+item['id']) }}
			</InfoPopup>
		</th>
		<th>
			<Colored :value="item['level']"></Colored>
		</th>
		<th>
			{{ item['bonus'] }}%
		</th>
		<th v-for="res in resources">
			<Colored :value="item['resources'][res]"></Colored>
		</th>
		<th>
			<Colored :value="item['resources']['energy']"></Colored>
		</th>
		<th>
			<select :name="item['name']" v-model="item['factor']">
				<option v-for="j in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :value="j">{{ j * 10 }}%</option>
			</select>
		</th>
	</tr>
</template>

<script>
	import InfoPopup from '~/components/Page/Info/Popup.vue'

	export default {
		name: 'resource-row',
		components: {
			InfoPopup,
		},
		props: {
			item: {
				type: Object
			},
			resources: {
				type: Array
			}
		}
	}
</script>