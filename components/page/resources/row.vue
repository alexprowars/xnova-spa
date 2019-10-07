<template>
	<tr>
		<th class="text-left" nowrap>
			<InfoPopup :id="item['id']" :title="$t('TECH.'+item['id'])">
				{{ $t('TECH.'+item['id']) }}
			</InfoPopup>
		</th>
		<th>
			<colored :value="item['level']"></colored>
		</th>
		<th>
			{{ item['bonus'] }}%
		</th>
		<th v-for="res in resources">
			<colored :value="item['resources'][res]"></colored>
		</th>
		<th>
			<colored :value="item['resources']['energy']"></colored>
		</th>
		<th>
			<select :name="item['name']" v-model="item['factor']">
				<option v-for="j in 10" :value="j">{{ j * 10 }}%</option>
			</select>
		</th>
	</tr>
</template>

<script>
	import InfoPopup from '~/components/page/info/popup.vue'

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