<template>
	<div class="page-players">
		<div class="page-players-main block">
			<div class="title">Информация об игроке</div>
			<div class="content">
				<div class="block-table page-players">
					<div class="grid grid-cols-6 gap-1.5 !divide-x-0">
						<div class="col-span-2 text-center flex flex-col gap-1.5">
							<div><img :src="page['avatar']" :alt="page['username']" width="100%"></div>
							<div v-if="user">
								<SendMessagePopup :title="$t('send_message')" :id="page['id']"/>
								<NuxtLink :to="'/friends/new/'+page['id']+'/'" title="Добавить в друзья">
									<span class='sprite skin_b'></span>
								</NuxtLink>
							</div>
						</div>
						<div class="col-span-3">
							<div class="">
								<div class="grid grid-cols-3 p-2">
									<div>Логин:</div>
									<div class="col-span-2">{{ page['username'] }}</div>
								</div>
								<div class="grid grid-cols-3 p-2">
									<div>Планета:</div>
									<div class="col-span-2">
										<NuxtLink :to="'/galaxy/?galaxy='+page['galaxy']+'&system='+page['system']" style="font-weight:normal">
											{{ page['userplanet'] }} [{{ page['galaxy'] }}:{{ page['system'] }}:{{ page['planet'] }}]
										</NuxtLink>
									</div>
								</div>
								<div v-if="page['ally_id'] > 0" class="grid grid-cols-3 p-2">
									<div>Альянс:</div>
									<div class="col-span-2">
										<NuxtLink :to="'/alliance/info/'+page['ally_id']+'/'">
											{{ page['ally_name'] }}
										</NuxtLink>
									</div>
								</div>
								<div class="grid grid-cols-3 p-2">
									<div>Пол:</div>
									<div class="col-span-2">{{ page['sex'] === 2 ? 'Женский' : 'Мужской' }}</div>
								</div>
							</div>
							<div v-if="page['race'] !== 0" class="p-2">
								<img :src="'/images/skin/race'+page['race']+'.gif'" alt="">
							</div>
						</div>
						<div class="col-span-1 text-right pt-2">
							<img :src="'/images/ranks/m'+page['m']+'.png'" alt="Промышленная отрасль" title="Промышленная отрасль">
							<br>
							<img :src="'/images/ranks/f'+page['f']+'.png'" alt="Военная отрасль" title="Военная отрасль">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="page['stats']" class="page-players-stats block">
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
						<div class="th">{{ $formatNumber(page['stats']['build_points']) }}</div>
						<div class="th">{{ $formatNumber(page['stats']['build_rank']) }}</div>
					</div>
					<div class="grid grid-cols-3">
						<div class="c">Иследования</div>
						<div class="th">{{ $formatNumber(page['stats']['tech_points']) }}</div>
						<div class="th">{{ $formatNumber(page['stats']['tech_rank']) }}</div>
					</div>
					<div class="grid grid-cols-3">
						<div class="c">Флот</div>
						<div class="th">{{ $formatNumber(page['stats']['fleet_points']) }}</div>
						<div class="th">{{ $formatNumber(page['stats']['fleet_rank']) }}</div>
					</div>
					<div class="grid grid-cols-3">
						<div class="c">Оборона</div>
						<div class="th">{{ $formatNumber(page['stats']['defs_points']) }}</div>
						<div class="th">{{ $formatNumber(page['stats']['defs_rank']) }}</div>
					</div>
					<div class="grid grid-cols-3">
						<div class="c">Всего</div>
						<div class="th">{{ $formatNumber(page['stats']['total_points']) }}</div>
						<div class="th">{{ $formatNumber(page['stats']['total_rank']) }}</div>
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
					<div v-if="page['wons'] > 0" class="grid grid-cols-3">
						<div class="c">Победы</div>
						<div class="th"><b>{{ $formatNumber(page['wons']) }}</b></div>
						<div class="th">{{ Math.round((100 / (page['wons'] + page['loos'])) * page['wons']) }} %</div>
					</div>
					<div v-if="page['loos'] > 0" class="grid grid-cols-3">
						<div class="c">Поражения</div>
						<div class="th"><b>{{ $formatNumber(page['loos']) }}</b></div>
						<div class="th">{{ Math.round((100 / (page['wons'] + page['loos'])) * page['loos']) }} %</div>
					</div>
					<div class="grid grid-cols-3">
						<div class="c">Всего вылетов</div>
						<div class="th"><b>{{ $formatNumber(page['total']) }}</b></div>
						<div class="th">100 %</div>
					</div>
				</div>
			</div>
			<div v-if="page['about'].length" class="page-players-about block">
				<div class="content">
					<div class="block-table">
						<div class="grid">
							<div class="b">
								<TextViewer :text="page['about']"/>
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
		page: {
			type: Object
		}
	});

	const { user } = storeToRefs(useStore());
</script>