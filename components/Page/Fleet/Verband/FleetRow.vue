<template>
	<tr>
		<td class="th">
			<a>{{ $t('fleet_mission.' + item.mission) }}</a>
			<a v-if="(item['start']['date'] + 1) === item['target']['date']">(F)</a>
		</td>
		<td class="th">
			<Popper>
				<template #content>
					<div v-for="data in item['ships']">{{ $t('tech.'+data['id']) }}: {{ data['count'] }}</div>
				</template>
				{{ $formatNumber(item['ships_total']) }}
			</Popper>
		</td>
		<td class="th">
			<PlanetLink :galaxy="item['start']['galaxy']" :system="item['start']['system']" :planet="item['start']['planet']"/>
			<div>{{ item['start']['name'] }}</div>
		</td>
		<td class="th">
			{{ $formatDate(item['start']['date'], 'DD MMM HH:mm:ss') }}
			<Timer :value="item['start']['date']" class="positive"/>
		</td>
		<td class="th">
			<PlanetLink :galaxy="item['target']['galaxy']" :system="item['target']['system']" :planet="item['target']['planet']"/>
			<div>{{ item['target']['name'] }}</div>
		</td>
		<td class="th">{{ $formatDate(item['target']['date'], 'DD MMM HH:mm:ss') }}</td>
	</tr>
</template>

<script setup>
	defineProps({
		item: Object,
	})
</script>