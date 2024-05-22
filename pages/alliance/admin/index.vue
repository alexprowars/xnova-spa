<template>
	<div>
	<table class="table">
		<tr>
			<td class="c">Управление альянсом</td>
		</tr>
		<tr>
			<th><NuxtLinkLocale to="/alliance/admin/rights">Установить ранги</NuxtLinkLocale></th>
		</tr>
		<tr v-if="page['can_view_members']">
			<th><NuxtLinkLocale to="/alliance/admin/members">Члены альянса</NuxtLinkLocale></th>
		</tr>
		<tr>
			<th><NuxtLinkLocale to="/alliance/admin/tag">Изменить аббревиатуру альянса</NuxtLinkLocale></th>
		</tr>
		<tr>
			<th><NuxtLinkLocale to="/alliance/admin/name">Изменить название альянса</NuxtLinkLocale></th>
		</tr>
	</table>
	
	<RouterForm action="/alliance/admin">
		<input type="hidden" name="t" :value="page['t']">
		<table class="table">
			<tr>
				<td class="c" colspan="3">Редактировать текст</td>
			</tr>
			<tr>
				<th><NuxtLinkLocale to="/alliance/admin?t=1">Внешний текст</NuxtLinkLocale></th>
				<th><NuxtLinkLocale to="/alliance/admin?t=2">Внутренний текст</NuxtLinkLocale></th>
				<th><NuxtLinkLocale to="/alliance/admin?t=3">Текст заявки</NuxtLinkLocale></th>
			</tr>
			<tr>
				<td class="c" colspan="3">Текст альянса</td>
			</tr>
			<tr>
				<th colspan="3" class="p-a-0">
					<TextEditor :text="page['text']"/>
				</th>
			</tr>
			<tr>
				<th colspan="3">
					<input type="reset" value="Очистить"><input type="submit" value="Сохранить">
				</th>
			</tr>
		</table>
	</RouterForm>
	<div class="separator"></div>
	<RouterForm action="/alliance/admin">
		<table class="table">
			<tr>
				<td class="c" colspan="2">Дополнительные настройки</td>
			</tr>
			<tr>
				<th width="200">Домашняя страница</th>
				<th><input type="text" name="web" :value="page['web']" style="width:98%;" title=""></th>
			</tr>
			<tr>
				<th>Логотип</th>
				<th>
					<input type="file" name="image" value="" style="width:98%;" title="">
					<template v-if="page['image'] !== ''">
						<img :src="page['image']" style="max-width: 98%;max-height: 400px;" alt="">
						<label>
							<input type="checkbox" name="delete_image" value="Y"> Удалить
						</label>
					</template>
				</th>
			</tr>
			<tr>
				<th>Ранг основателя</th>
				<th><input type="text" name="owner_range" :value="page['owner_range']" style="width:98%;" title=""></th>
			</tr>
			<tr>
				<th>Заявки</th>
				<th>
					<select style="width:98%;" name="request_notallow" title="" v-model="page['request_allow']">
						<option value="1">Закрытый альянс</option>
						<option value="0">Открытый альянс</option>
					</select>
				</th>
			</tr>
			<tr>
				<th colspan="2">
					<input type="submit" name="options" value="Сохранить">
				</th>
			</tr>
		</table>
	</RouterForm>
	
	<div class="separator"></div>
	<div class="row">
		<div class="col-6" v-html="page['Disolve_alliance']"></div>
		<div class="col-6" v-html="page['Transfer_alliance']"></div>
	</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useRoute } from '#imports';
	import useStore from '~/store';
	import { watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}
</script>