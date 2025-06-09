<template>
	<div class="page-search">
		<div class="block">
			<div class="title">Поиск по игре</div>
			<div class="content">
				<div class="block-table text-center">
					<div class="grid">
						<div class="th middle">
							<select v-model="type">
								<option value="playername">Логин игрока</option>
								<option value="planetname">Название планеты</option>
								<option value="allytag">Аббревиатура альянса</option>
								<option value="allyname">Название альянса</option>
							</select>
							&nbsp;&nbsp;
							<input type="text" name="search" v-model="query">
							&nbsp;&nbsp;
							<button @click.prevent="search">Поиск</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="separator"></div>
		<template v-if="sended">
			<template v-if="type === 'playername' || type === 'planetname'">
				<table class="table">
					<tbody>
					<tr>
						<td class="c" width="120">Имя</td>
						<td class="c" width="40">&nbsp;</td>
						<td class="c" width="20">&nbsp;</td>
						<td class="c">Альянс</td>
						<td class="c">Планета</td>
						<td class="c" width="80">Координаты</td>
						<td class="c" width="40">Место</td>
					</tr>
					<tr v-for="result in items">
						<td class="th">{{ result['username'] }}</td>
						<td class="th" nowrap>
							<SendMessagePopup :title="$t('send_message')" :id="result['id']"/>
							<NuxtLink :to="'/friends/new/' + result['id']" title="Предложение подружиться">
								<span class='sprite skin_b'></span>
							</NuxtLink>
						</td>
						<td class="th">
							<img v-if="result['race'] !== 0" :src="'/images/skin/race'+result['race']+'.gif'" width="16" height="16" alt="">
						</td>
						<td class="th">{{ result['ally_name'] }}</td>
						<td class="th">{{ result['planet_name'] }}</td>
						<td class="th"><NuxtLink :to="'/galaxy?galaxy='+result['g']+'&system='+result['s']">{{ result['g'] }}:{{ result['s'] }}:{{ result['p'] }}</NuxtLink></td>
						<td class="th"><NuxtLink :to="'/stat?view=players&range='+result['total_rank']">{{ result['total_rank'] }}</NuxtLink></td>
					</tr>
					<tr v-if="items.length === 0">
						<td class="th" colspan="7">Поиск не дал результатов</td>
					</tr>
					</tbody>
				</table>
			</template>
			<template v-else>
				<table class="table">
					<tbody>
					<tr>
						<td class="c">Аббревиатура</td>
						<td class="c">Имя</td>
						<td class="c">Члены</td>
						<td class="c">Очки</td>
					</tr>
					<tr v-for="result in items">
						<td class="th">
							<NuxtLink :to="'/alliance/info/' + result['id']">
								{{ result['tag'] }}
							</NuxtLink>
						</td>
						<td class="th">{{ result['name'] }}</td>
						<td class="th">{{ result['members'] }}</td>
						<td class="th">{{ result['total_points'] }}</td>
					</tr>
					<tr v-if="items.length === 0">
						<td class="th" colspan="6">Поиск не дал результатов</td>
					</tr>
					</tbody>
				</table>
			</template>
		</template>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiSubmit, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import SendMessagePopup from '~/components/Page/Messages/SendMessagePopup.vue';
	import { ref, watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Поиск',
	});

	const { error } = await useAsyncData(async () => {
		await useStore().loadState(); return {}
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const query = ref('');
	const type = ref('playername');
	const sended = ref(false);
	const items = ref([]);

	watch(type, () => {
		sended.value = false;
	});

	function search() {
		useApiSubmit('/search', {
			query: query.value,
			type: type.value,
		}, (result) => {
			sended.value = true;
			items.value = result;
		});
	}
</script>