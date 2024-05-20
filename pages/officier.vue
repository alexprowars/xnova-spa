<template>
	<div class="page-officiers block">
		<div class="title">
			Доступно кредитов: {{ $number(page['credits']) }}
		</div>
		<div class="content container-fluid">
			<div class="row">
				<div class="d-none d-sm-block col-sm-2 text-center">
					<img :src="'/images/officiers/bigcredits.jpg'" alt="">
				</div>
				<div class="col-12 col-sm-7 text-start">
					Кредиты (<NuxtLinkLocale to="/credits/"><span class="positive">Получить</span></NuxtLinkLocale>)
					<br><br>
					Инженеры берут за свою работу только межгалактичесие кредиты. В зависимости от суммы контракта работают на вас в течении всего времени найма.
					<table class="powers">
						<tbody>
						<tr>
							<td class="padding-0">
								<img src="/images/officiers/smalcredts.gif" alt="">
							</td>
							<td>
								При помощи кредитов можно нанять инженеров
							</td>
						</tr>
						</tbody>
					</table>
				</div>
				<div class="col-sm-3 d-none d-sm-block text-center">
					<NuxtLinkLocale to="/credits/" class="button positive">
						Получить кредиты
					</NuxtLinkLocale>
				</div>
			</div>
			<OfficierRow v-for="item in page['items']" :key="item['id']" :item="item"></OfficierRow>
		</div>
	</div>
</template>

<script>
	import OfficierRow from '~/components/Page/Officier/row.vue'
	import { defineNuxtComponent } from '#imports';
	import useStore from '~/store';

	export default defineNuxtComponent({
		async asyncData () {
			await useStore().loadPage();

			return {}
		},
		watchQuery: true,
		middleware: 'auth',
		components: {
			OfficierRow
		}
	})
</script>