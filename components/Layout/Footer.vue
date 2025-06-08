<template>
	<footer>
		<div class="hidden sm:block">
			<div class="w-full px-2 flex justify-between">
				<div>
					<NuxtLink to="https://github.com/alexprowars/xnova" target="_blank" title="Последние изменения">{{ version }}</NuxtLink>
					<a class="sm:hidden md:inline" target="_blank" href="https://xnova.su/">© 2008 - {{ (new Date).getFullYear() }} Xcms</a>
				</div>
				<div>
					<a href="https://t.me/x_nova_game" target="_blank">Telegram</a>|
					<NuxtLink to="/support">{{ $t('menu.support') }}</NuxtLink>|
					<NuxtLink to="/blocked">{{ $t('menu.blocked') }}</NuxtLink>|
					<NuxtLink to="/contacts">{{ $t('menu.contacts') }}</NuxtLink>|
					<NuxtLink to="/content/help">{{ $t('menu.help') }}</NuxtLink>|
					<NuxtLink to="/content/rules">{{ $t('menu.rules') }}</NuxtLink>|
					<a @click.prevent title="Игроков в сети" style="color:green">{{ stats['online'] }}</a>/<a @click.prevent title="Всего игроков" style="color:yellow">{{ stats['users'] }}</a>
				</div>
			</div>
		</div>
		<div class="sm:hidden footer-mobile">
			<div class="text-center mb-4">
				<a href="https://t.me/x_nova_game" target="_blank">Telegram</a>|
				<NuxtLink to="/support">{{ $t('menu.support') }}</NuxtLink>|
				<NuxtLink to="/blocked">{{ $t('menu.blocked') }}</NuxtLink>|
				<NuxtLink to="/contacts">{{ $t('menu.contacts') }}</NuxtLink>|
				<NuxtLink to="/content/help">{{ $t('menu.help') }}</NuxtLink>|
				<NuxtLink to="/content/rules">{{ $t('menu.rules') }}</NuxtLink>
			</div>
			<div class="w-full px-2 flex justify-between">
				<div>
					<NuxtLink to="https://github.com/alexprowars/xnova" target="_blank" title="Последние изменения">{{ version }}</NuxtLink>
					<a class="media_1" target="_blank" href="https://xnova.su/">© 2008 - {{ (new Date).getFullYear() }} Xcms</a>
				</div>
				<div>
					<a @click.prevent title="Игроков в сети" style="color:green">{{ stats['online'] }}</a>/<a @click.prevent title="Всего игроков" style="color:yellow">{{ stats['users'] }}</a>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup>
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';

	const { version, stats } = storeToRefs(useStore());
</script>