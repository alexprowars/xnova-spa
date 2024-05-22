<template>
	<div class="block page-stat-players">
		<div class="content border-0">
			<div class="block-table middle">
				<div class="row">
					<div class="c col-sm-1 col-2 middle">Место</div>
					<div class="c col-sm-1 d-none d-sm-block middle">+/-</div>
					<div class="c col-sm-4 col-5 middle">Игрок</div>
					<div class="c col-sm-1 col-2 middle">&nbsp;</div>
					<div class="c col-sm-3 d-none d-sm-block middle">Альянс</div>
					<div class="c col-sm-2 col-3 middle">Очки</div>
				</div>
				<div v-for="item in items" class="row page-stat-players-row">
					<div class="th col-sm-1 col-2">
						{{ item['position'] }}
						<div class="d-sm-none">
							<div v-if="item['diff'] === 0" :style="{color: '#87CEEB'}">*</div>
							<span v-else-if="item['diff'] < 0" class="negative">{{ item['diff'] }}</span>
							<span v-else-if="item['diff'] > 0" class="positive">+{{ item['diff'] }}</span>
						</div>
					</div>
					<div class="th col-sm-1 d-none d-sm-block">
						<div v-if="item['diff'] === 0" :style="{color: '#87CEEB'}">*</div>
						<span v-else-if="item['diff'] < 0" class="negative">{{ item['diff'] }}</span>
						<span v-else-if="item['diff'] > 0" class="positive">+{{ item['diff'] }}</span>
					</div>
					<div class="th col-sm-4 col-5">
						<a :href="'/players/'+item['id']+'/'" @click.prevent="openPlayerPopup(item['id'])">
							<span :class="{neutral: item['name_marked']}">{{ item['name'] }}</span>
						</a>
						<div v-if="item['alliance']" class="d-sm-none">
							<NuxtLinkLocale :class="{neutral: item['alliance']['marked']}" :to="'/alliance/info/'+item['alliance']['id']+'/'">
								{{ item['alliance']['name'] }}
							</NuxtLinkLocale>
						</div>
						<div v-else class="d-sm-none">
							&nbsp;
						</div>
					</div>
					<div class="th col-sm-1 col-2">
						<img v-if="item['race']" :src="'/images/skin/race'+item['race']+'.gif'" width="16" height="16" style="margin-right:7px;">

						<PopupLink v-if="user" :to="'/messages/write/'+item['id']+'/'" :width="680" :title="item['name']+': отправить сообщение'">
							<span class="sprite skin_m"></span>
						</PopupLink>
					</div>
					<div class="th col-sm-3 d-none d-sm-block row-alliance">
						<NuxtLinkLocale v-if="item['alliance']" :class="{neutral: item['alliance']['marked']}" :to="'/alliance/info/'+item['alliance']['id']+'/'">
							{{ item['alliance']['name'] }}
						</NuxtLinkLocale>
						<div v-else>
							&nbsp;
						</div>
					</div>
					<div class="th col-sm-2 col-3 middle">
						<NuxtLinkLocale :to="'/players/stat/'+item['id']+'/'">
							{{ $number(item['points']) }}
						</NuxtLinkLocale>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import PlayerInfo from '~/components/Page/Players/Info.vue'
	import { openAjaxPopupModal } from '~/composables/useModals';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store';

	defineProps({
		items: Array
	});

	const { user } = storeToRefs(useStore());

	function openPlayerPopup (id) {
		openAjaxPopupModal(PlayerInfo, '/players/' + id + '/');
	}
</script>