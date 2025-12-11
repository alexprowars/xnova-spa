<template>
	<div class="grid grid-cols-12 text-center">
		<div class="col-span-1 th middle">
			<input name="delete[]" type="checkbox" :value="item['id']" v-model="item['deleted']" :title="$t('pages.messages.row.delete_title')">
		</div>
		<div class="col-span-3 th middle">{{ $formatDate(item['date'], 'DD MMM YYYY HH:mm:ss') }}</div>
		<div class="col-span-6 th middle">
			<a v-if="item['from'] > 0" :href="'/players/' + item['from']" @click.prevent="openPlayerPopup(item['from'])" :title="$t('pages.messages.row.from_title')" v-html="item['subject']"></a>
			<span v-else v-html="item['subject']"></span>
		</div>
		<div class="col-span-2 th middle">
			<span v-if="item['type'] === 1">
				<NuxtLink :to="'/messages/write/' + item['from']" :title="$t('pages.messages.row.reply_title')">
					<span class="sprite skin_m"></span>
				</NuxtLink>
				<NuxtLink :to="'/messages/write/' + item['from'] + '?quote=' + item['id']" :title="$t('pages.messages.row.quote_title')">
					<span class="sprite skin_z"></span>
				</NuxtLink>
				<a @click.prevent="abuseAction" :title="$t('pages.messages.row.abuse_title')">
					<span class="sprite skin_s"></span>
				</a>
			</span>
		</div>
	</div>
	<div class="grid">
		<div :style="'background-color:' + $t('message_types_backgrounds.' + item['type'])" class="b">
			<div v-if="user['options']?.['bb_parser']">
				<TextViewer :text="item['message']"/>
			</div>
			<div v-else v-html="item['message']"></div>
		</div>
	</div>
</template>

<script setup>
	import PlayerInfo from '~/components/Page/Players/Info.vue';
	import useStore from '~/store';
	import { openAjaxPopupModal, openConfirmModal, useApiPost, useSuccessNotification, useI18n } from '#imports';
	import { storeToRefs } from 'pinia';

	const { t } = useI18n();

	const props = defineProps({
		item: Object
	});

	const { user } = storeToRefs(useStore());

	function abuseAction () {
		openConfirmModal(
			null,
			t('pages.messages.row.abuse_confirm.title'),
			[{
				title: t('pages.messages.row.abuse_confirm.no'),
			}, {
				title: t('pages.messages.row.abuse_confirm.yes'),
				handler: async () => {
					try {
						await useApiPost('/messages/' + props.item['id'] + '/abuse');

						useSuccessNotification(t('pages.messages.row.abuse_confirm.success'));
					} catch {
					}
				}
			}]
		);
	}

	function openPlayerPopup (id) {
		openAjaxPopupModal(PlayerInfo, '/players/' + id)
	}
</script>