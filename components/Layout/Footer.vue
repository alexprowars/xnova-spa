<template>
	<footer>
		<div class="d-none d-sm-block">
			<div class="container-fluid">
				<div class="float-start text-start">
					<NuxtLink to="https://github.com/alexprowars/xnova" target="_blank" title="Последние изменения">{{ version }}</NuxtLink>
					<a class="d-sm-none d-md-inline" target="_blank" href="https://xnova.su/">© 2008 - {{ (new Date).getFullYear() }} Xcms</a>
				</div>
				<div class="float-end text-end">
					<a href="https://t.me/x_nova_game" target="_blank">Telegram</a>|
					<NuxtLink to="/support">{{ $t('menu.support') }}</NuxtLink>|
					<NuxtLink to="/blocked">{{ $t('menu.blocked') }}</NuxtLink>|
					<NuxtLink to="/contacts">{{ $t('menu.contacts') }}</NuxtLink>|
					<NuxtLink to="/content/help">{{ $t('menu.help') }}</NuxtLink>|
					<NuxtLink to="/content/rules">{{ $t('menu.rules') }}</NuxtLink>|
					<a @click.prevent title="Игроков в сети" style="color:green">{{ stats['online'] }}</a>/<a @click.prevent title="Всего игроков" style="color:yellow">{{ stats['users'] }}</a>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
		<div class="row d-sm-none footer-mobile">
			<div class="col-12 text-center">
				<a href="https://t.me/x_nova_game" target="_blank">Telegram</a>|
				<NuxtLink to="/support">{{ $t('menu.support') }}</NuxtLink>|
				<NuxtLink to="/blocked">{{ $t('menu.blocked') }}</NuxtLink>|
				<NuxtLink to="/contacts">{{ $t('menu.contacts') }}</NuxtLink>|
				<NuxtLink to="/content/help">{{ $t('menu.help') }}</NuxtLink>|
				<NuxtLink to="/content/rules">{{ $t('menu.rules') }}</NuxtLink>
			</div>
			<div class="col-8 text-center">
				<NuxtLink to="https://github.com/alexprowars/xnova" target="_blank" title="Последние изменения">{{ version }}</NuxtLink>
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