<template>
	<div class="page-stat-players-row grid grid-cols-12">
		<div class="th sm:col-span-1 col-span-2">
			{{ item['place'] }}
			<div class="sm:hidden">
				<div v-if="item['diff'] === 0" :style="{color: '#87CEEB'}">*</div>
				<span v-else-if="item['diff'] < 0" class="negative">{{ item['diff'] }}</span>
				<span v-else-if="item['diff'] > 0" class="positive">+{{ item['diff'] }}</span>
			</div>
		</div>
		<div class="th sm:col-span-1 hidden sm:block">
			<div v-if="item['diff'] === 0" :style="{color: '#87CEEB'}">*</div>
			<span v-else-if="item['diff'] < 0" class="negative">{{ item['diff'] }}</span>
			<span v-else-if="item['diff'] > 0" class="positive">+{{ item['diff'] }}</span>
		</div>
		<div class="th sm:col-span-4 col-span-5">
			<a :href="'/players/' + item['id']" @click.prevent="openPlayerPopup">
				<span :class="{ neutral: marked }">{{ item['name'] }}</span>
			</a>
			<div v-if="item['alliance']" class="sm:hidden">
				<NuxtLink :class="{neutral: item['alliance']['marked']}" :to="'/alliance/info/' + item['alliance']['id']">
					{{ item['alliance']['name'] }}
				</NuxtLink>
			</div>
			<div v-else class="sm:hidden">
				&nbsp;
			</div>
		</div>
		<div class="th sm:col-span-1 col-span-2 middle">
			<img v-if="item['race']" :src="'/images/skin/race' + item['race'] + '.gif'" width="16" height="16" style="margin-right:7px;">

			<SendMessagePopup v-if="user" :title="$t('send_message')" :id="item['id']"/>
		</div>
		<div class="th sm:col-span-3 hidden sm:block row-alliance">
			<NuxtLink v-if="item['alliance']" :class="{ neutral: item['alliance']['marked'] }" :to="'/alliance/info/' + item['alliance']['id']">
				{{ item['alliance']['name'] }}
			</NuxtLink>
			<div v-else>
				&nbsp;
			</div>
		</div>
		<div class="th sm:col-span-2 col-span-3 middle">
			<NuxtLink :to="'/players/stat/'+item['id']+'/'">
				{{ $formatNumber(item['points']) }}
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import PlayerInfo from '~/components/Page/Players/Info.vue';
	import SendMessagePopup from '~/components/Page/Messages/SendMessagePopup.vue';
	import { openAjaxPopupModal, useRoute } from '#imports';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store';
	import { computed } from 'vue';

	const props = defineProps({
		item: Object,
	});

	const route = useRoute();
	const { user } = storeToRefs(useStore());

	const marked = computed(() => {
		let queryId = parseInt(route.query['id'] || 0);

		return (!queryId && user.value?.['id'] === props.item['id']) || queryId === props.item['id'];
	});

	function openPlayerPopup () {
		openAjaxPopupModal(PlayerInfo, '/players/' + props.item['id']);
	}
</script>