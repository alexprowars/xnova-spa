<template>
	<div>
		<div class="block-table">
			<div class="row">
				<div class="c col-12"><span class="success">Флот отправлен</span></div>
			</div>
			<div class="row">
				<div class="th col-6">Миссия</div>
				<div class="th col-6">{{ $t('fleet_mission.' + page['mission']) }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Расстояние</div>
				<div class="th col-6">{{ $number(page['distance']) }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Скорость</div>
				<div class="th col-6">{{ $number(page['speed']) }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Потребление топлива</div>
				<div class="th col-6">{{ $number(page['consumption']) }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Дислокация</div>
				<div class="th col-6">
					<NuxtLinkLocale :to="'/galaxy/?galaxy=' + page['from']['galaxy'] + '&system=' + page['from']['system']">
						{{ page['from']['galaxy'] }}:{{ page['from']['system'] }}:{{ page['from']['planet'] }}
					</NuxtLinkLocale>
				</div>
			</div>
			<div class="row">
				<div class="th col-6">Цель</div>
				<div class="th col-6">
					<NuxtLinkLocale :to="'/galaxy/?galaxy=' + page['target']['galaxy'] + '&system=' + page['target']['system']">
						{{ page['target']['galaxy'] }}:{{ page['target']['system'] }}:{{ page['target']['planet'] }}
					</NuxtLinkLocale>
				</div>
			</div>
			<div class="row">
				<div class="th col-6">Время прибытия (к цели)</div>
				<div class="th col-6">{{ dayjs(page['start_time']).tz().format('DD MMM HH:mm:ss') }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Время прибытия (домой)</div>
				<div class="th col-6">{{ dayjs(page['end_time']).tz().format('DD MMM HH:mm:ss') }}</div>
			</div>
			<div v-if="['units'].length" class="row">
				<div class="c col-12">Корабли</div>
			</div>
			<div v-for="(count, unit) in page['units']" class="row">
				<div class="th col-6">{{ $t('tech.' + unit) }}</div>
				<div class="th col-6">{{ $number(count) }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import dayjs from 'dayjs';
	import { definePageMeta, showError, useAsyncData } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
	});

	const store = useStore();

	const { data: page, error } = await useAsyncData(
		async () => await store.loadPage()
	);

	if (error.value) {
		throw showError(error.value);
	}
</script>