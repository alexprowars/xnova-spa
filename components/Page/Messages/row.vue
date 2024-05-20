<template>
	<div>
		<div class="row">
			<div class="col-1 th text-center">
				<input name="delete[]" type="checkbox" :value="item['id']" v-model="item['deleted']" title="Удалить">
			</div>
			<div class="col-3 th text-center">{{ $date(item['time'], 'd.m.y H:i:s') }}</div>
			<div class="col-6 th text-center">
				<a v-if="item['from'] > 0" :href="'/players/'+item['from']+'/'" @click.prevent="openPlayerPopup(item['from'])" title="От кого" v-html="item['theme']"></a>
				<span v-else v-html="item['theme']"></span>
			</div>
			<div class="col-2 th text-center">
				<span v-if="item['type'] === 1">
					<NuxtLinkLocale :to="'/messages/write/'+item['from']+'/'" title="Ответить">
						<span class="sprite skin_m"></span>
					</NuxtLinkLocale>
					<NuxtLinkLocale :to="'/messages/write/'+item['from']+'/quote/'+item['id']+'/'" title="Цитировать сообщение">
						<span class="sprite skin_z"></span>
					</NuxtLinkLocale>
					<a @click.prevent="abuseAction" title="Отправить жалобу">
						<span class="sprite skin_s"></span>
					</a>
				</span>
			</div>
		</div>
		<div class="row">
			<div :style="'background-color:'+$t('MESSAGE_TYPES_BACKGROUNDS.'+item['type'])" class="col-12 b">
				<div v-if="$parent.$parent.page['parser']">
					<text-viewer :text="item['text']"></text-viewer>
				</div>
				<div v-else v-html="item['text']"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import PlayerInfo from '~/components/Page/Players/info.vue'
	import { useApiPost } from '~/composables/useApi';
	import useStore from '~/store';

	export default {
		name: "messages-row",
		props: {
			item: Object
		},
		methods: {
			abuseAction ()
			{
				this.$dialog
					.confirm('Вы уверены что хотите отправить жалобу на это сообщение?', {
						okText: 'Да',
						cancelText: 'Нет',
					})
					.then(() =>
					{
						useApiPost('/messages/abuse/'+this.item['id']+'/', {

						})
						.then((result) => {
							useStore().PAGE_LOAD(result)
						})
					})
			},
			openPlayerPopup (id) {
				this.$modal.showAjax(PlayerInfo, '/players/'+id+'/')
			}
		}
	}
</script>