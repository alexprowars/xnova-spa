<template>
	<div class="text-center">
		<div class="block-table raceSelect">
			<div v-if="race === 0" class="row">
				<div class="col-12 c big">Выбор фракции</div>
			</div>
			<div class="row">
				<div class="col-6 k big">Конфедерация</div>
				<div class="col-6 k big">Бионики</div>
			</div>
			<div class="row">
				<div class="th col-6 text-start">
					<div style="text-align:center">
						<div class="separator"></div>
						<img :src="'/images/skin/race1.gif'" alt="">
					</div>
					<br>
					<div class="positive">Особенности расы:</div>
					<font color="#84CFEF">+15% к добыче металла
					<br>+10% к скорости постройки кораблей
					<br>+15% к энергии спутников
					<br>-10% к стоимости улучшения кораблей
					<br><br>Уникальный корабль:
					<font color="#adff2f">
						<InfoPopup :id="220">Корвет</InfoPopup>
					</font> (манёвренный и скоростной корабль)</font>
					<br><br>

					<div v-if="race === 0" style="text-align:center">
						<NuxtLink to="/race/index/sel/1/"><input type="button" value="Выбрать"></NuxtLink>
					</div>
					<br>
				</div>
				<div class="th col-6 text-start">
					<div style="text-align:center">
						<div class="separator"></div>
						<img :src="'/images/skin/race2.gif'" alt="">
					</div>
					<br>
					<div class="positive">Особенности расы:</div>
					<font color="#84CFEF">+15% к добыче дейтерия
					<br>-10% к стоимости постройки кораблей
					<br>+20% к вместимости хранилищ
					<br>+5% к энергии от солнечных батарей
					<br><br>Уникальный корабль:
					<font color="#adff2f">
						<InfoPopup :id="221">Перехватчик</InfoPopup>
					</font> (скоростной легкий корабль)</font>
					<br><br>

					<div v-if="race === 0" style="text-align:center">
						<NuxtLink to="/race/index/sel/2/"><input type="button" value="Выбрать"></NuxtLink>
					</div>
					<br>
				</div>
			</div>
			<div class="row">
				<div class="col-6 k big">Сайлоны</div>
				<div class="col-6 k big">Древние</div>
			</div>
			<div class="row">
				<div class="th col-6 text-start">
					<div style="text-align:center">
						<div class="separator"></div>
						<img :src="'/images/skin/race3.gif'" alt="">
					</div>
					<br>
					<div class="positive">Особенности расы:</div>
					<font color="#84CFEF">+5% к добыче всех ресурсов
					<br>-5% к стоимости обороны
					<br>+10% к скорости постройки зданий
					<br>-5% к стоимости постройки зданий
					<br><br>Уникальный корабль:
					<font color="#adff2f">
						<InfoPopup :id="222">Дредноут</InfoPopup>
					</font> (тяжелый боевой корабль)</font>
					<br><br>

					<div v-if="race === 0" style="text-align:center">
						<NuxtLink to="/race/index/sel/3/"><input type="button" value="Выбрать"></NuxtLink>
					</div>
					<br>
				</div>
				<div class="th col-6 text-start">
					<div style="text-align:center">
						<div class="separator"></div>
						<img :src="'/images/skin/race4.gif'" alt="">
					</div>
					<br>
					<div class="positive">Особенности расы:</div>
					<font color="#84CFEF">+15% к добыче кристаллов
					<br>+10% к скорости полёта кораблей
					<br>+5% энергии от электростанций
					<br>-10% к стоимости исследований
					<br><br>Уникальный корабль:
					<font color="#adff2f">
						<InfoPopup :id="223">Корсар</InfoPopup>
					</font> (быстрый пиратский корабль)</font>
					<br><br>

					<div v-if="race === 0" style="text-align:center">
						<NuxtLink to="/race/index/sel/4/"><input type="button" value="Выбрать"></NuxtLink>
					</div>
					<br>
				</div>
			</div>
			<div v-if="race !== 0">
				<div class="row">
					<div class="col-12 k big">
						<span v-if="page['change']">
							Бесплатная смена фракции ({{ page['change'] }} попытка осталось)
						</span>
						<span v-else>
							Сменить фракцию за 100 кредитов
						</span>
					</div>
				</div>
				<div v-if="page['change_available']" class="row">
					<div class="th col-sx-12">
						На планетах не должно идти строительство, исследования, летать флот и весь флот фракции подлежит демонтировке (без возврата ресурсов).<br><br>
						<RaceChange/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import InfoPopup from '~/components/Page/Info/Popup.vue';
	import RaceChange from '~/components/Page/Race/RaceChange.vue';
	import { definePageMeta, openPopupModal, showError, useApiGet, useAsyncData, useErrorNotification, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { computed, onMounted } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Фракции',
	});

	const route = useRoute();
	const store = useStore();

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/race');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const race = computed(() => {
		return store.user ? store.user.race : 0;
	});

	if (!race.value) {
		route.meta['view'].menu = false;
		route.meta['view'].header = false;
		route.meta['view'].footer = false;
		route.meta['view'].planets = false;
	}

	onMounted(async () => {
		if (race.value) {
			return;
		}

		try {
			const result = await useApiGet('/content/welcome/');

			let component = useRouter().resolve('/content/welcome/')
				.matched.flatMap(record => Object.values(record.components));

			if (component.length) {
				await openPopupModal(component[0], {
					popup: result,
				});
			}
		} catch (e) {
			useErrorNotification(e.message);
		}
	});
</script>