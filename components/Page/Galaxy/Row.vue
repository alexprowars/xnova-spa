<template>
	<tr class="planetRow">
		<th width="35">{{ planet }}</th>
		<th width="34" class="img">
			<Popper v-if="item && !item['p_delete']" hover>
				<template #content>
					<table width="240">
						<tbody>
							<tr>
								<td class="c" colspan="2">Планета {{ item['p_name'] }} [{{ galaxy }}:{{ system }}:{{ planet }}]</td>
							</tr>
							<tr>
								<th width="80">
									<img :src="'/images/planeten/small/s_'+item['p_image']+'.jpg'" height="75" width="75" alt="">
								</th>
								<th align="left">
									<div v-if="user['phalanx'] > 0">
										<a :href="'/phalanx/?galaxy='+galaxy+'&system='+system+'&planet='+planet+''" target="_blank">Фаланга</a>
									</div>

									<div v-if="item['u_id'] !== store['user']['id']">
										<NuxtLinkLocale :to="'/fleet/?galaxy='+galaxy+'&system='+system+'&planet='+planet+'&type='+item['p_type']+'&mission=1'">Атаковать</NuxtLinkLocale>
										<br>
										<NuxtLinkLocale :to="'/fleet/?galaxy='+galaxy+'&system='+system+'&planet='+planet+'&type='+item['p_type']+'&mission=5'">Удерживать</NuxtLinkLocale>
									</div>
									<div v-else>
										<NuxtLinkLocale v-if="item['u_id'] === store['user']['id']" :to="'/fleet/?galaxy='+galaxy+'&system='+system+'&planet='+planet+'&type='+item['p_type']+'&mission=4'">Оставить</NuxtLinkLocale>
									</div>
									<NuxtLinkLocale :to="'/fleet/?galaxy='+galaxy+'&system='+system+'&planet='+planet+'&type='+item['p_type']+'&mission=3'">Транспорт</NuxtLinkLocale>
								</th>
							</tr>
						</tbody>
					</table>
				</template>
				<img :src="'/images/planeten/small/s_'+item['p_image']+'.jpg'" width="34" height="34" alt="">
			</Popper>
		</th>
		<th>
			<div v-if="item && !item['p_delete']">
				<span v-if="item['p_active'] <= 10" class="star">(*)</span>
				<span v-else-if="item['p_active'] < 60" class="star">({{ Math.floor(item['p_active']) }})</span>
				<span :class="{negative: item['u_id'] === store['user']['id']}">{{ item['p_name'] }}</span>
			</div>
			<div v-else-if="item && item['p_delete']">
				Планета уничтожена
			</div>
		</th>
		<th class="img" style="white-space: nowrap;" width="34">
			<Popper v-if="item && !item['l_delete'] && item['l_id']" hover>
				<template #content>
					<table width="240">
						<tbody>
							<tr>
								<td class="c" colspan="2">
									Луна: {{ item['l_name'] }} [{{ galaxy }}:{{ system }}:{{ planet }}]
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
											<th>{{ $number(item['l_diameter']) }}</th>
										</tr>
										<tr>
											<th>Температура</th>
											<th>{{ item['l_temp'] }}</th>
										</tr>
										<tr>
											<td class="c" colspan="2">Действия</td>
										</tr>
										<tr>
											<th colspan="2" align="center">
												<div v-if="item['u_id'] !== store['user']['id']">
													<NuxtLinkLocale :to="'/fleet/?galaxy='+galaxy+'&system='+system+'&planet='+planet+'&type=3&mission=1'">Атаковать</NuxtLinkLocale>
													<br>
													<NuxtLinkLocale :to="'/fleet/?galaxy='+galaxy+'&system='+system+'&planet='+planet+'&type=3&mission=5'">Удерживать</NuxtLinkLocale>

													<div v-if="user['destroy'] > 0">
														<NuxtLinkLocale :to="'/fleet/?galaxy='+galaxy+'&system='+system+'&planet='+planet+'&type=3&mission=9'">Уничтожить</NuxtLinkLocale>
													</div>
												</div>
												<div v-else>
													<NuxtLinkLocale :to="'/fleet/?galaxy='+galaxy+'&system='+system+'&planet='+planet+'&type=3&mission=4'">Оставить</NuxtLinkLocale>
												</div>
												<NuxtLinkLocale :to="'/fleet/?galaxy='+galaxy+'&system='+system+'&planet='+planet+'&type=3&mission=3'">Транспорт</NuxtLinkLocale>
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
			<span v-if="item && item['l_delete'] && item['l_id']">~</span>
		</th>
		<th :class="[debris_class]" width="30">
			<Popper v-if="item && (item['p_metal'] > 0 || item['p_crystal'] > 0)" hover>
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
										<tr>
											<td class="c" colspan="2">Ресурсы</td>
										</tr>
										<tr v-if="item['p_metal'] > 0">
											<th>Металл</th>
											<th>{{ item['p_metal'] }}</th>
										</tr>
										<tr v-if="item['p_crystal'] > 0">
											<th>Кристалл</th>
											<th>{{ item['p_crystal'] }}</th>
										</tr>
										<tr v-if="user['recycler'] > 0">
											<th colspan="2" align="left">
												<a @click.prevent="debris">Собрать</a>
											</th>
										</tr>
										<tr>
											<th colspan="2" align="left">
												<NuxtLinkLocale :to="'/fleet/?galaxy='+galaxy+'&system='+system+'&planet='+planet+'&type=2&mission=8'">Отправить флот</NuxtLinkLocale>
											</th>
										</tr>
									</table>
								</th>
							</tr>
						</tbody>
					</table>
				</template>
				<img src="/images/planeten/debris.jpg" height="22" width="22" alt="">
			</Popper>
		</th>
		<th width="180">
			<Popper v-if="item && !item['p_delete']" hover>
				<template #content>
					<table width="280">
						<tbody>
							<tr>
								<td class="c" colspan="2">Игрок {{ item['u_name'] }}<template v-if="item['s_rank'] > 0">, место {{ item['s_rank'] }}</template></td>
							</tr>
							<tr>
								<td v-if="user_avatar !== ''" width="122" height="126" rowspan="3" valign="middle" class="c" :style="'background:url('+user_avatar+') 50% 50% no-repeat;background-size:cover;'"></td>
								<td v-else width="122" height="126" rowspan="3" valign="middle" class="c">нет<br>аватара</td>

								<th v-if="item['u_id'] !== store['user']['id']">
									<NuxtLinkLocale :to="'/messages/write/'+item['u_id']+'/'">Послать сообщение</NuxtLinkLocale>
								</th>
							</tr>
							<tr v-if="item['u_id'] !== store['user']['id']">
								<th>
									<NuxtLinkLocale :to="'/buddy/new/'+item['u_id']+'/'">Добавить в друзья</NuxtLinkLocale>
								</th>
							</tr>
							<tr>
								<th valign="top">
									<NuxtLinkLocale :to="'/stat/?view=players&range='+stat_page+'&pid='+item['u_id']">Статистика</NuxtLinkLocale>
								</th>
							</tr>
						</tbody>
					</table>
				</template>
				<div>
					<span :class="[user_status_class]">{{ item['u_name'] }}</span>

					<span v-if="user_status" :class="[user_status_class]">
						<font color="white">(</font><span v-if="user_status === 'UG' || user_status === 'G'"><NuxtLinkLocale to="/banned/" :class="[user_status_class]">{{ user_status }}</NuxtLinkLocale></span><span v-else="">{{ user_status }}</span><font color="white">)</font>
					</span>

					<span v-if="item['u_admin'] === 3" class="negative">A</span>
					<span v-if="item['u_admin'] === 2" class="neutral">SGo</span>
					<span v-if="item['u_admin'] === 1" class="positive">Go</span>
				</div>
			</Popper>
		</th>
		<th width="20">
			<NuxtLinkLocale v-if="item && !item.delete && item['u_race']" :to="'/info/70'+item['u_race']+'/'">
				<img :src="'/images/skin/race'+item['u_race']+'.gif'" width="20" height="20" :alt="races[item['u_race']]" :title="races[item['u_race']]">
			</NuxtLinkLocale>
		</th>
		<th width="100">
			<Popper v-if="item && !item.delete && item['a_id']" hover>
				<template #content>
					<table width="240">
						<tbody>
							<tr>
								<td class="c">
									Альянс {{ item['a_name'] }} с {{ item['a_members'] }} членами
								</td>
							</tr>
							<tr>
								<th>
									<NuxtLinkLocale :to="'/alliance/info/'+item['a_id']+'/'">Информация</NuxtLinkLocale>
								</th>
							</tr>
							<tr>
								<th>
									<NuxtLinkLocale to="/stat/?view=alliance&start=0">Статистика</NuxtLinkLocale>
								</th>
							</tr>
							<tr v-if="item['a_web'] && item['a_web'].length">
								<th>
									<a :href="item['a_web']" target="_blank">Сайт альянса</a>
								</th>
							</tr>
						</tbody>
					</table>
				</template>
				<span :class="{allymember: store['user']['alliance']['id'] === item['a_id']}">{{ item['a_tag'] }}</span>
			</Popper>

			<div v-if="store['user']['alliance']['id'] !== item['a_id']">
				<small v-if="item['d_type'] === 0">[нейтральное]</small>
				<small v-if="item['d_type'] === 1" class="neutral">[перемирие]</small>
				<small v-if="item['d_type'] === 2" class="positive">[мир]</small>
				<small v-if="item['d_type'] === 3" class="negative">[война]</small>
			</div>
		</th>

		<th class="actions" style="white-space: nowrap;" width="135">
			<template v-if="item && item['u_id'] !== store['user']['id'] && !item['p_delete']">
				<PopupLink :title="item['u_name']+': отправить сообщение'" :to="'/messages/write/'+item['u_id']+'/'" :width="680">
					<span class="sprite skin_m"></span>
				</PopupLink>
				<NuxtLinkLocale :to="'/buddy/new/'+item['u_id']+'/'" title="Добавить в друзья">
					<span class="sprite skin_b"></span>
				</NuxtLinkLocale>

				<a v-if="user['missile']" @click.prevent="$emit('sendMissile')" title="Ракетная атака">
					<span class="sprite skin_r"></span>
				</a>

				<Popper v-if="user['spy_sonde'] && !item['u_vacation']" hover>
					<template #content>
						<center>
							<input type="text" v-model.number="spyCount">
							<br>
							<input type="button" @click.prevent="spy(item['p_type'], $event)" value="Отправить на планету">
							<br>
							<input v-if="!item['l_delete'] && item['l_id']" type="button" @click.prevent="spy(3, $event)" value="Отправить на луну">
						</center>
					</template>
					<span class="sprite skin_e"></span>
				</Popper>

				<NuxtLinkLocale :to="'/players/'+item['u_id']+'/'" title="Информация об игроке">
					<span class="sprite skin_s"></span>
				</NuxtLinkLocale>
				<NuxtLinkLocale :to="'/fleet/shortcut/add/?galaxy='+galaxy+'&system='+system+'&planet='+planet+'&type='+item['p_type']+''" title="Добавить в закладки">
					<span class="sprite skin_z"></span>
				</NuxtLinkLocale>
			</template>

			<NuxtLinkLocale v-if="!item && user['colonizer']" :to="'/fleet/?galaxy='+galaxy+'&system='+system+'&planet='+planet+'&mission=7'" title="Колонизация">
				<span class="sprite skin_e"></span>
			</NuxtLinkLocale>
		</th>
	</tr>
</template>

<script setup>
	import { sendMission } from "~/utils/fleet";
	import { computed, ref } from 'vue';
	import useStore from '~/store';
	import Popper from 'vue3-popper';

	const props = defineProps({
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
		item: {},
		user: {
			type: Object
		},
	});

	const store = useStore();

	const races = ref(['', 'Конфедерация', 'Бионики', 'Сайлоны', 'Древние']);
	const spyCount = ref(props.user['spy']);

	const user_status = computed(() => {
		let CurrentPoints 	= props.user['stat_points'];
		let RowUserPoints 	= props.item['s_points'];

		if (!RowUserPoints)
               RowUserPoints = 0;

		if (props.item['u_ban'] > store.getServerTime && props.item['u_vacation'] > 0)
			return "UG";
		else if (props.item['u_ban'] > store.getServerTime)
			return "G";
		else if (props.item['u_vacation'] > 0)
			return "U";
		else if (props.item['u_online'] === 1)
			return "i";
		else if (props.item['u_online'] === 2)
			return "iI";
		else if (RowUserPoints * 5 < CurrentPoints || RowUserPoints <= 5000)
			return "N";
		else if (RowUserPoints > CurrentPoints * 5)
			return "S";
		else
			return '';
	})

	const user_status_class = computed(() => {
		if (user_status.value === 'UG')
			return "vacation";
		else if (user_status.value === 'G')
			return "banned";
		else if (user_status.value === 'U')
			return "vacation";
		else if (user_status.value === 'i')
			return "inactive";
		else if (user_status.value === 'iI')
			return "longinactive";
		else if (user_status.value === 'N')
			return "noob";
		else if (user_status.value === 'S')
			return "strong";

		return '';
	});

	const debris_class = computed(() => {
		if (!props.item)
			return '';

		let debris = parseInt(props.item['p_metal']) + parseInt(props.item['p_crystal']);

		if (debris >= 10000000)
			return 'debris_100'
		else if (debris >= 1000000)
			return 'debris_50'
		else if (debris >= 100000)
			return 'debris_0'

		return '';
	});

	const user_avatar = computed(() => {
		if (!props.item)
			return '';

		if (props.item['u_image'].length > 0)
			return props.item['u_image'];
		else if (props.item['u_avatar'] > 0)
		{
			if (props.item['u_avatar'] !== 99)
				return '/images/faces/'+props.item['u_sex']+'/'+props.item['u_avatar']+'s.png';
			else
				return '/avatars/upload_'+props.item['u_id']+'.jpg';
		}

		return '';
	});

	const stat_page = computed(() => {
		if (!props.item || props.item['s_rank'] < 100)
			return 1;

		return (Math.floor(props.item['s_rank'] / 100 ) * 100) + 1;
	})

	function spy (planet_type, event) {
		event.target.setAttribute('disabled', 'disabled')

		sendMission(6, props.galaxy, props.system, props.planet, planet_type, spyCount.value).then(() => {
			event.target.setAttribute('disabled', '')
		});
	}

	function debris () {
		sendMission(8, props.galaxy, props.system, props.planet, 2, 0)
	}
</script>