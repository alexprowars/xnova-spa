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
					<NuxtLinkLocale to="/info/113">{{ $t('tech.113') }}</NuxtLinkLocale>
				</div>
				<div class="col-2 th">
					{{ user['technology']['energy_tech'] }} ур.
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
							<button @click.prevent="shutdown('Y')" class="button">
								Включить на всех<br>планетах
							</button>
						</div>
						<div class="col col-sm-6 th">
							<button @click.prevent="shutdown('N')" class="button">
								Выключить на всех<br>планетах
							</button>
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
					<form ref="resourceForm" method="post" @submit.prevent="updateState">
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
									<td class="k"></td>
									<td class="k"></td>
									<td v-for="res in page['resources']" class="k">{{ $number(planet['resources'][res]['basic']) }}</td>
									<td class="k">{{ $number(planet['resources']['energy']['basic']) }}</td>
									<td class="k">100%</td>
								</tr>
								<ResourcesRow v-for="(item, index) in page['items']" :key="index" :item="item" :resources="page['resources']"/>
								<tr>
									<th colspan="2">Вместимость:</th>
									<th>{{ page['bonus_h'] }}%</th>
									<td v-for="res in page['resources']" class="k" v-once>
										<span :class="[(planet['resources'][res]['capacity'] > planet['resources'][res]['value']) ? 'positive' : 'negative']">
											{{ $number(planet['resources'][res]['capacity'] / 1000) }} k
										</span>
									</td>
									<td class="k">
										<font color="#00ff00">{{ $number(planet['resources']['energy']['capacity']) }}</font>
									</td>
									<td class="k">
										<input name="action" value="Пересчитать" type="submit">
									</td>
								</tr>
								<tr>
									<th colspan="3">Сумма:</th>
									<td v-for="res in page['resources']" class="k">
										<Colored :value="planet['resources'][res]['production']"/>
									</td>
									<td class="k"><Colored :value="planet['resources']['energy']['value']"/></td>
								</tr>
							</tbody>
						</table>
					</form>
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
							{{ $t('resources.' + res) }}
						</div>
						<div class="col-2 th">
							<Colored :value="planet['resources'][res]['production']"></Colored>
						</div>
						<div class="col-2 th">
							<Colored :value="planet['resources'][res]['production'] * 24"></Colored>
						</div>
						<div class="col-3 th">
							<Colored :value="planet['resources'][res]['production'] * 24 * 7"></Colored>
						</div>
						<div class="col-3 th">
							<Colored :value="planet['resources'][res]['production'] * 24 * 7 * 30"></Colored>
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
					<StorageRow v-for="res in page['resources']" :key="res" :resource="res"/>
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
	import { definePageMeta, showError, useAsyncData, openConfirmModal, useHead, useRoute, refreshNuxtData, useApiSubmit } from '#imports';
	import { ref } from 'vue';
	import StorageRow from '~/components/Page/Resources/StorageRow.vue';
	import { toast } from 'vue3-toastify';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Сырьё',
	});

	const store = useStore();

	const { data: page, error } = await useAsyncData('page-resources', async () => {
		return await store.loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const { user, planet } = storeToRefs(store);
	const resourceForm = ref(null);

	function buyResources() {
		openConfirmModal(
			null,
			'Купить ресурсы за 10 кредитов?',
			[{
				title: 'Нет',
			}, {
				title: 'Да',
				handler: () => {
					useApiSubmit('/resources/buy', {}, (result) => {
						toast('Вы успешно купили ' + result['metal'] + ' металла, ' + result['crystal'] + ' кристалла, ' + result['deuterium'] + ' дейтерия', {
							type: 'success'
						});

						refreshNuxtData('page-resources');
					});
				}
			}]
		);
	}

	function shutdown(active) {
		useApiSubmit('/resources/shutdown', { active }, () => {
			refreshNuxtData('page-resources');
		});
	}

	function updateState() {
		useApiSubmit('/resources/state', new FormData(resourceForm.value), () => {
			refreshNuxtData('page-resources');
		});
	}
</script>