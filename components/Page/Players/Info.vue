<template>
	<div class="page-players">
		<div class="page-players-main block">
			<div class="title">Информация об игроке</div>
			<div class="content border-0">
				<div class="block-table page-players">
					<div class="row border-0">
						<div class="col-4 text-center">
							<img :src="page['avatar']" :alt="page['username']" width="100%">
							<div v-if="user">
								<PopupLink :to="'/messages/write/'+page['id']+'/'" :width="680" :title="page['username']+': отправить сообщение'">
									<span class="sprite skin_m"></span>
								</PopupLink>&nbsp;
								<NuxtLinkLocale :to="'/buddy/new/'+page['id']+'/'" title="Добавить в друзья">
									<span class='sprite skin_b'></span>
								</NuxtLinkLocale>
							</div>
						</div>
						<div class="col-6">
							<div class="block-table">
								<div class="row">
									<div class="col-4 text-start p-a-0">Логин:</div>
									<div class="col-8 p-a-0">{{ page['username'] }}</div>
								</div>
								<div class="row">
									<div class="col-4 text-start p-a-0">Планета:</div>
									<div class="col-8 p-a-0">
										<NuxtLinkLocale :to="'/galaxy/?galaxy='+page['galaxy']+'&system='+page['system']" style="font-weight:normal">
											{{ page['userplanet'] }} [{{ page['galaxy'] }}:{{ page['system'] }}:{{ page['planet'] }}]
										</NuxtLinkLocale>
									</div>
								</div>
								<div v-if="page['ally_id'] > 0" class="row">
									<div class="col-4 text-start p-a-0">Альянс:</div>
									<div class="col-8 p-a-0">
										<NuxtLinkLocale :to="'/alliance/info/'+page['ally_id']+'/'">
											{{ page['ally_name'] }}
										</NuxtLinkLocale>
									</div>
								</div>
								<div class="row">
									<div class="col-4 text-start p-a-0">Пол:</div>
									<div class="col-8 p-a-0">{{ page['sex'] === 2 ? 'Женский' : 'Мужской' }}</div>
								</div>
							</div>
							<div v-if="page['race'] !== 0">
								<br><img :src="'/images/skin/race'+page['race']+'.gif'" alt="">
							</div>
						</div>
						<div class="col-2">
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
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="c col">&nbsp;</div>
						<div class="c col">Очки</div>
						<div class="c col">Место</div>
					</div>
					<div class="row">
						<div class="c col">Постройки</div>
						<div class="th col">{{ $number(page['stats']['build_points']) }}</div>
						<div class="th col">{{ $number(page['stats']['build_rank']) }}</div>
					</div>
					<div class="row">
						<div class="c col">Иследования</div>
						<div class="th col">{{ $number(page['stats']['tech_points']) }}</div>
						<div class="th col">{{ $number(page['stats']['tech_rank']) }}</div>
					</div>
					<div class="row">
						<div class="c col">Флот</div>
						<div class="th col">{{ $number(page['stats']['fleet_points']) }}</div>
						<div class="th col">{{ $number(page['stats']['fleet_rank']) }}</div>
					</div>
					<div class="row">
						<div class="c col">Оборона</div>
						<div class="th col">{{ $number(page['stats']['defs_points']) }}</div>
						<div class="th col">{{ $number(page['stats']['defs_rank']) }}</div>
					</div>
					<div class="row">
						<div class="c col">Всего</div>
						<div class="th col">{{ $number(page['stats']['total_points']) }}</div>
						<div class="th col">{{ $number(page['stats']['total_rank']) }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-players-stats block">
			<div class="title">Статистика боёв</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="c col">&nbsp;</div>
						<div class="c col">Сумма</div>
						<div class="c col">Процент</div>
					</div>
					<div v-if="page['wons'] > 0" class="row">
						<div class="c col">Победы</div>
						<div class="th col"><b>{{ $number(page['wons']) }}</b></div>
						<div class="th col">{{ Math.round((100 / (page['wons'] + page['loos'])) * page['wons']) }} %</div>
					</div>
					<div v-if="page['loos'] > 0" class="row">
						<div class="c col">Поражения</div>
						<div class="th col"><b>{{ $number(page['loos']) }}</b></div>
						<div class="th col">{{ Math.round((100 / (page['wons'] + page['loos'])) * page['loos']) }} %</div>
					</div>
					<div class="row">
						<div class="c col">Всего вылетов</div>
						<div class="th col"><b>{{ $number(page['total']) }}</b></div>
						<div class="th col">100 %</div>
					</div>
				</div>
			</div>
			<div v-if="page['about'].length" class="page-players-about block">
				<div class="content border-0">
					<div class="block-table">
						<div class="row">
							<div class="b col">
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

	defineProps({
		page: {
			type: Object
		}
	});

	const { user } = storeToRefs(useStore());
</script>