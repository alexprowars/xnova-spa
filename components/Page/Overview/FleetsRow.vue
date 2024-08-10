<template>
	<div class="row overview-fleets-row">
		<div class="col-3 col-sm-2 th">
			<div class="z">
				<Timer :value="item['time']"/>
			</div>
			<div class="positive">{{ $date(item['date'], 'DD MMM') }}</div>
		</div>
		<div class="col-9 col-sm-10 th text-start" :class="[item['status'], item['prefix'], item['mission']]" v-html="item['text']"></div>
	</div>
</template>

<script setup>
	defineProps({
		item: Object
	});
</script>