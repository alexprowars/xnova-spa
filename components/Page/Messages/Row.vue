<template>
	<div>
		<div class="row">
			<div class="col-1 th text-center">
				<input name="delete[]" type="checkbox" :value="item['id']" v-model="item['deleted']" title="Удалить">
			</div>
			<div class="col-3 th text-center">{{ dayjs(item['time']).tz().format('DD MMM YYYY HH:mm:ss') }}</div>
			<div class="col-6 th text-center">
				<a v-if="item['from'] > 0" :href="'/players/' + item['from']" @click.prevent="openPlayerPopup(item['from'])" title="От кого" v-html="item['theme']"></a>
				<span v-else v-html="item['theme']"></span>
			</div>
			<div class="col-2 th text-center">
				<span v-if="item['type'] === 1">
					<NuxtLinkLocale :to="'/messages/write/' + item['from']" title="Ответить">
						<span class="sprite skin_m"></span>
					</NuxtLinkLocale>
					<NuxtLinkLocale :to="'/messages/write/' + item['from'] + '/quote/' + item['id']" title="Цитировать сообщение">
						<span class="sprite skin_z"></span>
					</NuxtLinkLocale>
					<a @click.prevent="abuseAction" title="Отправить жалобу">
						<span class="sprite skin_s"></span>
					</a>
				</span>
			</div>
		</div>
		<div class="row">
			<div :style="'background-color:'+$t('message_types_backgrounds.'+item['type'])" class="col-12 b">
				<div v-if="user['options']?.['bb_parser']">
					<TextViewer :text="item['text']"/>
				</div>
				<div v-else v-html="item['text']"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import PlayerInfo from '~/components/Page/Players/Info.vue';
	import useStore from '~/store';
	import { openAjaxPopupModal, openConfirmModal, useApiPost } from '#imports';
	import { storeToRefs } from 'pinia';
	import dayjs from 'dayjs';

	const props = defineProps({
		item: Object
	});

	const { user } = storeToRefs(useStore());

	function abuseAction () {
		openConfirmModal(
			null,
			'Вы уверены что хотите отправить жалобу на это сообщение?',
			[{
				title: 'Нет',
			}, {
				title: 'Да',
				handler: () => {
					useApiPost('/messages/abuse/'+props.item['id']+'/')
					.then((result) => {
						useStore().PAGE_LOAD(result)
					})
				}
			}]
		);
	}

	function openPlayerPopup (id) {
		openAjaxPopupModal(PlayerInfo, '/players/'+ id +'/')
	}
</script>