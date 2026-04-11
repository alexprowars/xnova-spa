<template>
	<div class="page-referrals">
		<div v-if="page['items'].length > 0" class="block">
			<div class="title">{{ $t('pages.referrals.recruited_players_title') }}</div>
			<div class="content">
				<div class="block-table text-center">
					<div class="grid grid-cols-3">
						<div class="c">{{ $t('pages.referrals.table_col_username') }}</div>
						<div class="c">{{ $t('pages.referrals.table_col_registered_at') }}</div>
						<div class="c">{{ $t('pages.referrals.table_col_development') }}</div>
					</div>
					<div class="grid grid-cols-3" v-for="item in page['items']">
						<div class="th">
							<NuxtLink :to="'/players/' + item['id']">{{ item['username'] }}</NuxtLink>
						</div>
						<div class="th">{{ $formatDate(item['created_at'], 'DD MMM YYYY HH:mm:ss') }}</div>
						<div class="th">{{ $t('pages.referrals.levels_short', { miner: item['lvl_minier'], raid: item['lvl_raid'] }) }}</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="page['you'] !== undefined" class="block">
			<div class="content">
				<div class="block-table text-center">
					<div class="grid grid-cols-2">
						<div class="th">{{ $t('pages.referrals.referred_by_caption') }}</div>
						<div class="th">
							<NuxtLink :to="'/players/' + page['you']['id']">{{ page['you']['username'] }}</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="block">
			<div class="content">
				<div class="block-table text-center">
					<div class="grid">
						<div class="th" style="padding:15px;">
							{{ $t('pages.referrals.share_project_prompt') }}<br><br>

							<div class="yashare-auto-init"
								data-yashareL10n="ru"
								data-yashareTheme="counter"
								data-yashareQuickServices="vkontakte,facebook,twitter,odnoklassniki,moimir,gplus"
								:data-yashareLink="protocol + '//' + host + '/?' + user.id"
								data-yashareTitle=""
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="block">
			<div class="title">{{ $t('pages.referrals.userbar_title') }}</div>
			<div class="content block-table text-center">
				<div class="grid">
					<br>
					<img :src="'/userbar' + user.id + '.jpg'" :alt="$t('pages.referrals.userbar_title')">

					<br><br>
					{{ $t('pages.referrals.embed_html_label') }}
					<br>
					<input style="width:100%" type="text" :value="html">
					<div class="separator"></div>
					{{ $t('pages.referrals.embed_bb_label') }}
					<input style="width:100%" type="text" :value="'[url=' + protocol + '//' + host + '/?' + user.id + '][img]' + protocol + '//' + host + '/userbar' + user.id + '.jpg[/img][/url]'">
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useI18n, useRequestURL } from '#imports';
	import useStore from '~/store';
	import { computed, onMounted } from 'vue';
	import { useScript } from '@unhead/vue';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.referrals.head_title'),
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/referrals');
	});

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	const { user } = storeToRefs(useStore());
	const { protocol, host } = useRequestURL();

	onMounted(() => {
		useScript({
			src: 'https://yandex.st/share/share.js',
			key: 'share',
			defer: true,
			async: true,
			crossorigin: null,
		}, {
			trigger: 'client'
		});
	});

	const html = computed(() => {
		return '<a href="' + protocol + '//' + host + '/?' + user.value.id + '"><img src="' + protocol + '//' + host + '/userbar' + user.value.id + '.jpg"></a>'
	});
</script>