<template>
	<div class="row flight">
		<div class="th col-4 col-sm-2">
			<div class="z">
				<Timer :value="item['time']"></Timer>
			</div>
			<span class="positive d-sm-none">{{ $date(item['time'], 'd.m H:i:s') }}</span>
		</div>
		<div class="th col-sm-10 col-8 text-start">
			<span class="flight owndeploy">
				<NuxtLinkLocale v-if="item['planet_id'] === planet.id" :to="'/buildings/?chpl='+item['planet_id']" style="color:#33ff33;">{{ item['planet_name'] }}</NuxtLinkLocale><span v-else>{{ item['planet_name'] }}</span>:
			</span>
			<span class="holding colony">{{ $t('tech.' + item['object_id']) }} ({{ item['level'] }}<template v-if="item['level_to']"> -> {{ item['level_to'] }}</template>)</span>
			<span class="positive float-sm-end d-none d-sm-inline">{{ $date(item['time'], 'd.m H:i:s') }}</span>
		</div>
	</div>
</template>

<script setup>
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';

	defineProps({
		item: Object
	});

	const store = useStore();
	const { planet } = storeToRefs(store);
</script>