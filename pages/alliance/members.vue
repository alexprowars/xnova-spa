<template>
	<table class="table">
		<tbody>
		<tr>
			<td class="c" colspan="10">Список членов альянса (количество: {{ page['members'].length }})</td>
		</tr>
		<tr>
			<th>№</th>
			<th><NuxtLink :to="url + '?sort=name&order=' + page['order']">Ник</NuxtLink></th>
			<th>&nbsp;</th>
			<th>&nbsp;</th>
			<th><NuxtLink :to="url + '?sort=rank&order=' + page['order']">Ранг</NuxtLink></th>
			<th><NuxtLink :to="url + '?sort=points&order=' + page['order']">Очки</NuxtLink></th>
			<th>Координаты</th>
			<th><NuxtLink :to="url + '?sort=date&order=' + page['order']">Дата вступления</NuxtLink></th>
			<th v-if="page['status']"><NuxtLink :to="url + '?sort=active&order=' + page['order']">Активность</NuxtLink></th>
			<th v-if="page['admin']">Управление</th>
		</tr>
		<template v-for="(m, index) in page['members']">
			<tr>
				<th>{{ index + 1 }}</th>
				<th>{{ m['username'] }}</th>
				<th>
					<SendMessagePopup :title="$t('send_message')" :id="m['id']"/>
				</th>
				<th>
					<img :src="'/images/skin/race' + m['race'] + '.gif'" width="16" height="16" alt="">
				</th>
				<th>{{ m['range'] }}</th>
				<th>{{ m['points'] }}</th>
				<th>
					<NuxtLink :to="'/galaxy/?galaxy=' + m['galaxy'] + '&system=' + m['system']">{{ m['galaxy'] }}:{{ m['system'] }}:{{ m['planet'] }}</NuxtLink>
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
						<tbody>
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
						</tbody>
					</table>
				</th>
			</tr>
		</template>
		<tr>
			<td class="c" colspan="10">
				<NuxtLink :to="'/alliance' + (page['admin'] ? '/admin' : '')">вернутся к обзору</NuxtLink>
			</td>
		</tr>
		</tbody>
	</table>
</template>

<script setup>
	import SendMessagePopup from '~/components/Page/Messages/SendMessagePopup.vue';
	import { definePageMeta, openConfirmModal, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification } from '#imports';
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
		async () => await useApiGet('/alliance/members', Object.assign({}, route.params, route.query)),
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