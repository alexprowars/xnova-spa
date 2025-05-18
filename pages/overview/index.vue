<template>
	<div v-if="user" class="page-overview">
		<DailyBonus v-if="page['bonus']" :amount="page['bonus_count']"/>

		<div class="block">
			<div class="title">
				<div class="row">
					<div class="col-12 col-sm-6">
						{{ $t('planet_type.'+planet['type']) }} "{{ planet['name'] }}"
						<NuxtLinkLocale :to="'/galaxy/?galaxy='+planet['coordinates']['galaxy']+'&system='+planet['coordinates']['system']">
							[{{ planet['coordinates']['galaxy'] }}:{{ planet['coordinates']['system'] }}:{{ planet['coordinates']['planet'] }}]
						</NuxtLinkLocale>
						<NuxtLinkLocale to="/overview/rename" title="Редактирование планеты">(изменить)</NuxtLinkLocale>
					</div>
					<div class="separator d-sm-none"></div>
					<div class="col-12 col-sm-6">
						<div class="float-sm-end"><clock></clock></div>
						<div class="clearfix d-sm-none"></div>
					</div>
				</div>
			</div>
			<div class="content">

				<div v-if="page['resource_notify']" class="row">
					<div class="col text-center">
						<span class="negative">Одна из шахт находится в выключенном состоянии. Зайдите в меню "<NuxtLinkLocale to="/resources">Сырьё</NuxtLinkLocale>" и восстановите производство.</span>
					</div>
					<div class="separator"></div>
				</div>

				<div v-if="page['noob']" class="row">
					<div class="col text-center">
						<span style="font-weight:normal;"><span class="positive">Активен режим ускорения новичков.</span><br>Режим будет деактивирован после достижения 1000 очков.</span>
					</div>
					<div class="separator"></div>
				</div>

				<div v-if="page['fleets'].length">
					<fleets :items="page['fleets']"></fleets>
					<div class="separator"></div>
				</div>
				<div class="row overview">
					<div class="col-sm-4 col-12">
						<div class="row">
							<div class="col-12">
								<div class="planet-image">
									<NuxtLinkLocale to="/overview/rename/">
										<img :src="'/images/planeten/'+planet['image']+'.jpg'" alt="">
									</NuxtLinkLocale>
									<div v-if="page['moon']" class="moon-image">
										<NuxtLinkLocale :to="'/overview/?chpl='+page['moon']['id']" :title="page['moon']['name']">
											<img :src="'/images/planeten/'+page['moon']['image']+'.jpg'" height="50" width="50" alt="">
										</NuxtLinkLocale>
									</div>
								</div>

								<div class="separator"></div>

								<div style="border: 1px solid rgb(153, 153, 255); width: 100%; margin: 0 auto;">
									<div id="CaseBarre" :style="'background-color: #'+(userFiledsPercent > 80 ? 'C00000' : (userFiledsPercent > 60 ? 'C0C000' : '00C000'))+'; width: '+userFiledsPercent+'%;  margin: 0 auto; text-align:center;'">
										<font color="#000000"><b>{{ userFiledsPercent }}%</b></font>
									</div>
								</div>
							</div>
							<div class="col-12 page-overview-officiers">
								<NuxtLinkLocale v-for="item in user['officiers']" to="/officiers" class="page-overview-officiers-item">
									<Popper>
										<template #content>
											<div>
												{{ $t('tech.' + item['id']) }}
												<br>
												<span v-if="item['time'] && dayjs(item['time']).diff() > 0">
													Нанят до <span class="positive">{{ $date(item['time'], 'DD MMM HH:mm') }}</span>
												</span>
												<span v-else class="positive">Не нанят</span>
											</div>
										</template>
										<span class="officier" :class="['of' + item['id'] + (item['time'] && dayjs(item['time']).diff() > 0 ? '_ikon' : '')]"></span>
									</Popper>
								</NuxtLinkLocale>
							</div>
						</div>
					</div>
					<div class="col-sm-4 col-12">
						<div class="separator d-sm-none"></div>
						<div class="block-table container-fluid">
							<div class="row">
								<div class="col-12 c">Диаметр</div>
							</div>
							<div class="row">
								<div class="col-12 th">
									{{ $number(planet['diameter']) }} км
								</div>
							</div>
							<div class="row">
								<div class="col-12 c">Занятость</div>
							</div>
							<div class="row">
								<div class="col-12 th">
									<a title="Занятость полей">{{ planet['field_used'] }}</a> / <a title="Максимальное количество полей">{{ planet['field_max'] }}</a> поля
								</div>
							</div>
							<div class="row">
								<div class="col-12 c">Температура</div>
							</div>
							<div class="row">
								<div class="col-12 th">
									от. {{ planet['temp_min'] }}&deg;C до {{ planet['temp_max'] }}&deg;C
								</div>
							</div>
							<div class="row">
								<div class="col-12 c">
									Обломки
									<a v-if="hasDebrisMission" @click.prevent="sendRecycle">
										(переработать)
									</a>
								</div>
							</div>
							<div class="row">
								<div class="col-12 th doubleth middle">
									<div>
										<img src="/images/skin/s_metal.png" alt="" align="absmiddle" v-tooltip="'Металл'">
										{{ $number(planet['debris']['metal']) }}
										/
										<img src="/images/skin/s_crystal.png" alt="" align="absmiddle" v-tooltip="'Кристалл'">
										{{ $number(planet['debris']['crystal']) }}
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-12 c">Бои</div>
							</div>
							<div class="row">
								<div class="col-12 th middle">
									<img src="/images/wins.gif" alt="" align="absmiddle" v-tooltip="'Победы'">&nbsp;
									{{ user['raids']['win'] }}
									&nbsp;&nbsp;
									<img src="/images/losses.gif" alt="" align="absmiddle" v-tooltip="'Поражения'">&nbsp;
									{{ user['raids']['lost'] }}
								</div>
							</div>
							<div class="row">
								<div class="col-12 th">
									Фракция: <NuxtLinkLocale to="/race">{{ $t('races.' + user['race']) }}</NuxtLinkLocale>
								</div>
							</div>
							<div class="row">
								<div class="col-12 th">
									<NuxtLinkLocale to="/refers">
										https://{{ host }}/?{{ user['id'] }}
									</NuxtLinkLocale>
									[{{ page['links'] }}]
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-4 col-12">
						<div class="separator d-sm-none"></div>
						<div class="block-table container-fluid">
							<div class="row">
								<div class="c col-sm-5 col-6">Игрок:</div>
								<div class="c col-sm-7 col-6" style="word-break: break-all;">
									<a :href="'/players/'+user['id']+'/'" @click.prevent="openPlayerPopup">{{ user['name'] }}</a>
								</div>
							</div>
							<div class="row">
								<div class="th col-sm-5 col-6">Постройки:</div>
								<div class="th col-sm-7 col-6">
									<span class="positive">{{ $number(user['points']['build']) }}</span>
								</div>
							</div>
							<div class="row">
								<div class="th col-sm-5 col-6">Флот:</div>
								<div class="th col-sm-7 col-6">
									<span class="positive">{{ $number(user['points']['fleet']) }}</span>
								</div>
							</div>
							<div class="row">
								<div class="th col-sm-5 col-6">Оборона:</div>
								<div class="th col-sm-7 col-6">
									<span class="positive">{{ $number(user['points']['defs']) }}</span>
								</div>
							</div>
							<div class="row">
								<div class="th col-sm-5 col-6">Наука:</div>
								<div class="th col-sm-7 col-6">
									<span class="positive">{{ $number(user['points']['tech']) }}</span>
								</div>
							</div>
							<div class="row">
								<div class="th col-sm-5 col-6">Всего:</div>
								<div class="th col-sm-7 col-6">
									<span class="positive">{{ $number(user['points']['total']) }}</span>
								</div>
							</div>
							<div class="row">
								<div class="th col-sm-5 col-6">Место:</div>
								<div class="th col-sm-7 col-6">
									<NuxtLinkLocale :to="'/stat?view=players&range=' + user['points']['place']">{{ user['points']['place'] }}</NuxtLinkLocale>
									<span title="Изменение места в рейтинге">
										<span v-if="user['points']['diff'] >= 1" class="positive">+{{ user['points']['diff'] }}</span>
										<span v-else-if="user['points']['diff'] < 0" class="negative">{{ user['points']['diff'] }}</span>
									</span>
								</div>
							</div>
							<div class="row">
								<div class="c col-12">Промышленный уровень</div>
							</div>
							<div class="row">
								<div class="th col-12">
									{{ page['lvl']['mine']['l'] }} из 100
								</div>
							</div>
							<div class="row">
								<div class="th col-12">
									{{ $number(page['lvl']['mine']['p']) }} / {{ $number(page['lvl']['mine']['u']) }} exp
								</div>
							</div>
							<div class="row">
								<div class="c col-12">Военный уровень</div>
							</div>
							<div class="row">
								<div class="th col-12">
									{{ page['lvl']['raid']['l'] }} из 100
								</div>
							</div>
							<div class="row">
								<div class="th col-12">
									{{ $number(page['lvl']['raid']['p']) }} / {{ $number(page['lvl']['raid']['u']) }} exp
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="clearfix"></div>

				<div v-if="page['queue'].length > 0">
					<div class="separator"></div>
					<div class="block-table">
						<QueueRow v-for="(list, i) in page['queue']" :key="i" :item="list"/>
					</div>
				</div>
			</div>
		</div>

		<div v-if="chat.length > 0" class="page-overview-chat">
			<div class="separator"></div>

			<table class="table" style="max-width: 100%">
				<tbody>
					<tr>
						<th class="text-start">
							<div style="overflow-y: auto;overflow-x: hidden;">
								<ChatMessage v-for="(item, i) in chat" :key="i" :item="item"/>
							</div>
						</th>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
	import PlayerInfo from '~/components/Page/Players/Info.vue';
	import Fleets from '~/components/Page/Overview/Feets.vue';
	import Clock from '~/components/Page/Overview/Clock.vue';
	import QueueRow from '~/components/Page/Overview/QueueRow.vue';
	import { sendMission } from '~/utils/fleet';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store';
	import { definePageMeta, showError, useAsyncData, useHead, useRequestURL, openAjaxPopupModal, useRoute, isMobile } from '#imports';
	import { computed, onMounted } from 'vue';
	import dayjs from 'dayjs';
	import DailyBonus from '~/components/Page/Overview/DailyBonus.vue';
	import useChatStore from '~/store/chat.js';
	import ChatMessage from '~/components/Page/Overview/ChatMessage.vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Обзор',
	});

	const store = useStore();

	const { data: page, error } = await useAsyncData('page-overview',
		async () => await Promise.all([
			store.loadPage('/overview'),
			store.loadState()
		]).then(([result]) => result),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const { user, planet, queue } = storeToRefs(store);
	const { host } = useRequestURL();
	const { messages: chat } = storeToRefs(useChatStore());

	const userFiledsPercent = computed(() => {
		return Math.min(Math.floor(planet.value.field_used / planet.value.field_max * 100), 100);
	})

	const hasDebrisMission = computed(() => {
		return (planet.value['debris']['metal'] !== 0 || planet.value['debris']['crystal'] !== 0) && planet.value['units']['recycler'] > 0;
	})

	function sendRecycle () {
		sendMission(
			8,
			planet.value['coordinates']['galaxy'],
			planet.value['coordinates']['system'],
			planet.value['coordinates']['planet'],
			2
		)
	}

	function openPlayerPopup () {
		openAjaxPopupModal(PlayerInfo, '/players/' + user.value['id'])
	}

	onMounted(async () => {
		if (isMobile()) {
			await useChatStore().loadMessages();
		}
	});
</script>