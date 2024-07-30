<template>
	<table class="table">
		<tr>
			<td class="c" colspan="10">Список членов альянса (количество: {{ page['members'].length }})</td>
		</tr>
		<tr>
			<th>№</th>
			<th><NuxtLinkLocale :to="url + '?sort=name&order=' + page['order']">Ник</NuxtLinkLocale></th>
			<th>&nbsp;</th>
			<th>&nbsp;</th>
			<th><NuxtLinkLocale :to="url + '?sort=rank&order=' + page['order']">Ранг</NuxtLinkLocale></th>
			<th><NuxtLinkLocale :to="url + '?sort=points&order=' + page['order']">Очки</NuxtLinkLocale></th>
			<th>Координаты</th>
			<th><NuxtLinkLocale :to="url + '?sort=date&order=' + page['order']">Дата вступления</NuxtLinkLocale></th>
			<th v-if="page['status']"><NuxtLinkLocale :to="url + '?sort=active&order=' + page['order']">Активность</NuxtLinkLocale></th>
			<th v-if="page['admin']">Управление</th>
		</tr>
		<template v-for="(m, index) in page['members']">
			<tr>
				<th>{{ index + 1 }}</th>
				<th>{{ m['username'] }}</th>
				<th>
					<SendMessagePopup :title="m['username']+': отправить сообщение'" :id="m['id']"/>
				</th>
				<th>
					<img :src="'/images/skin/race' + m['race'] + '.gif'" width="16" height="16" alt="">
				</th>
				<th>{{ m['range'] }}</th>
				<th>{{ m['points'] }}</th>
				<th>
					<NuxtLinkLocale :to="'/galaxy/?galaxy=' + m['galaxy'] + '&system=' + m['system']">{{ m['galaxy'] }}:{{ m['system'] }}:{{ m['planet'] }}</NuxtLinkLocale>
				</th>
				<th>{{ m['date'] }}</th>
				<th v-if="page['status']" v-html="m['onlinetime']"></th>
				<th v-if="page['admin']">
					<a href="" @click.prevent="kick(m['id'])">
						<img src="/images/abort.gif" alt="">
					</a>
					&nbsp;
					<a href="" @click.prevent="setRank(m['id'])">
						<img src="/images/key.gif" alt="">
					</a>
				</th>
			</tr>
			<tr v-if="m['id'] === changeRank && page['admin']">
				<th colspan="10" class="padding-0">
					<table class="table noborder">
						<tr>
							<th colspan="7">Установить ранг для {{ m['username'] }}</th>
							<th>
								<select v-model="m['rank']">
									<option value="0">Новичок</option>
									<option v-for="rank in page['ranks']" :value="rank['id']">{{ rank['name'] }}</option>
								</select>
							</th>
							<th colspan="2"><button @click.prevent="saveRank(m['id'], m['rank'])">Сохранить</button></th>
						</tr>
					</table>
				</th>
			</tr>
		</template>
		<tr>
			<td class="c" colspan="10">
				<NuxtLinkLocale :to="'/alliance' + (page['admin'] ? '/admin' : '')">вернутся к обзору</NuxtLinkLocale>
			</td>
		</tr>
	</table>
</template>

<script setup>
	import SendMessagePopup from '~/components/Page/Messages/SendMessagePopup.vue';
	import { definePageMeta, openConfirmModal, refreshNuxtData, showError, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification } from '#imports';
	import useStore from '~/store';
	import { computed, ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Список участников',
	});

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(
		async () => await useStore().loadPage(undefined, Object.assign({}, route.params, route.query)),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const changeRank = ref();

	const url = computed(() => {
		return '/alliance/' + (page.value['admin'] ? 'admin/members' : 'members');
	});

	function setRank(id) {
		if (changeRank.value === id) {
			changeRank.value = 0;
		} else {
			changeRank.value = id;
		}
	}

	function saveRank(id, rank) {
		useApiSubmit('alliance/admin/members/rank', { id, rank }, () => {
			changeRank.value = 0;

			refresh();
		});
	}

	function kick(id) {
		openConfirmModal(
			null,
			'Вы действительно хотите исключить данного игрока из альянса?',
			[{
				title: 'Нет',
			}, {
				title: 'Да',
				handler: () => {
					useApiSubmit('alliance/admin/members/kick', { id }, () => {
						useSuccessNotification('Вы исключили игрока из альянса');

						refresh();
					});
				}
			}]
		);
	}
</script>