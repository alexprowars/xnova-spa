<template>
	<table class="table">
		<tr>
			<td class="c" colspan="10">Список членов альянса (количество: {{ page['members'].length }})</td>
		</tr>
		<tr>
			<th>№</th>
			<th>
				<NuxtLinkLocale :to="'/alliance/'+(page['admin'] ? 'admin/edit/members' : 'members')+'/sort1/1/sort2/'+page['s']+'/'">Ник</NuxtLinkLocale>
			</th>
			<th>&nbsp;</th>
			<th>&nbsp;</th>
			<th>
				<NuxtLinkLocale :to="'/alliance/'+(page['admin'] ? 'admin/edit/members' : 'members')+'/sort1/2/sort2/'+page['s']+'/'">Ранг</NuxtLinkLocale>
			</th>
			<th>
				<NuxtLinkLocale :to="'/alliance/'+(page['admin'] ? 'admin/edit/members' : 'members')+'/sort1/3/sort2/'+page['s']+'/'">Очки</NuxtLinkLocale>
			</th>
			<th>Координаты</th>
			<th>
				<NuxtLinkLocale :to="'/alliance/'+(page['admin'] ? 'admin/edit/members' : 'members')+'/sort1/4/sort2/'+page['s']+'/'">Дата вступления</NuxtLinkLocale>
			</th>
			<th v-if="page['status']">
				<NuxtLinkLocale :to="'/alliance/'+(page['admin'] ? 'admin/edit/members' : 'members')+'/sort1/5/sort2/'+page['s']+'/'">Активность</NuxtLinkLocale>
			</th>
			<th v-if="page['admin']">Управление</th>
		</tr>
		<template v-for="(m, index) in page['members']">
			<tr v-if="m['Rank_for'] === undefined || page['admin'] === false">
				<th>
					{{ index + 1 }}
				</th>
				<th>
					{{ m['username'] }}
				</th>
				<th>
					<PopupLink :to="'/messages/write/'+m['id']+'/'" :title="m['username']+': отправить сообщение'" :width="680"><span class='sprite skin_m'></span></PopupLink>
				</th>
				<th>
					<img :src="'/images/skin/race'+m['race']+'.gif'" width="16" height="16" alt="">
				</th>
				<th>
					{{ m['range'] }}
				</th>
				<th>
					{{ m['points'] }}
				</th>
				<th>
					<NuxtLinkLocale :to="'/galaxy/?galaxy='+m['galaxy']+'&system='+m['system']">{{ m['galaxy'] }}:{{ m['system'] }}:{{ m['planet'] }}</NuxtLinkLocale>
				</th>
				<th>
					{{ m['date'] }}
				</th>
				<th v-if="page['status']" v-html="m['onlinetime']"></th>
				<th v-if="page['admin']">
					<a :href="'/alliance/admin/members?kick='+m['id']+''" onclick="return confirm('Вы действительно хотите исключить данного игрока из альянса?');">
						<img src="/images/abort.gif" alt="">
					</a>
					&nbsp;
					<NuxtLinkLocale :to="'/alliance/admin/members?rank='+m['id']+''">
						<img src="/images/key.gif" alt="">
					</NuxtLinkLocale>
				</th>
			</tr>
			<tr v-else>
				<td colspan="10">
					<RouterForm :action="'/alliance/admin/members?id='+m['id']+''">
						<table class="table">
							<tr>
								<th colspan="7">{{ m['Rank_for'] }}</th>
								<th><select name="newrang" title="">{{ m['options'] }}</select></th>
								<th colspan="2"><input type="submit" value="Сохранить"></th>
							</tr>
						</table>
					</RouterForm>
				</td>
			</tr>
		</template>
		<tr>
			<td class="c" colspan="10">
				<NuxtLinkLocale :to="'/alliance'+(page['admin'] ? '/admin' : '')+''">вернутся к обзору</NuxtLinkLocale>
			</td>
		</tr>
	</table>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Список участников',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>