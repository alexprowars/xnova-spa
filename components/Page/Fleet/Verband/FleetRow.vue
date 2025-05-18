<template>
	<tr>
		<th>
			<a>{{ $t('fleet_mission.' + item.mission) }}</a>
			<a v-if="(item['start']['date'] + 1) === item['target']['date']">(F)</a>
		</th>
		<th>
			<Popper>
				<template #content>
					<div v-for="data in item['ships']">{{ $t('tech.'+data['id']) }}: {{ data['count'] }}</div>
				</template>
				{{ $number(item['ships_total']) }}
			</Popper>
		</th>
		<th>
			<PlanetLink :galaxy="item['start']['galaxy']" :system="item['start']['system']" :planet="item['start']['planet']"/>
			<div>{{ item['start']['name'] }}</div>
		</th>
		<th>
			{{ $date(item['start']['date'], 'DD MMM HH:mm:ss') }}
			<Timer :value="item['start']['date']" class="positive"/>
		</th>
		<th>
			<PlanetLink :galaxy="item['target']['galaxy']" :system="item['target']['system']" :planet="item['target']['planet']"/>
			<div>{{ item['target']['name'] }}</div>
		</th>
		<th>{{ $date(item['target']['date'], 'DD MMM HH:mm:ss') }}</th>
	</tr>
</template>

<script setup>
	defineProps({
		item: Object,
	})
</script>