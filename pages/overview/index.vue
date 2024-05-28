<template>
	<div v-if="user" class="page-overview">
		<div v-if="page['bonus']" class="block page-overview-bonus">
			<div class="title text-center">
				Ежедневный бонус
			</div>
			<div class="block-table">
				<div class="row">
					<div class="col th">
						Сейчас вы можете получить по <b class="positive">{{ $number(page['bonus_count']) }}</b> Металла, Кристаллов и Дейтерия.<br>
						Каждый день размер бонуса будет увеличиваться.<br>
						<br>
						<button @click.prevent="getDailyBonus" class="button">Получить ресурсы</button><br>
					</div>
				</div>
			</div>
		</div>

		<div class="block">
			<div class="title">
				<div class="row">
					<div class="col-12 col-sm-6">
						{{ $t('planet_type.'+planet['type']) }} "{{ planet['name'] }}"
						<NuxtLinkLocale :to="'/galaxy/?galaxy='+planet['coordinates']['galaxy']+'&system='+planet['coordinates']['system']">
							[{{ planet['coordinates']['galaxy'] }}:{{ planet['coordinates']['system'] }}:{{ planet['coordinates']['planet'] }}]
						</NuxtLinkLocale>
						<NuxtLinkLocale to="/overview/rename/" title="Редактирование планеты">(изменить)</NuxtLinkLocale>
					</div>
					<div class="separator d-sm-none"></div>
					<div class="col-12 col-sm-6">
						<div class="float-sm-end"><clock></clock></div>
						<div class="clearfix d-sm-none"></div>
					</div>
				</div>
			</div>
			<div class="content">

				<div v-if="page['error']" class="row">
					<div class="col text-center" v-html="page['error']"></div>
					<div class="separator"></div>
				</div>

				<div v-if="page['fleets']['length']">
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

								<div v-if="page['noob']">
									<div class="separator"></div>
									<img src="/images/warning.png" align="absmiddle" alt="">
									<span style="font-weight:normal;"><span class="positive">Активен режим ускорения новичков.</span><br>Режим будет деактивирован после достижения 1000 очков.</span>
								</div>
							</div>
							<div class="col-12 page-overview-officiers">
								<NuxtLinkLocale v-for="item in user['officiers']" to="/officier/" class="page-overview-officiers-item">
									<Popper>
										<template #content>
											<div>
												{{ $t('tech.'+item['id']) }}
												<br>
												<span v-if="item['time'] > store.getServerTime">
													Нанят до <font color="lime">{{ $date(item['time'], 'd.m.Y H:i') }}</font>
												</span>
												<font v-else color="lime">Не нанят</font>
											</div>
										</template>
										<span class="officier" :class="['of'+item['id']+(item['time'] > store.getServerTime ? '_ikon' : '')]"></span>
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
									<a v-if="page['debris_mission']" @click.prevent="sendRecycle">
										(переработать)
									</a>
								</div>
							</div>
							<div class="row">
								<div class="col-12 th doubleth middle">
									<div>
										<img src="/images/skin/s_metal.png" alt="" align="absmiddle" v-tooltip="'Металл'">
										{{ $number(page['debris']['metal']) }}
										/
										<img src="/images/skin/s_crystal.png" alt="" align="absmiddle" v-tooltip="'Кристалл'">
										{{ $number(page['debris']['crystal']) }}
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-12 c">Бои</div>
							</div>
							<div class="row">
								<div class="col-12 th middle">
									<img src="/images/wins.gif" alt="" align="absmiddle" v-tooltip="'Победы'">&nbsp;
									{{ page['raids']['win'] }}
									&nbsp;&nbsp;
									<img src="/images/losses.gif" alt="" align="absmiddle" v-tooltip="'Поражения'">&nbsp;
									{{ page['raids']['lost'] }}
								</div>
							</div>
							<div class="row">
								<div class="col-12 th">
									Фракция: <NuxtLinkLocale to="/race/">{{ $t('races.'+user['race']) }}</NuxtLinkLocale>
								</div>
							</div>
							<div class="row">
								<div class="col-12 th">
									<NuxtLinkLocale to="/refers/">
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
									<span class="positive">{{ $number(page['points']['build']) }}</span>
								</div>
							</div>
							<div class="row">
								<div class="th col-sm-5 col-6">Флот:</div>
								<div class="th col-sm-7 col-6">
									<span class="positive">{{ $number(page['points']['fleet']) }}</span>
								</div>
							</div>
							<div class="row">
								<div class="th col-sm-5 col-6">Оборона:</div>
								<div class="th col-sm-7 col-6">
									<span class="positive">{{ $number(page['points']['defs']) }}</span>
								</div>
							</div>
							<div class="row">
								<div class="th col-sm-5 col-6">Наука:</div>
								<div class="th col-sm-7 col-6">
									<span class="positive">{{ $number(page['points']['tech']) }}</span>
								</div>
							</div>
							<div class="row">
								<div class="th col-sm-5 col-6">Всего:</div>
								<div class="th col-sm-7 col-6">
									<span class="positive">{{ $number(page['points']['total']) }}</span>
								</div>
							</div>
							<div class="row">
								<div class="th col-sm-5 col-6">Место:</div>
								<div class="th col-sm-7 col-6">
									<NuxtLinkLocale :to="'/stat/?view=players&range='+page['points']['place']">{{ page['points']['place'] }}</NuxtLinkLocale>
									<span title="Изменение места в рейтинге">
										<span v-if="page['points']['diff'] >= 1" class="positive">+{{ page['points']['diff'] }}</span>
										<span v-else-if="page['points']['diff'] < 0" class="negative">{{ page['points']['diff'] }}</span>
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

				<div v-if="page['build_list'].length > 0">
					<div class="separator"></div>
					<div class="block-table">
						<queue-row v-for="(list, i) in page['build_list']" :key="i" :item="list"></queue-row>
					</div>
				</div>
			</div>
		</div>

		<div v-if="page['chat'].length > 0" class="page-overview-chat">
			<div class="separator"></div>

			<table class="table" style="max-width: 100%">
				<tbody>
					<tr>
						<th class="text-start">
							<div style="overflow-y: auto;overflow-x: hidden;">
								<div v-for="item in page['chat']" class="activity">
									<div class="date1" style="display: inline-block;padding-right:5px;">{{ $date(item.time, 'H:i') }}</div>
									<div style="display: inline;white-space:pre-wrap" v-html="item.message"></div>
								</div>
							</div>
						</th>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
	import PlayerInfo from '~/components/Page/Players/Info.vue'
	import Fleets from '~/components/Page/Overview/Feets.vue'
	import Clock from '~/components/Page/Overview/Clock.vue'
	import QueueRow from '~/components/Page/Overview/QueueRow.vue'
	import { sendMission } from '~/utils/fleet'
	import { storeToRefs } from 'pinia'
	import useStore from '~/store';
	import { definePageMeta, showError, useAsyncData, useHead, useRequestURL, useRoute, openAjaxPopupModal } from '#imports';
	import { useApiPost } from '~/composables/useApi';
	import { computed, watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Обзор',
	});

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	const store = useStore();
	const { user, planet } = storeToRefs(store);
	const { host } = useRequestURL();

	const userFiledsPercent = computed(() => {
		return Math.min(Math.floor(planet.value.field_used / planet.value.field_max * 100), 100);
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

	async function getDailyBonus () {
		const result = await useApiPost('/overview/daily')

		useStore().PAGE_LOAD(result)
	}

	function openPlayerPopup () {
		openAjaxPopupModal(PlayerInfo, '/players/'+user.value['id'])
	}
</script>