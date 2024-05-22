<template>
	<div class="page-refers">
		<div v-if="page['ref'].length > 0" class="block">
			<div class="title">Привлечённые игроки</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="col c">Ник</div>
						<div class="col c">Дата регистрации</div>
						<div class="col c">Уровень развития</div>
					</div>
					<div class="row" v-for="list in page['ref']">
						<div class="col th">
							<NuxtLinkLocale :to="'/players/'+list['id']+'/'">{{ list['username'] }}</NuxtLinkLocale>
						</div>
						<div class="col th">{{ $date(list['create_time'], 'd.m.Y H:i') }}</div>
						<div class="col th">П:{{ list['lvl_minier'] }}, В:{{ list['lvl_raid'] }}</div>
					</div>
				</div>
			</div>
		</div>

		<template v-if="page['you'] !== undefined">
			<div class="block-table">
				<div class="row">
					<div class="col th">Вы были привлечены игроком:</div>
					<div class="col th">
						<NuxtLinkLocale :to="'/players/'+page['you']['id']+'/'">{{ page['you']['username'] }}</NuxtLinkLocale>
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
								:data-yashareLink="host+'/?'+user.id"
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
							<img :src="'/userbar'+user.id+'.jpg'" alt="">

							<br><br>
							HTML код:
							<br>
							<input style="width:100%" type="text" :value="html" title="">
							<div class="separator"></div>
							BB код:
							<input style="width:100%" type="text" :value="'[url='+host+'/?'+user.id+'][img]'+host+'/userbar'+user.id+'.jpg[/img][/url]'" title="">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { addScript, definePageMeta, showError, useAsyncData, useHead, useRoute, useRequestURL } from '#imports';
	import useStore from '~/store';
	import { computed, onMounted, watch } from 'vue';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Рефералы',
	});

	const route = useRoute();
	const store = useStore();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await store.loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	const { user } = storeToRefs(store);
	const { host } = useRequestURL();

	onMounted(() => {
		addScript('https://yandex.st/share/share.js');
	});

	const html = computed(() => {
		return '<a href="'+host.value+'/?'+user.value.id+'"><img src="'+host.value+'/userbar'+user.value.id+'.jpg"></a>'
	});
</script>