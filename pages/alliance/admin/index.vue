<template>
	<div>
	<table class="table">
		<tr>
			<td class="c">Управление альянсом</td>
		</tr>
		<tr>
			<th><nuxt-link to="/alliance/admin/rights">Установить ранги</nuxt-link></th>
		</tr>
		<tr v-if="page['can_view_members']">
			<th><nuxt-link to="/alliance/admin/members">Члены альянса</nuxt-link></th>
		</tr>
		<tr>
			<th><nuxt-link to="/alliance/admin/tag">Изменить аббревиатуру альянса</nuxt-link></th>
		</tr>
		<tr>
			<th><nuxt-link to="/alliance/admin/name">Изменить название альянса</nuxt-link></th>
		</tr>
	</table>
	
	<ViewsRouterForm action="/alliance/admin">
		<input type="hidden" name="t" :value="page['t']">
		<table class="table">
			<tr>
				<td class="c" colspan="3">Редактировать текст</td>
			</tr>
			<tr>
				<th><nuxt-link to="/alliance/admin?t=1">Внешний текст</nuxt-link></th>
				<th><nuxt-link to="/alliance/admin?t=2">Внутренний текст</nuxt-link></th>
				<th><nuxt-link to="/alliance/admin?t=3">Текст заявки</nuxt-link></th>
			</tr>
			<tr>
				<td class="c" colspan="3">Текст альянса</td>
			</tr>
			<tr>
				<th colspan="3" class="p-a-0">
					<text-editor :text="page['text']"></text-editor>
				</th>
			</tr>
			<tr>
				<th colspan="3">
					<input type="reset" value="Очистить"><input type="submit" value="Сохранить">
				</th>
			</tr>
		</table>
	</ViewsRouterForm>
	<div class="separator"></div>
	<ViewsRouterForm action="/alliance/admin">
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
	</ViewsRouterForm>
	
	<div class="separator"></div>
	<div class="row">
		<div class="col-6" v-html="page['Disolve_alliance']"></div>
		<div class="col-6" v-html="page['Transfer_alliance']"></div>
	</div>
	</div>
</template>

<script>
	import { defineNuxtComponent } from '#imports';
	import useStore from '~/store';

	export default defineNuxtComponent({
		async asyncData () {
			await useStore().loadPage();

			return {}
		},
		watchQuery: true,
		middleware: 'auth',
	})
</script>