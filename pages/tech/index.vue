<template>
	<ViewsTabs class="page-techtree">
		<ViewsTab v-for="(groups, i) in page" :key="i" :name="groups['name']" class="container-fluid">
			<div v-for="list in groups['items']" class="row">
				<div class="col-sm-5 col-6 title">
					<NuxtLinkLocale :to="'/info/'+list['info']+'/'">{{ list['name'] }}</NuxtLinkLocale>
					<div v-if="list['required'] !== ''" class="float-end d-none d-sm-block">
						<NuxtLinkLocale :to="'/tech/'+list['info']+'/'">[i]</NuxtLinkLocale>
					</div>
				</div>
				<div class="col-sm-7 col-6" v-html="list['required']"></div>
			</div>
		</ViewsTab>
	</ViewsTabs>
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
	})
</script>