<template>
	<div class="page-index">
		<div class="left">
			<div class="middle">
				<div class="loginform">
					<div class="login">Вход в игру:</div>

					<div class="login-inputs">
						<AuthForm/>
					</div>
					<div class="lost-pass">
						<a @click.prevent="showRemindPassword" title="Восстановление пароля">Забыли пароль?</a>
					</div>
					<div class="sm">
						Войти с помощью:<br><br>

						<a href="" @click.prevent="socialLogin('vkontakte')">Vkontakte</a>
					</div>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="middle">
				<div class="text">
					<h1>Звездная Империя - это браузерная игра в жанре космическая стратегия</h1>

					<p>Захватывающие битвы, множество альянсов, нескончаемый игровой мир, тысячи противников,
					-&nbsp;это неполный список того, что вам предстоит испытать на себе в космической стратегии XNova.</p>

					<p>Завоёвывайте планеты, покоряйте галактики, создайте нерушимый альянс сильнейших игроков!
					Сойдитесь в неравной космической битве со своими противниками, окунувшись в зрелищный и захватывающий мир XNova!</p>

					<div id="reg_button" @click.prevent="showRegistration"><a>Регистрация</a></div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="desk">Звездная Империя - онлайн-игра</div>
			<div class="nav">
				<a href="https://forum.xnova.su" title="Официальный форум" target="_blank">Форум</a>  |
				<NuxtLinkLocale to="/xnsim/">Симулятор</NuxtLinkLocale>  |
				<NuxtLinkLocale to="/stat/">Статистика</NuxtLinkLocale>  |
				<a href="//vkontakte.ru/xnova_game" title="Официальная группа ВКонтакте" target="_blank">ВКонтакте</a>  |
				<NuxtLinkLocale to="/content/agb/">Правила</NuxtLinkLocale>  |
				<NuxtLinkLocale to="/banned/">Блокировки</NuxtLinkLocale>  |
				<NuxtLinkLocale to="/contacts/">Администрация</NuxtLinkLocale>
			</div>
			<div v-if="store['stats']" class="copy">
				<a @click.prevent title="Игроков в сети" style="color:green">{{ store['stats']['online'] }}</a> / <a @click.prevent title="Всего игроков" style="color:yellow">{{ store['stats']['users'] }}</a>&nbsp;&nbsp;&nbsp;&copy; {{ (new Date).getFullYear() }} XNOVA.SU
			</div>
		</div>
		<div id="mask"></div>
	</div>
</template>

<script setup>
	import AuthForm from '~/components/Page/Index/AuthForm.vue'
	import RegistrationForm from './registration.vue'
	import RemindForm from './remind.vue'
	import { isMobile } from '~/utils/helpers'
	import { navigateTo, useHead, openPopupModal } from '#imports';
	import useStore from '~/store';

	useHead({
		title: 'Вход в игру',
		bodyAttrs: {
			class: 'index-page',
		}
	});

	const store = useStore();

	function showRegistration () {
		if (isMobile()) {
			return navigateTo('/registration');
		}

		openPopupModal(RegistrationForm)
	}

	function showRemindPassword () {
		if (isMobile()) {
			return navigateTo('/remind');
		}

		openPopupModal(RemindForm);
	}

	async function socialLogin(service) {
		window.location.href = '/api/login/social/' + service;
	}
</script>