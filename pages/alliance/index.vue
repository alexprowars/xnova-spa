<template>
	<div v-if="hasAlliance">
		<table class="table">
			<tr>
				<td class="c" colspan="2">Альянсы</td>
			</tr>
			<tr>
				<th><NuxtLinkLocale to="/alliance/make">Создать альянс</NuxtLinkLocale></th>
				<th><NuxtLinkLocale to="/alliance/search">Поиск альянса</NuxtLinkLocale></th>
			</tr>
		</table>

		<table v-if="page['list'].length" class="table">
			<tr>
				<td class="c" colspan="2">Ваши заявки</td>
			</tr>
			<template v-for="item in page['list']">
				<tr>
					<th width="70%">{{ item[2] }} [{{ item[1] }}]</th>
					<th>{{ dayjs(item[3]).tz().format('DD MMM YYYY HH:mm') }}</th>
				</tr>
				<tr>
					<th colspan="2">
						<RouterForm action="/alliance">
							<input type="hidden" name="r_id" :value="item[0]">
							<input type="submit" name="bcancel" value="Убрать заявку">
						</RouterForm>
					</th>
				</tr>
			</template>
		</table>
		<table v-if="page['allys'].length" class="table">
			<tr>
				<td class="c" width="30">Место</td>
				<td class="c">Альянс</td>
				<td class="c">Игроки</td>
				<td class="c">Очки</td>
			</tr>
			<tr v-for="(item, i) in page['allys']">
				<th>{{ i + 1 }}</th>
				<th><NuxtLinkLocale :to="'/alliance/info/'+item['id']+''">{{ item['name'] }} [{{ item['tag'] }}]</NuxtLinkLocale></th>
				<th>{{ item['members'] }}</th>
				<th>{{ item['total_points'] }}</th>
			</tr>
		</table>
	</div>
	<div v-else>
		<table class="table" style="table-layout: fixed;">
			<tbody>
				<tr>
					<td class="c" colspan="2">Информация об альянсе</td>
				</tr>
				<tr v-if="page['image'] !== ''">
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
						<template v-if="page['members_list']">
							(<NuxtLinkLocale to="/alliance/members">список</NuxtLinkLocale>)
						</template>
					</th>
				</tr>
				<tr>
					<th>Ваш ранг</th>
					<th>
						{{ page['range'] }}
						<template v-if="page['alliance_admin']">
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
				<tr v-if="page['chat_access']">
					<th>
						Альянс чат
						<template v-if="user.alliance.messages > 0">
							({{ user.alliance.messages }} новых)
						</template>
					</th>
					<th><NuxtLinkLocale to="/alliance/chat">Войти в чат</NuxtLinkLocale></th>
				</tr>
				<tr>
					<td class="b" colspan="2" height="100" style="padding:3px;">
						<TextViewer :text="page['description']"/>
					</td>
				</tr>
				<tr v-if="page['web'] !== ''">
					<th>Домашняя страница</th>
					<th><a :href="page['web']" target="_blank">{{ page['web'] }}</a></th>
				</tr>
				<tr>
					<td class="c" colspan="2">Внутренняя компетенция</td>
				</tr>
				<tr>
					<td class="b" colspan="2" height="100" style="padding:3px;">
						<TextViewer :text="page['text']"/>
					</td>
				</tr>
				<tr v-if="page['owner'] !== ''">
					<td colspan="2" v-html="page['owner']"></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { computed } from 'vue';
	import { storeToRefs } from 'pinia';
	import dayjs from 'dayjs';

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

	const { data: page, error } = await useAsyncData(async () => {
		return await store.loadPage();
	}, { watch: [() => useRoute().query] });

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
</script>