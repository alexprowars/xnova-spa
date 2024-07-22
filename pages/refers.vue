<template>
	<div class="page-refers">
		<div v-if="page['items'].length > 0" class="block">
			<div class="title">Привлечённые игроки</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="col c">Ник</div>
						<div class="col c">Дата регистрации</div>
						<div class="col c">Уровень развития</div>
					</div>
					<div class="row" v-for="item in page['items']">
						<div class="col th">
							<NuxtLinkLocale :to="'/players/' + item['id']">{{ item['username'] }}</NuxtLinkLocale>
						</div>
						<div class="col th">{{ dayjs(item['created_at']).tz().format('DD MMM YYYY HH:mm:ss') }}</div>
						<div class="col th">П:{{ item['lvl_minier'] }}, В:{{ item['lvl_raid'] }}</div>
					</div>
				</div>
			</div>
		</div>

		<template v-if="page['you'] !== undefined">
			<div class="block-table">
				<div class="row">
					<div class="col th">Вы были привлечены игроком:</div>
					<div class="col th">
						<NuxtLinkLocale :to="'/players/' + page['you']['id']">{{ page['you']['username'] }}</NuxtLinkLocale>
					</div>
				</div>
			</div>
		</template>

		<div class="block">
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="col th" style="padding:15px;">
							Помоги проекту, поделись им с друзьями!<br><br>

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
			<div class="title">Юзербар</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="col text-center">
							<br>
							<img :src="'/userbar' + user.id + '.jpg'" alt="">

							<br><br>
							HTML код:
							<br>
							<input style="width:100%" type="text" :value="html">
							<div class="separator"></div>
							BB код:
							<input style="width:100%" type="text" :value="'[url=' + protocol + '//' + host + '/?' + user.id + '][img]' + protocol + '//' + host + '/userbar' + user.id + '.jpg[/img][/url]'">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { addScript, definePageMeta, showError, useAsyncData, useHead, useRequestURL, useRoute } from '#imports';
	import useStore from '~/store';
	import { computed, onMounted } from 'vue';
	import { storeToRefs } from 'pinia';
	import dayjs from 'dayjs';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Рефералы',
	});

	const store = useStore();

	const { data: page, error } = await useAsyncData(async () => {
		return await store.loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const { user } = storeToRefs(store);
	const { protocol, host } = useRequestURL();

	onMounted(() => {
		addScript('https://yandex.st/share/share.js');
	});

	const html = computed(() => {
		return '<a href="' + protocol + '//' + host + '/?' + user.value.id + '"><img src="' + protocol + '//' + host + '/userbar' + user.value.id + '.jpg"></a>'
	});
</script>