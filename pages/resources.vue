<template>
	<div class="page-resources">
		<div class="block-table">
			<div class="row">
				<div class="col-5 c">Уровень производства</div>
				<div class="col-2 th">{{ page['production_level'] }}%</div>
				<div class="col-5 th">
					<ResourcesBar :value="page['production_level']" :reverse="true"></ResourcesBar>
				</div>
			</div>
			<div class="row">
				<div class="col-5 c">
					<NuxtLinkLocale to="/info/113/">{{ $t('tech.113') }}</NuxtLinkLocale>
				</div>
				<div class="col-2 th">
					{{ page['energy_tech'] }} ур.
				</div>
				<div class="col-5 th"></div>
			</div>
		</div>

		<div class="separator"></div>

		<div class="block">
			<div class="title text-center">
				Управление шахтами и энергетикой
			</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="col col-sm-6 th">
							<NuxtLinkLocale to="/resources/?production&active=Y" class="button">
								Включить на всех<br>планетах
							</NuxtLinkLocale>
						</div>
						<div class="col col-sm-6 th">
							<NuxtLinkLocale to="/resources/?production&active=N" class="button">
								Выключить на всех<br>планетах
							</NuxtLinkLocale>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="block">
			<div class="title text-center">
				Производство на планете "{{ planet['name'] }}"
			</div>
			<div class="content border-0">
				<div class="table-responsive">
					<RouterForm action="/resources/">
						<table class="table">
							<tbody>
								<tr>
									<th width="200"></th>
									<th>Ур.</th>
									<th>Бонус</th>
									<th><InfoPopup :id="1" :title="$t('tech.1')">Металл</InfoPopup></th>
									<th><InfoPopup :id="2" :title="$t('tech.2')">Кристалл</InfoPopup></th>
									<th><InfoPopup :id="3" :title="$t('tech.3')">Дейтерий</InfoPopup></th>
									<th><InfoPopup :id="4" :title="$t('tech.4')">Энергия</InfoPopup></th>
									<th width="100">КПД</th>
								</tr>
								<tr>
									<th class="text-start" nowrap>Базовое производство</th>
									<td class="k">-</td>
									<td class="k">-</td>
									<td v-for="res in page['resources']" class="k">{{ page['production'][res]['basic'] }}</td>
									<td class="k">{{ page['production']['energy']['basic'] }}</td>
									<td class="k">100%</td>
								</tr>
								<ResourcesRow v-for="(item, index) in page['items']" :key="index" :item="item" :resources="page['resources']"/>
								<tr>
									<th colspan="2">Вместимость:</th>
									<th>{{ page['bonus_h'] }}%</th>
									<td v-for="res in page['resources']" class="k" v-once>
										<span :class="[(page['production'][res]['capacity'] > planet['resources'][res]['value']) ? 'positive' : 'negative']">
											{{ $number(page['production'][res]['capacity'] / 1000) }} k
										</span>
									</td>
									<td class="k">
										<font color="#00ff00">{{ $number(page['production']['energy']['capacity']) }}</font>
									</td>
									<td class="k">
										<input name="action" value="Пересчитать" type="submit">
									</td>
								</tr>
								<tr>
									<th colspan="3">Сумма:</th>
									<td v-for="res in page['resources']" class="k">
										<Colored :value="page['production'][res]['total']"></Colored>
									</td>
									<td class="k">{{ $number(page['production']['energy']['total']) }}</td>
								</tr>
							</tbody>
						</table>
					</RouterForm>
				</div>
			</div>
		</div>

		<div class="block">
			<div class="title text-center">
				Информация о производстве
			</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="col-2 th">&nbsp;</div>
						<div class="col-2 th">Час</div>
						<div class="col-2 th">День</div>
						<div class="col-3 th">Неделя</div>
						<div class="col-3 th">Месяц</div>
					</div>
					<div class="row" v-for="res in page['resources']">
						<div class="col-2 th">
							{{ $t('resources.'+res) }}
						</div>
						<div class="col-2 th">
							<Colored :value="page['production'][res]['production']"></Colored>
						</div>
						<div class="col-2 th">
							<Colored :value="page['production'][res]['production'] * 24"></Colored>
						</div>
						<div class="col-3 th">
							<Colored :value="page['production'][res]['production'] * 24 * 7"></Colored>
						</div>
						<div class="col-3 th">
							<Colored :value="page['production'][res]['production'] * 24 * 7 * 30"></Colored>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="block">
			<div class="title text-center">
				Статус хранилища
			</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row" v-for="res in page['resources']">
						<div class="col-2 th">
							{{ $t('resources.'+res) }}
						</div>
						<div class="col-1 th">
							{{ page['production'][res]['storage'] }}%
						</div>
						<div class="col-9 th">
							<ResourcesBar :value="Math.min(100, Math.max(0, page['production'][res]['storage']))"></ResourcesBar>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="page['buy_form']['visible']" class="block">
			<div class="title text-center">
				Покупка ресурсов (8 ч. выработка ресурсов)
			</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="col-4 th">
							<span v-if="!page['buy_form']['time']">
								<a @click.prevent="buyResources" class="button">Купить за 10 кредитов</a>
							</span>
							<span v-else>
								Следующая покупка через
								<br>
								{{ $time(page['buy_form']['time']) }}
							</span>
						</div>
						<div class="col-8 th middle">
							<div>
								Вы можете купить:
								<Colored :value="page['buy_form']['metal']"></Colored> металла,
								<Colored :value="page['buy_form']['crystal']"></Colored> кристалла,
								<Colored :value="page['buy_form']['deuterium']"></Colored> дейтерия
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import ResourcesBar from '~/components/Page/Resources/Bar.vue';
	import ResourcesRow from '~/components/Page/Resources/Row.vue';
	import InfoPopup from '~/components/Page/Info/Popup.vue';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store';
	import { definePageMeta, showError, useAsyncData, useRoute, openConfirmModal } from '#imports';
	import { useApiGet } from '~/composables/useApi';
	import { watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();
	const store = useStore();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await store.loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	const { planet } = storeToRefs(store);

	function buyResources() {
		openConfirmModal(
			null,
			'Купить ресурсы за 10 кредитов?',
			[{
				title: 'Нет',
			}, {
				title: 'Да',
				handler: async () => {
					const result = await useApiGet('/resources/', {
						buy: 'Y'
					});

					store.PAGE_LOAD(result);
				}
			}]
		);
	}
</script>