<template>
	<tr>
		<th class="text-start" nowrap>
			<InfoPopup :id="item['id']" :title="$t('tech.' + item['id'])">
				{{ $t('tech.' + item['id']) }}
			</InfoPopup>
		</th>
		<th>
			<Colored :value="item['level']"/>
		</th>
		<th>
			{{ item['bonus'] }}%
		</th>
		<th v-for="res in resources">
			<Colored :value="item['resources'][res]"/>
		</th>
		<th>
			<Colored :value="item['resources']['energy']"/>
		</th>
		<th>
			<select v-if="!isVacation" v-model="item['factor']">
				<option v-for="j in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :value="j">{{ j * 10 }}%</option>
			</select>
			<span v-else>{{ item['factor'] * 10 }}%</span>
		</th>
	</tr>
</template>

<script setup>
	import InfoPopup from '~/components/Page/Info/Popup.vue';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store/index.js';

	defineProps({
		item: {
			type: Object
		},
		resources: {
			type: Array
		}
	});

	const { isVacation } = storeToRefs(useStore());
</script>