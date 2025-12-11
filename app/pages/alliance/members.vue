<template>
	<div class="block">
		<div class="title">
			{{ $t('pages.alliance.members.title', [page['members'].length]) }}
		</div>
		<div class="content">
			<table class="table text-center">
				<tbody>
				<tr>
					<td class="th">{{ $t('pages.alliance.members.number') }}</td>
					<td class="th"><NuxtLink :to="url + '?sort=name&order=' + page['order']">{{ $t('pages.alliance.members.nickname') }}</NuxtLink></td>
					<td class="th">&nbsp;</td>
					<td class="th">&nbsp;</td>
					<td class="th"><NuxtLink :to="url + '?sort=rank&order=' + page['order']">{{ $t('pages.alliance.members.rank') }}</NuxtLink></td>
					<td class="th"><NuxtLink :to="url + '?sort=points&order=' + page['order']">{{ $t('pages.alliance.members.points') }}</NuxtLink></td>
					<td class="th">{{ $t('pages.alliance.members.coordinates') }}</td>
					<td class="th"><NuxtLink :to="url + '?sort=date&order=' + page['order']">{{ $t('pages.alliance.members.join_date') }}</NuxtLink></td>
					<td class="th" v-if="page['status']"><NuxtLink :to="url + '?sort=active&order=' + page['order']">{{ $t('pages.alliance.members.activity') }}</NuxtLink></td>
					<td class="th" v-if="page['admin']">{{ $t('pages.alliance.members.management') }}</td>
				</tr>
				<template v-for="(m, index) in page['members']">
					<tr>
						<td class="th">{{ index + 1 }}</td>
						<td class="th">{{ m['username'] }}</td>
						<td class="th">
							<SendMessagePopup :title="$t('send_message')" :id="m['id']"/>
						</td>
						<td class="th">
							<img :src="'/images/skin/race' + m['race'] + '.gif'" width="16" height="16" alt="">
						</td>
						<td class="th">{{ m['range'] }}</td>
						<td class="th">{{ m['points'] }}</td>
						<td class="th">
							<NuxtLink :to="'/galaxy?galaxy=' + m['galaxy'] + '&system=' + m['system']">{{ m['galaxy'] }}:{{ m['system'] }}:{{ m['planet'] }}</NuxtLink>
						</td>
						<td class="th">{{ $formatDate(m['date'], 'DD MMM YYYY') }}</td>
						<td class="th" v-if="page['status']" v-html="m['onlinetime']"></td>
						<td class="th" v-if="page['admin']">
							<a href="" @click.prevent="kick(m['id'])">
								<img src="/images/abort.gif" alt="">
							</a>
							&nbsp;
							<a href="" @click.prevent="setRank(m['id'])">
								<img src="/images/key.gif" alt="">
							</a>
						</td>
					</tr>
					<tr v-if="m['id'] === changeRank && page['admin']">
						<td colspan="10" class="th p-0">
							<div class="table !border-0">
								<div>
									<div class="th">{{ $t('pages.alliance.members.set_rank_for', [m['username']]) }}</div>
									<div class="th">
										<select v-model="m['rank']">
											<option value="0">{{ $t('pages.alliance.members.novice') }}</option>
											<option v-for="rank in page['ranks']" :value="rank['id']">{{ rank['name'] }}</option>
										</select>
									</div>
									<div class="th"><button @click.prevent="saveRank(m['id'], m['rank'])">{{ $t('pages.alliance.members.save') }}</button></div>
								</div>
							</div>
						</td>
					</tr>
				</template>
				</tbody>
			</table>
		</div>
	</div>
	<div class="mt-2">
		<NuxtLink :to="'/alliance' + (page['admin'] ? '/admin' : '')" class="button">{{ $t('pages.alliance.members.back_to_overview') }}</NuxtLink>
	</div>
</template>

<script setup>
	import SendMessagePopup from '~/components/Page/Messages/SendMessagePopup.vue';
	import { definePageMeta, openConfirmModal, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification, useI18n } from '#imports';
	import { computed, ref } from 'vue';

	const { t } = useI18n();

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: t('pages.alliance.members.page_title'),
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
			t('pages.alliance.members.kick_confirm.title'),
			[{
				title: t('pages.alliance.members.kick_confirm.no'),
			}, {
				title: t('pages.alliance.members.kick_confirm.yes'),
				handler: () => {
					useApiSubmit('alliance/admin/members/kick', { id }, () => {
						useSuccessNotification(t('pages.alliance.members.kick_confirm.success'));

						refresh();
					});
				}
			}]
		);
	}
</script>