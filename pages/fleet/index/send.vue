<template>
	<div v-if="page">
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
				<div class="th col-6">{{ $formatNumber(page['distance']) }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Скорость</div>
				<div class="th col-6">{{ $formatNumber(page['speed']) }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Потребление топлива</div>
				<div class="th col-6">{{ $formatNumber(page['consumption']) }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Дислокация</div>
				<div class="th col-6">
					<NuxtLink :to="'/galaxy/?galaxy=' + page['from']['galaxy'] + '&system=' + page['from']['system']">
						{{ page['from']['galaxy'] }}:{{ page['from']['system'] }}:{{ page['from']['planet'] }}
					</NuxtLink>
				</div>
			</div>
			<div class="row">
				<div class="th col-6">Цель</div>
				<div class="th col-6">
					<NuxtLink :to="'/galaxy/?galaxy=' + page['target']['galaxy'] + '&system=' + page['target']['system']">
						{{ page['target']['galaxy'] }}:{{ page['target']['system'] }}:{{ page['target']['planet'] }}
					</NuxtLink>
				</div>
			</div>
			<div class="row">
				<div class="th col-6">Время прибытия (к цели)</div>
				<div class="th col-6">{{ $formatDate(page['start_time'], 'DD MMM HH:mm:ss') }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Время прибытия (домой)</div>
				<div class="th col-6">{{ $formatDate(page['end_time'], 'DD MMM HH:mm:ss') }}</div>
			</div>
			<div v-if="['units'].length" class="row">
				<div class="c col-12">Корабли</div>
			</div>
			<div v-for="(count, unit) in page['units']" class="row">
				<div class="th col-6">{{ $t('tech.' + unit) }}</div>
				<div class="th col-6">{{ $formatNumber(count) }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, navigateTo, useNuxtData } from '#imports';

	definePageMeta({
		middleware: ['auth'],
	});

	const { data: page } = useNuxtData('page-fleet.send');

	if (page.value === null) {
		await navigateTo('/fleet');
	}

	const { data } = useNuxtData('page-fleet.checkout');
	data.value = null;
</script>