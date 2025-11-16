<template>
	<NoAlliance v-if="hasAlliance" :requests="page['requests']" :alliances="page['alliances']"/>
	<div v-else>
		<div class="block">
			<div class="title">
				Информация об альянсе
			</div>
			<div class="content">
				<div class="block-table text-center">
					<div v-if="page['image']">
						<div class="th">
							<img :src="page['image']" class="max-w-full" alt="">
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">Аббревиатура</div>
						<div class="th">{{ page['tag'] }}</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">Название</div>
						<div class="th">{{ page['name'] }}</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">Члены альянса</div>
						<div class="th">
							{{ page['members'] }}
							<template v-if="page['access']['memberlist']">
								(<NuxtLink to="/alliance/members">список</NuxtLink>)
							</template>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">Ваш ранг</div>
						<div class="th">
							{{ page['range'] }}
							<template v-if="page['access']['admin']">
								(<NuxtLink to="/alliance/admin">управление альянсом</NuxtLink>)
							</template>
						</div>
					</div>
					<div v-if="page['diplomacy'] !== false" class="grid grid-cols-2">
						<div class="th">Дипломатия</div>
						<div class="th">
							<NuxtLink to="/alliance/diplomacy">Просмотр</NuxtLink>
							<template v-if="page['diplomacy'] > 0">
								({{ page['diplomacy'] }} новых запросов)
							</template>
						</div>
					</div>
					<div v-if="page['requests'] > 0" class="grid grid-cols-2">
						<div class="th">Заявки</div>
						<div class="th">
							<NuxtLink to="/alliance/admin/requests">{{ page['requests'] }} заявок</NuxtLink>
						</div>
					</div>
					<div v-if="page['access']['chat']" class="grid grid-cols-2">
						<div class="th">
							Альянс чат
							<template v-if="user.alliance?.messages > 0">
								({{ user.alliance.messages }} новых)
							</template>
						</div>
						<div class="th"><NuxtLink to="/alliance/chat">Войти в чат</NuxtLink></div>
					</div>
					<div v-if="page['web']" class="grid grid-cols-2">
						<div class="th">Домашняя страница</div>
						<div class="th"><a :href="page['web']" target="_blank">{{ page['web'] }}</a></div>
					</div>
					<div v-if="page['description']">
						<div class="b p-1 h-60">
							<TextViewer :text="page['description']"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="page['text']" class="block">
			<div class="title">
				Внутренняя компетенция
			</div>
			<div class="content">
				<div class="b p-1 min-h-32">
					<TextViewer :text="page['text']"/>
				</div>
			</div>
		</div>
		<div v-if="!page['owner']" class="block">
			<div class="title">
				Покинуть альянс
			</div>
			<div class="content">
				<div class="th text-center">
					<button @click.prevent="exit">Продолжить</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import NoAlliance from '~/components/Page/Alliance/NoAlliance.vue';
	import { definePageMeta, openConfirmModal, refreshNuxtData, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification } from '#imports';
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

	const { data: page, error } = await useAsyncData(
		async () => await useApiGet('/alliance'),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const { user } = storeToRefs(useStore());

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

						refreshNuxtData();
					});
				}
			}]
		);
	}
</script>