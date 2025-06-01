<template>
	<tr class="planetRow">
		<th>{{ planet }}</th>
		<th class="img">
			<Popper v-if="item && !item['planet']['destruyed']">
				<template #content>
					<table width="240">
						<tbody>
							<tr>
								<td class="c" colspan="2">Планета {{ item['planet']['name'] }} [{{ galaxy }}:{{ system }}:{{ planet }}]</td>
							</tr>
							<tr>
								<th width="80">
									<img :src="'/images/planeten/small/s_' + item['planet']['image'] + '.jpg'" height="75" width="75" alt="">
								</th>
								<th v-if="!isVacation" align="left">
									<div v-if="user['phalanx'] > 0">
										<a :href="'/phalanx/?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet" target="_blank">Фаланга</a>
									</div>

									<div v-if="item.user['id'] !== currentUser['id']">
										<NuxtLink :to="'/fleet/?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet + '&type=' + item['planet']['type'] + '&mission=1'">Атаковать</NuxtLink>
										<br>
										<NuxtLink :to="'/fleet/?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet + '&type=' + item['planet']['type'] + '&mission=5'">Удерживать</NuxtLink>
									</div>
									<div v-else>
										<NuxtLink v-if="item.user['id'] === currentUser['id']" :to="'/fleet/?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet + '&type=' + item['planet']['type'] + '&mission=4'">Оставить</NuxtLink>
									</div>
									<NuxtLink :to="'/fleet/?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet + '&type=' + item['planet']['type'] + '&mission=3'">Транспорт</NuxtLink>
								</th>
							</tr>
						</tbody>
					</table>
				</template>
				<img :src="'/images/planeten/small/s_' + item['planet']['image'] + '.jpg'" width="34" height="34" alt="">
			</Popper>
		</th>
		<th>
			<div v-if="item && !item['planet']['destruyed']">
				<span v-if="item['planet']['active'] <= 10" class="star">(*)</span>
				<span v-else-if="item['planet']['active'] < 60" class="star">({{ Math.floor(item['planet']['active']) }})</span>
				<span :class="{ negative: item.user['id'] === currentUser['id'] }">{{ item['planet']['name'] }}</span>
			</div>
			<div v-else-if="item && item['planet']['destruyed']">
				Планета уничтожена
			</div>
		</th>
		<th class="img" style="white-space: nowrap;">
			<Popper v-if="item && item['moon'] && !item['moon']['destruyed']">
				<template #content>
					<table width="240">
						<tbody>
							<tr>
								<td class="c" colspan="2">
									Луна: {{ item['moon']['name'] }} [{{ galaxy }}:{{ system }}:{{ planet }}]
								</td>
							</tr>
							<tr>
								<th width="80">
									<img src="/images/planeten/mond.jpg" height="75" width="75" alt="">
								</th>
								<th>
									<table class="table">
										<tbody>
										<tr>
											<td class="c" colspan="2">Характеристики</td>
										</tr>
										<tr>
											<th>Диаметр</th>
											<th>{{ $formatNumber(item['moon']['diameter']) }}</th>
										</tr>
										<tr>
											<th>Температура</th>
											<th>{{ item['moon']['temp'] }}</th>
										</tr>
										<tr>
											<td class="c" colspan="2">Действия</td>
										</tr>
										<tr v-if="!isVacation">
											<th colspan="2" align="center">
												<div v-if="item.user['id'] !== currentUser['id']">
													<NuxtLink :to="'/fleet/?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet + '&type=3&mission=1'">Атаковать</NuxtLink>
													<br>
													<NuxtLink :to="'/fleet/?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet + '&type=3&mission=5'">Удерживать</NuxtLink>

													<div v-if="planet['units']['dearth_star'] > 0">
														<NuxtLink :to="'/fleet/?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet + '&type=3&mission=9'">Уничтожить</NuxtLink>
													</div>
												</div>
												<div v-else>
													<NuxtLink :to="'/fleet/?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet + '&type=3&mission=4'">Оставить</NuxtLink>
												</div>
												<NuxtLink :to="'/fleet/?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet + '&type=3&mission=3'">Транспорт</NuxtLink>
											</th>
										</tr>
										</tbody>
									</table>
								</th>
							</tr>
						</tbody>
					</table>
				</template>
				<img src="/images/planeten/small/s_mond.jpg" height="34" width="34" alt="">
			</Popper>
			<span v-if="item && item['moon'] && item['moon']['destruyed']">~</span>
		</th>
		<th :class="[debris_class]">
			<Popper v-if="item && (item.debris.metal || item.debris.crystal)">
				<template #content>
					<table width="240">
						<tbody>
							<tr>
								<td class="c" colspan="2">
									Обломки: [{{ galaxy }}:{{ system }}:{{ planet }}]
								</td>
							</tr>
							<tr>
								<th width="80">
									<img src="/images/planeten/debris.jpg" height="75" width="75" alt="">
								</th>
								<th>
									<table class="table">
										<tbody>
										<tr>
											<td class="c" colspan="2">Ресурсы</td>
										</tr>
										<tr v-if="item.debris.metal">
											<th>Металл</th>
											<th>{{ item.debris.metal }}</th>
										</tr>
										<tr v-if="item.debris.crystal">
											<th>Кристалл</th>
											<th>{{ item.debris.crystal }}</th>
										</tr>
										<tr v-if="!isVacation && currentPlanet['units']['recycler'] > 0">
											<th colspan="2" align="left">
												<a @click.prevent="debris">Собрать</a>
											</th>
										</tr>
										<tr v-if="!isVacation">
											<th colspan="2" align="left">
												<NuxtLink :to="'/fleet/?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet + '&type=2&mission=8'">Отправить флот</NuxtLink>
											</th>
										</tr>
										</tbody>
									</table>
								</th>
							</tr>
						</tbody>
					</table>
				</template>
				<img src="/images/planeten/debris.jpg" height="22" width="22" alt="">
			</Popper>
		</th>
		<th>
			<Popper v-if="item && item.user && !item['planet']['destruyed']">
				<template #content>
					<table width="280">
						<tbody>
							<tr>
								<td class="c" colspan="2">Игрок {{ item.user['name'] }}<template v-if="item.user['stats'] && item.user['stats']['rank'] > 0">, место {{ item.user['stats']['rank'] }}</template></td>
							</tr>
							<tr>
								<td v-if="user_avatar" width="122" height="126" rowspan="3" valign="middle" class="c" :style="'background:url(' + user_avatar + ') 50% 50% no-repeat;background-size:cover;'"></td>
								<td v-else width="122" height="126" rowspan="3" valign="middle" class="c">нет<br>аватара</td>

								<th v-if="item.user['id'] !== currentUser['id']">
									<NuxtLink :to="'/messages/write/' + item.user['id'] + '/'">Послать сообщение</NuxtLink>
								</th>
							</tr>
							<tr v-if="item.user['id'] !== currentUser['id']">
								<th>
									<NuxtLink :to="'/friends/new/' + item.user['id'] + '/'">Добавить в друзья</NuxtLink>
								</th>
							</tr>
							<tr>
								<th valign="top">
									<NuxtLink :to="'/stat?range=' + stat_page + '&id=' + item.user['id']">Статистика</NuxtLink>
								</th>
							</tr>
						</tbody>
					</table>
				</template>
				<div>
					<span :class="[user_status_class]">{{ item.user['name'] }}</span>

					<span v-if="user_status" :class="[user_status_class]">
						<span style="color: white">(</span><span v-if="user_status === 'UG' || user_status === 'G'"><NuxtLink to="/blocked" :class="[user_status_class]">{{ user_status }}</NuxtLink></span><span v-else>{{ user_status }}</span><span style="color: white">)</span>
					</span>

					<span v-if="item.user['role'] === 'admin'" class="negative">A</span>
					<span v-if="item.user['role'] === 'super-operator'" class="neutral">SGo</span>
					<span v-if="item.user['role'] === 'operator'" class="positive">Go</span>
				</div>
			</Popper>
		</th>
		<th>
			<NuxtLink v-if="item && !item.delete && item.user['race']" :to="'/info/70' + item.user['race']">
				<img :src="'/images/skin/race' + item.user['race'] + '.gif'" width="20" height="20" :alt="$t('races.' + item.user['race'])" :title="$t('races.' + item.user['race'])">
			</NuxtLink>
		</th>
		<th>
			<Popper v-if="item && !item['planet']['destruyed'] && item['alliance']">
				<template #content>
					<table width="240">
						<tbody>
							<tr>
								<td class="c">
									Альянс {{ item['alliance']['name'] }} с {{ item['alliance']['members'] }} членами
								</td>
							</tr>
							<tr>
								<th>
									<NuxtLink :to="'/alliance/info/' + item['alliance']['id'] + '/'">Информация</NuxtLink>
								</th>
							</tr>
							<tr>
								<th>
									<NuxtLink to="/stat/?view=alliance&start=0">Статистика</NuxtLink>
								</th>
							</tr>
							<tr v-if="item['alliance']['web'] && item['alliance']['web'].length">
								<th>
									<a :href="item['alliance']['web']" target="_blank">Сайт альянса</a>
								</th>
							</tr>
						</tbody>
					</table>
				</template>
				<span :class="{ allymember: currentUser['alliance']?.id === item['alliance']['id'] }">{{ item['alliance']['tag'] }}</span>
			</Popper>

			<div v-if="item && item['alliance'] && currentUser['alliance']?.id !== item['alliance']['id']">
				<small v-if="item['alliance']['diplomacy'] === 0">[нейтральное]</small>
				<small v-if="item['alliance']['diplomacy'] === 1" class="neutral">[перемирие]</small>
				<small v-if="item['alliance']['diplomacy'] === 2" class="positive">[мир]</small>
				<small v-if="item['alliance']['diplomacy'] === 3" class="negative">[война]</small>
			</div>
		</th>
		<th style="white-space: nowrap;">
			<div class="actions">
				<template v-if="item && item.user['id'] !== currentUser['id'] && !item['planet']['destruyed']">
					<SendMessagePopup :title="item.user['name']+': отправить сообщение'" :id="item.user['id']"/>
					<NuxtLink :to="'/friends/new/' + item.user['id']" title="Добавить в друзья">
						<span class="sprite skin_b"></span>
					</NuxtLink>

					<a v-if="!isVacation && user['missile']" @click.prevent="$emit('sendMissile')" title="Ракетная атака">
						<span class="sprite skin_r"></span>
					</a>

					<Popper v-if="!isVacation && currentPlanet['units']['spy_sonde'] && !item.user['vacation']">
						<template #content>
							<div class="text-center">
								<input type="text" v-model.number="spyCount">
								<br>
								<input type="button" @click.prevent="spy(item['planet']['type'], $event)" value="Отправить на планету">
								<br>
								<input v-if="item['moon'] && !item['moon']['destruyed']" type="button" @click.prevent="spy(3, $event)" value="Отправить на луну">
							</div>
						</template>
						<span class="sprite skin_e"></span>
					</Popper>

					<NuxtLink :to="'/players/' + item.user['id']" title="Информация об игроке">
						<span class="sprite skin_s"></span>
					</NuxtLink>
					<NuxtLink :to="'/fleet/shortcut/add/?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet + '&type=' + item['planet']['type']" title="Добавить в закладки">
						<span class="sprite skin_z"></span>
					</NuxtLink>
				</template>

				<NuxtLink v-if="!isVacation && !item && currentPlanet['units']['colonizer']" :to="'/fleet?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet + '&mission=7'" title="Колонизация">
					<span class="sprite skin_e"></span>
				</NuxtLink>
			</div>
		</th>
	</tr>
</template>

<script setup>
	import SendMessagePopup from '~/components/Page/Messages/SendMessagePopup.vue';
	import { sendMission } from '~/utils/fleet';
	import { computed, ref } from 'vue';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';
	import dayjs from 'dayjs';

	const {
		/** @type { Number } */
		galaxy,
		/** @type { Number } */
		system,
		/** @type { Number } */
		planet,
		/** @type {{ id: Number, position, planet: Object, debris: { metal: Number, crystal: Number }, moon: Object, user: Object, alliance: Object }} */
		item
	} = defineProps({
		galaxy: {
			type: Number,
			default: 1
		},
		system: {
			type: Number,
			default: 1
		},
		planet: {
			type: Number,
			default: 1
		},
		item: {
			type: Object,
			default: null,
		},
		user: {
			type: Object,
		},
	});

	const store = useStore();
	const { user: currentUser, isVacation, planet: currentPlanet } = storeToRefs(store);
	const spyCount = ref(parseInt(currentUser.value['options']['spy']) || 1);

	const user_status = computed(() => {
		if (!item.user) {
			return '';
		}

		let CurrentPoints = currentUser.value['points']['total'] || 0;
		let RowUserPoints = item.user?.['stats']?.['points'] || 0;

		if (!RowUserPoints) {
			RowUserPoints = 0;
		}

		if (item.user['blocked'] && dayjs(item.user['blocked']).diff() > 0) {
			if (item.user['vacation'] > 0) {
				return 'UG';
			} else {
				return 'G';
			}
		} else if (item.user['vacation'] > 0)
			return 'U';
		else if (item.user['online'] === 1) {
			return 'i';
		} else if (item.user['online'] === 2) {
			return 'iI';
		} else if (RowUserPoints * 5 < CurrentPoints || RowUserPoints <= 5000) {
			return 'N';
		} else if (RowUserPoints > CurrentPoints * 5) {
			return 'S';
		} else {
			return '';
		}
	})

	const user_status_class = computed(() => {
		if (user_status.value === 'UG') {
			return 'vacation';
		} else if (user_status.value === 'G') {
			return 'blocked';
		} else if (user_status.value === 'U') {
			return 'vacation';
		} else if (user_status.value === 'i') {
			return 'inactive';
		} else if (user_status.value === 'iI') {
			return 'longinactive';
		} else if (user_status.value === 'N') {
			return 'noob';
		} else if (user_status.value === 'S') {
			return 'strong';
		}

		return '';
	});

	const debris_class = computed(() => {
		if (!item) {
			return '';
		}

		let debris = parseInt(item.debris.metal) + parseInt(item.debris.crystal);

		if (debris >= 10000000) {
			return 'debris_100';
		} else if (debris >= 1000000) {
			return 'debris_50';
		} else if (debris >= 100000) {
			return 'debris_0';
		}

		return '';
	});

	const user_avatar = computed(() => {
		if (!item || !item.user) {
			return '';
		}

		if (item.user['image']) {
			return item.user['image'];
		} else if (item.user['avatar']) {
			if (item.user['avatar'] !== 99) {
				return '/images/faces/' + item.user['sex'] + '/' + item.user['avatar'] + 's.png';
			} else {
				return '/avatars/upload_' + item.user['id'] + '.jpg';
			}
		}

		return '';
	});

	const stat_page = computed(() => {
		if (!item || !item?.user?.stats || item.user.stats.rank < 100) {
			return 1;
		}

		return (Math.floor(item.user.stats.rank / 100 ) * 100) + 1;
	})

	async function spy (planet_type, event) {
		event.target.setAttribute('disabled', 'disabled')

		await sendMission(6, galaxy, system, planet, planet_type, spyCount.value);

		event.target.setAttribute('disabled', '');
	}

	function debris () {
		sendMission(8, galaxy, system, planet, 2, 0);
	}
</script>