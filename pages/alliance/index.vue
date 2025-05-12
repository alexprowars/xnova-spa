<template>
	<NoAlliance v-if="hasAlliance" :requests="page['requests']" :alliances="page['alliances']"/>
	<div v-else>
		<table class="table" style="table-layout: fixed;">
			<tbody>
				<tr>
					<td class="c" colspan="2">Информация об альянсе</td>
				</tr>
				<tr v-if="page['image']">
					<th colspan="2" class="p-a-0">
						<img :src="page['image']" style="max-width:100%" alt="">
					</th>
				</tr>
				<tr>
					<th>Аббревиатура</th>
					<th>{{ page['tag'] }}</th>
				</tr>
				<tr>
					<th>Название</th>
					<th>{{ page['name'] }}</th>
				</tr>
				<tr>
					<th>Члены альянса</th>
					<th>
						{{ page['members'] }}
						<template v-if="page['access']['memberlist']">
							(<NuxtLinkLocale to="/alliance/members">список</NuxtLinkLocale>)
						</template>
					</th>
				</tr>
				<tr>
					<th>Ваш ранг</th>
					<th>
						{{ page['range'] }}
						<template v-if="page['access']['admin']">
							(<NuxtLinkLocale to="/alliance/admin">управление альянсом</NuxtLinkLocale>)
						</template>
					</th>
				</tr>
				<tr v-if="page['diplomacy'] !== false">
					<th>Дипломатия</th>
					<th>
						<NuxtLinkLocale to="/alliance/diplomacy">Просмотр</NuxtLinkLocale>
						<template v-if="page['diplomacy'] > 0">
							({{ page['diplomacy'] }} новых запросов)
						</template>
					</th>
				</tr>
				<tr v-if="page['requests'] > 0">
					<th>Заявки</th>
					<th>
						<NuxtLinkLocale to="/alliance/admin/equests">{{ page['requests'] }} заявок</NuxtLinkLocale>
					</th>
				</tr>
				<tr v-if="page['access']['chat']">
					<th>
						Альянс чат
						<template v-if="user.alliance.messages > 0">
							({{ user.alliance.messages }} новых)
						</template>
					</th>
					<th><NuxtLinkLocale to="/alliance/chat">Войти в чат</NuxtLinkLocale></th>
				</tr>
				<tr v-if="page['web']">
					<th>Домашняя страница</th>
					<th><a :href="page['web']" target="_blank">{{ page['web'] }}</a></th>
				</tr>
				<tr v-if="page['description']">
					<td class="b" colspan="2" height="100" style="padding:3px;">
						<TextViewer :text="page['description']"/>
					</td>
				</tr>
			</tbody>
		</table>

		<table v-if="page['text']" width="100%">
			<tbody>
			<tr>
				<td class="c">Внутренняя компетенция</td>
			</tr>
			<tr>
				<td class="b" height="100" style="padding:3px;">
					<TextViewer :text="page['text']"/>
				</td>
			</tr>
			</tbody>
		</table>

		<table v-if="!page['owner']" width="100%">
			<tbody>
			<tr>
				<td class="c">Покинуть альянс</td>
			</tr>
			<tr>
				<th><button @click.prevent="exit">Продолжить</button></th>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
	import NoAlliance from '~/components/Page/Alliance/NoAlliance.vue';
	import { definePageMeta, openConfirmModal, refreshNuxtData, showError, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification } from '#imports';
	import useStore from '~/store';
	import { computed } from 'vue';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Ваш альянс',
	});

	const store = useStore();

	const { data: page, error } = await useAsyncData('page-alliance',
		async () => await store.loadPage(),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const { user } = storeToRefs(store);

	const hasAlliance = computed(() => {
		return typeof page.value['id'] === 'undefined'
	})

	if (!hasAlliance.value) {
		useHead({
			title: 'Альянсы',
		});
	}

	function exit () {
		openConfirmModal(
			null,
			'Покинуть альянс?',
			[{
				title: 'Нет',
			}, {
				title: 'Да',
				handler: () => {
					useApiSubmit('alliance/exit', {}, () => {
						useSuccessNotification('Вы покинули альянс');

						refreshNuxtData('page-alliance');
					});
				}
			}]
		);
	}
</script>