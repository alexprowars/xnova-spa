<template>
	<div class="grid grid-cols-12 text-center">
		<div class="col-span-1 th middle">
			<input name="delete[]" type="checkbox" :value="item['id']" v-model="item['deleted']" title="Удалить">
		</div>
		<div class="col-span-3 th middle">{{ $formatDate(item['date'], 'DD MMM YYYY HH:mm:ss') }}</div>
		<div class="col-span-6 th middle">
			<a v-if="item['from'] > 0" :href="'/players/' + item['from']" @click.prevent="openPlayerPopup(item['from'])" title="От кого" v-html="item['subject']"></a>
			<span v-else v-html="item['subject']"></span>
		</div>
		<div class="col-span-2 th middle">
			<span v-if="item['type'] === 1">
				<NuxtLink :to="'/messages/write/' + item['from']" title="Ответить">
					<span class="sprite skin_m"></span>
				</NuxtLink>
				<NuxtLink :to="'/messages/write/' + item['from'] + '?quote=' + item['id']" title="Цитировать сообщение">
					<span class="sprite skin_z"></span>
				</NuxtLink>
				<a @click.prevent="abuseAction" title="Отправить жалобу">
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
	import { openAjaxPopupModal, openConfirmModal, useApiPost, useSuccessNotification } from '#imports';
	import { storeToRefs } from 'pinia';

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
				handler: async () => {
					try {
						await useApiPost('/messages/' + props.item['id'] + '/abuse');

						useSuccessNotification('Жалоба отправлена администрации игры');
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