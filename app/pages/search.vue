<template>
	<div class="page-search">
		<div class="block">
			<div class="title">{{ $t('pages.search.title') }}</div>
			<div class="content">
				<div class="block-table text-center">
					<div class="grid">
						<div class="th middle">
							<select v-model="type">
								<option value="playername">{{ $t('pages.search.type_playername') }}</option>
								<option value="planetname">{{ $t('pages.search.type_planetname') }}</option>
								<option value="allytag">{{ $t('pages.search.type_allytag') }}</option>
								<option value="allyname">{{ $t('pages.search.type_allyname') }}</option>
							</select>
							&nbsp;&nbsp;
							<input type="text" name="search" v-model="query">
							&nbsp;&nbsp;
							<button @click.prevent="search">{{ $t('pages.search.search_button') }}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="sended" class="mt-2">
			<ListPlayers v-if="type === 'playername' || type === 'planetname'" :items="items"/>
			<ListAlliances v-else :items="items"/>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiSubmit, useAsyncData, useHead, useI18n } from '#imports';
	import useStore from '~/store';
	import { ref, watch } from 'vue';
	import ListPlayers from '~/components/Page/Search/ListPlayers.vue';
	import ListAlliances from '~/components/Page/Search/ListAlliances.vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.search.title'),
	});

	const { error } = await useAsyncData(async () => {
		await useStore().loadState(); return {}
	});

	if (error.value) {
		throw showError({ data: { error: error.value } });
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