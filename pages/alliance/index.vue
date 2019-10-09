<template>
	<div v-if="hasAlliance">
		<table class="table">
			<tr>
				<td class="c" colspan="2">Альянсы</td>
			</tr>
			<tr>
				<th><nuxt-link to="/alliance/make">Создать альянс</nuxt-link></th>
				<th><nuxt-link to="/alliance/search">Поиск альянса</nuxt-link></th>
			</tr>
		</table>

		<table v-if="page['list'].length" class="table">
			<tr>
				<td class="c" colspan="2">Ваши заявки</td>
			</tr>
			<template v-for="item in page['list']">
				<tr>
					<th width="70%">{{ item[2] }} [{{ item[1] }}]</th>
					<th>{{ item[3] | date('d.m.Y H:i') }}</th>
				</tr>
				<tr>
					<th colspan="2">
						<router-form action="/alliance">
							<input type="hidden" name="r_id" :value="item[0]">
							<input type="submit" name="bcancel" value="Убрать заявку">
						</router-form>
					</th>
				</tr>
			</template>
		</table>
		<table v-if="page['allys'].length" class="table">
			<tr>
				<td class="c" width="30">Место</td>
				<td class="c">Альянс</td>
				<td class="c">Игроки</td>
				<td class="c">Очки</td>
			</tr>
			<tr v-for="(item, i) in page['allys']">
				<th>{{ i + 1 }}</th>
				<th><nuxt-link :to="'/alliance/info/'+item['id']+''">{{ item['name'] }} [{{ item['tag'] }}]</nuxt-link></th>
				<th>{{ item['members'] }}</th>
				<th>{{ item['total_points'] }}</th>
			</tr>
		</table>
	</div>
	<div v-else>
		<table class="table" style="table-layout: fixed;">
			<tbody>
				<tr>
					<td class="c" colspan="2">Информация об альянсе</td>
				</tr>
				<tr v-if="page['image'] !== ''">
					<th colspan="2" class="p-a-0">
						<img :src="page['image']" style="max-width:100%" alt="">
					</th>
				</tr>
				<tr>
					<th>Аббревиатура</th>
					<th>{{ page['tag'] }}</th>
				</tr>
				<tr>
					<th>Название</th>
					<th>{{ page['name'] }}</th>
				</tr>
				<tr>
					<th>Члены альянса</th>
					<th>
						{{ page['members'] }}
						<template v-if="page['members_list']">
							(<nuxt-link to="/alliance/members">список</nuxt-link>)
						</template>
					</th>
				</tr>
				<tr>
					<th>Ваш ранг</th>
					<th>
						{{ page['range'] }}
						<template v-if="page['alliance_admin']">
							(<nuxt-link to="/alliance/admin">управление альянсом</nuxt-link>)
						</template>
					</th>
				</tr>
				<tr v-if="page['diplomacy'] !== false">
					<th>Дипломатия</th>
					<th>
						<nuxt-link to="/alliance/diplomacy">Просмотр</nuxt-link>
						<template v-if="page['diplomacy'] > 0">
							({{ page['diplomacy'] }} новых запросов)
						</template>
					</th>
				</tr>
				<tr v-if="page['requests'] > 0">
					<th>Заявки</th>
					<th>
						<nuxt-link to="/alliance/admin/equests">{{ page['requests'] }} заявок</nuxt-link>
					</th>
				</tr>
				<tr v-if="page['chat_access']">
					<th>
						Альянс чат
						<template v-if="$store.state.user.alliance.messages > 0">
							({{ $store.state.user.alliance.messages }} новых)
						</template>
					</th>
					<th><nuxt-link to="/alliance/chat">Войти в чат</nuxt-link></th>
				</tr>
				<tr>
					<td class="b" colspan="2" height="100" style="padding:3px;">
						<text-viewer :text="page['description']"></text-viewer>
					</td>
				</tr>
				<tr v-if="page['web'] !== ''">
					<th>Домашняя страница</th>
					<th><a :href="page['web']" target="_blank">{{ page['web'] }}</a></th>
				</tr>
				<tr>
					<td class="c" colspan="2">Внутренняя компетенция</td>
				</tr>
				<tr>
					<td class="b" colspan="2" height="100" style="padding:3px;">
						<text-viewer :text="page['text']"></text-viewer>
					</td>
				</tr>
				<tr v-if="page['owner'] !== ''">
					<td colspan="2" v-html="page['owner']"></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		name: 'alliance',
		async asyncData ({ store }) {
			return await store.dispatch('loadPage')
		},
		watchQuery: true,
		middleware: 'auth',
		computed: {
			hasAlliance () {
				return typeof this.page['id'] === 'undefined'
			}
		},
	}
</script>