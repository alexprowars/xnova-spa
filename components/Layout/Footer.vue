<template>
	<footer>
		<div class="d-none d-sm-block">
			<div class="container-fluid">
				<div class="float-start text-start">
					<NuxtLinkLocale to="/news/" title="Последние изменения">{{ version }}</NuxtLinkLocale>
					<a class="d-sm-none d-md-inline" target="_blank" href="http://xnova.su/">© 2008 - {{ (new Date).getFullYear() }} Xcms</a>
				</div>
				<div class="float-end text-end">
					<a href="https://forum.xnova.su/" target="_blank">Форум</a>|
					<NuxtLinkLocale to="/blocked">Тёмные</NuxtLinkLocale>|
					<a href="//vk.com/xnova_game" target="_blank">ВК</a>|
					<NuxtLinkLocale to="/contacts">Контакты</NuxtLinkLocale>|
					<NuxtLinkLocale to="/content/help">Новичкам</NuxtLinkLocale>|
					<NuxtLinkLocale to="/content/agb">Правила</NuxtLinkLocale>|
					<a @click.prevent title="Игроков в сети" style="color:green">{{ stats['online'] }}</a>/<a @click.prevent title="Всего игроков" style="color:yellow">{{ stats['users'] }}</a>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
		<div class="row d-sm-none footer-mobile">
			<div class="col-12 text-center">
				<a href="https://forum.xnova.su/" target="_blank">Форум</a>|
				<NuxtLinkLocale to="/blocked">Тёмные</NuxtLinkLocale>|
				<NuxtLinkLocale to="/contacts">Контакты</NuxtLinkLocale>|
				<NuxtLinkLocale to="/content/help">Новичкам</NuxtLinkLocale>|
				<NuxtLinkLocale to="/content/agb">Правила</NuxtLinkLocale>
			</div>
			<div class="col-8 text-center">
				<NuxtLinkLocale to="/news" title="Последние изменения">{{ version }}</NuxtLinkLocale>
				<a class="media_1" target="_blank" href="https://xnova.su/">© 2008 - {{ (new Date).getFullYear() }} Xcms</a>
			</div>
			<div class="col-4 text-center">
				<a @click.prevent title="Игроков в сети" style="color:green">{{ stats['online'] }}</a>/<a @click.prevent title="Всего игроков" style="color:yellow">{{ stats['users'] }}</a>
			</div>
		</div>
	</footer>
</template>

<script setup>
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';

	const { version, stats } = storeToRefs(useStore());
</script>