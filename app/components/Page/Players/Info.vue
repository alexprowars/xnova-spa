<template>
	<div class="page-players">
		<div class="page-players-main block">
			<div class="title">Информация об игроке</div>
			<div class="content">
				<div class="block-table page-players">
					<div class="grid grid-cols-6 gap-1.5 divide-x-0!">
						<div class="col-span-2 text-center flex flex-col gap-1.5">
							<div><img :src="item['avatar']" :alt="item['name']" width="100%"></div>
							<div v-if="user">
								<SendMessagePopup :title="$t('send_message')" :id="item['id']"/>
								<NuxtLink :to="'/friends/new/' + item['id']" title="Добавить в друзья">
									<span class='sprite skin_b'></span>
								</NuxtLink>
							</div>
						</div>
						<div class="col-span-3">
							<div class="">
								<div class="grid grid-cols-3 p-2">
									<div>Логин:</div>
									<div class="col-span-2">{{ item['name'] }}</div>
								</div>
								<div v-if="item['planet']" class="grid grid-cols-3 p-2">
									<div>Планета:</div>
									<div class="col-span-2">
										<NuxtLink :to="'/galaxy?galaxy=' + item['planet']['galaxy'] + '&system=' + item['planet']['system']" style="font-weight:normal">
											{{ item['planet']['name'] }} [{{ item['planet']['galaxy'] }}:{{ item['planet']['system'] }}:{{ item['planet']['planet'] }}]
										</NuxtLink>
									</div>
								</div>
								<div v-if="item['alliance']" class="grid grid-cols-3 p-2">
									<div>Альянс:</div>
									<div class="col-span-2">
										<NuxtLink :to="'/alliance/info/' + item['alliance']['id']">
											{{ item['alliance']['name'] }}
										</NuxtLink>
									</div>
								</div>
								<div class="grid grid-cols-3 p-2">
									<div>Пол:</div>
									<div class="col-span-2">{{ item['sex'] === 2 ? 'Женский' : 'Мужской' }}</div>
								</div>
							</div>
							<div v-if="item['race'] !== 0" class="p-2">
								<img :src="'/images/skin/race' + item['race'] + '.gif'" alt="">
							</div>
						</div>
						<div class="col-span-1 text-right pt-2">
							<img :src="'/images/ranks/m' + item['level']['mine'] + '.png'" alt="Промышленная отрасль" v-tooltip="'Промышленная отрасль'">
							<br>
							<img :src="'/images/ranks/f' + item['level']['raid'] + '.png'" alt="Военная отрасль" v-tooltip="'Военная отрасль'">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="item['stats']" class="page-players-stats block">
			<div class="title">Статистика игры</div>
			<div class="content">
				<div class="block-table text-center">
					<div class="grid grid-cols-3">
						<div class="c">&nbsp;</div>
						<div class="c">Очки</div>
						<div class="c">Место</div>
					</div>
					<div class="grid grid-cols-3">
						<div class="c">Постройки</div>
						<div class="th">{{ $formatNumber(item['stats']['build_points']) }}</div>
						<div class="th">{{ $formatNumber(item['stats']['build_rank']) }}</div>
					</div>
					<div class="grid grid-cols-3">
						<div class="c">Иследования</div>
						<div class="th">{{ $formatNumber(item['stats']['tech_points']) }}</div>
						<div class="th">{{ $formatNumber(item['stats']['tech_rank']) }}</div>
					</div>
					<div class="grid grid-cols-3">
						<div class="c">Флот</div>
						<div class="th">{{ $formatNumber(item['stats']['fleet_points']) }}</div>
						<div class="th">{{ $formatNumber(item['stats']['fleet_rank']) }}</div>
					</div>
					<div class="grid grid-cols-3">
						<div class="c">Оборона</div>
						<div class="th">{{ $formatNumber(item['stats']['defs_points']) }}</div>
						<div class="th">{{ $formatNumber(item['stats']['defs_rank']) }}</div>
					</div>
					<div class="grid grid-cols-3">
						<div class="c">Всего</div>
						<div class="th">{{ $formatNumber(item['stats']['total_points']) }}</div>
						<div class="th">{{ $formatNumber(item['stats']['total_rank']) }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-players-stats block">
			<div class="title">Статистика боёв</div>
			<div class="content">
				<div class="block-table text-center">
					<div class="grid grid-cols-3">
						<div class="c">&nbsp;</div>
						<div class="c">Сумма</div>
						<div class="c">Процент</div>
					</div>
					<div v-if="item['fights']['wons'] > 0" class="grid grid-cols-3">
						<div class="c">Победы</div>
						<div class="th"><b>{{ $formatNumber(item['fights']['wons']) }}</b></div>
						<div class="th">{{ Math.round((100 / (item['fights']['wons'] + item['fights']['loos'])) * item['fights']['wons']) }} %</div>
					</div>
					<div v-if="item['fights']['loos'] > 0" class="grid grid-cols-3">
						<div class="c">Поражения</div>
						<div class="th"><b>{{ $formatNumber(item['fights']['loos']) }}</b></div>
						<div class="th">{{ Math.round((100 / (item['fights']['wons'] + item['fights']['loos'])) * item['fights']['loos']) }} %</div>
					</div>
					<div class="grid grid-cols-3">
						<div class="c">Всего вылетов</div>
						<div class="th"><b>{{ $formatNumber(item['fights']['total']) }}</b></div>
						<div class="th">100 %</div>
					</div>
				</div>
			</div>
			<div v-if="item['about'].length" class="page-players-about block">
				<div class="content">
					<div class="block-table">
						<div class="grid">
							<div class="b">
								<TextViewer :text="item['about']"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { storeToRefs } from 'pinia';
	import useStore from '~/store';
	import SendMessagePopup from '~/components/Page/Messages/SendMessagePopup.vue';

	defineProps({
		item: {
			type: Object
		}
	});

	const { user } = storeToRefs(useStore());
</script>