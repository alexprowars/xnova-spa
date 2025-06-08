<template>
	<div class="page-referrals">
		<div v-if="page['items'].length > 0" class="block">
			<div class="title">Привлечённые игроки</div>
			<div class="content !border-0">
				<div class="block-table">
					<div class="grid grid-cols-3">
						<div class="c">Ник</div>
						<div class="c">Дата регистрации</div>
						<div class="c">Уровень развития</div>
					</div>
					<div class="grid grid-cols-3" v-for="item in page['items']">
						<div class="th">
							<NuxtLink :to="'/players/' + item['id']">{{ item['username'] }}</NuxtLink>
						</div>
						<div class="th">{{ $formatDate(item['created_at'], 'DD MMM YYYY HH:mm:ss') }}</div>
						<div class="th">П:{{ item['lvl_minier'] }}, В:{{ item['lvl_raid'] }}</div>
					</div>
				</div>
			</div>
		</div>

		<template v-if="page['you'] !== undefined">
			<div class="block-table">
				<div class="grid grid-cols-2">
					<div class="th">Вы были привлечены игроком:</div>
					<div class="th">
						<NuxtLink :to="'/players/' + page['you']['id']">{{ page['you']['username'] }}</NuxtLink>
					</div>
				</div>
			</div>
		</template>

		<div class="block">
			<div class="content !border-0">
				<div class="block-table">
					<div class="grid">
						<div class="th" style="padding:15px;">
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
			<div class="content !border-0">
				<div class="block-table">
					<div class="grid">
						<div class="text-center">
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
	import { addScript, definePageMeta, showError, useApiGet, useAsyncData, useHead, useRequestURL, useRoute } from '#imports';
	import useStore from '~/store';
	import { computed, onMounted } from 'vue';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Рефералы',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/referrals');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const { user } = storeToRefs(useStore());
	const { protocol, host } = useRequestURL();

	onMounted(() => {
		addScript('https://yandex.st/share/share.js');
	});

	const html = computed(() => {
		return '<a href="' + protocol + '//' + host + '/?' + user.value.id + '"><img src="' + protocol + '//' + host + '/userbar' + user.value.id + '.jpg"></a>'
	});
</script>