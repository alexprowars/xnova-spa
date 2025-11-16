<template>
	<div v-if="page" class="block-table text-center">
		<div class="grid">
			<div class="c"><span class="success">Флот отправлен</span></div>
		</div>
		<div class="grid grid-cols-2">
			<div class="th">Миссия</div>
			<div class="th">{{ $t('fleet_mission.' + page['mission']) }}</div>
		</div>
		<div class="grid grid-cols-2">
			<div class="th">Расстояние</div>
			<div class="th">{{ $formatNumber(page['distance']) }}</div>
		</div>
		<div class="grid grid-cols-2">
			<div class="th">Скорость</div>
			<div class="th">{{ $formatNumber(page['speed']) }}</div>
		</div>
		<div class="grid grid-cols-2">
			<div class="th">Потребление топлива</div>
			<div class="th">{{ $formatNumber(page['consumption']) }}</div>
		</div>
		<div class="grid grid-cols-2">
			<div class="th">Дислокация</div>
			<div class="th">
				<NuxtLink :to="'/galaxy?galaxy=' + page['from']['galaxy'] + '&system=' + page['from']['system']">
					{{ page['from']['galaxy'] }}:{{ page['from']['system'] }}:{{ page['from']['planet'] }}
				</NuxtLink>
			</div>
		</div>
		<div class="grid grid-cols-2">
			<div class="th">Цель</div>
			<div class="th">
				<NuxtLink :to="'/galaxy?galaxy=' + page['target']['galaxy'] + '&system=' + page['target']['system']">
					{{ page['target']['galaxy'] }}:{{ page['target']['system'] }}:{{ page['target']['planet'] }}
				</NuxtLink>
			</div>
		</div>
		<div class="grid grid-cols-2">
			<div class="th">Время прибытия (к цели)</div>
			<div class="th">{{ $formatDate(page['start_time'], 'DD MMM HH:mm:ss') }}</div>
		</div>
		<div class="grid grid-cols-2">
			<div class="th">Время прибытия (домой)</div>
			<div class="th">{{ $formatDate(page['end_time'], 'DD MMM HH:mm:ss') }}</div>
		</div>
		<div v-if="['units'].length" class="grid">
			<div class="c">Корабли</div>
		</div>
		<div v-for="(count, unit) in page['units']" class="grid grid-cols-2">
			<div class="th">{{ $t('tech.' + unit) }}</div>
			<div class="th">{{ $formatNumber(count) }}</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, navigateTo, useNuxtData } from '#imports';

	definePageMeta({
		middleware: ['auth'],
	});

	const { data: page } = useNuxtData('fleet.send');

	if (page.value === null) {
		await navigateTo('/fleet');
	}

	const { data } = useNuxtData('fleet.checkout');
	data.value = null;
</script>