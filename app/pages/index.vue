<template>
	<div class="page-index">
		<div class="left">
			<div class="middle">
				<div class="loginform">
					<div class="login">{{ $t('pages.index.login_heading') }}</div>

					<div class="login-inputs">
						<AuthForm/>
					</div>
					<div class="lost-pass">
						<a @click.prevent="showRemindPassword" :title="$t('pages.index.remind_password_title')">{{ $t('pages.index.forgot_password') }}</a>
					</div>
					<div class="sm">
						{{ $t('pages.index.social_login_label') }}<br><br>

						<a href="" @click.prevent="socialLogin('vkontakte')">Vkontakte</a>
					</div>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="middle">
				<div class="text">
					<h1>{{ $t('pages.index.intro_heading') }}</h1>

					<p>{{ $t('pages.index.intro_paragraph_1') }}</p>
					<p>{{ $t('pages.index.intro_paragraph_2') }}</p>

					<div id="reg_button" @click.prevent="showRegistration"><a>{{ $t('pages.index.registration_cta') }}</a></div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="desk">{{ $t('pages.index.footer_desk') }}</div>
			<div class="nav">
				<a href="https://t.me/x_nova_game" target="_blank">Telegram</a>  |
				<NuxtLink to="/xnsim">{{ $t('menu.sim') }}</NuxtLink>  |
				<NuxtLink to="/stats">{{ $t('menu.stats') }}</NuxtLink>  |
				<NuxtLink to="/content/rules/">{{ $t('menu.rules') }}</NuxtLink>  |
				<NuxtLink to="/blocked">{{ $t('menu.blocked') }}</NuxtLink>  |
				<NuxtLink to="/contacts">{{ $t('menu.contacts') }}</NuxtLink>
			</div>
			<div v-if="store['stats']" class="copy">
				<a @click.prevent :title="$t('pages.index.stats_online_tooltip')" style="color:green">{{ store['stats']['online'] }}</a> / <a @click.prevent :title="$t('pages.index.stats_total_tooltip')" style="color:yellow">{{ store['stats']['users'] }}</a>&nbsp;&nbsp;&nbsp;&copy; {{ (new Date).getFullYear() }} XNOVA.SU
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
	import { navigateTo, useHead, openPopupModal, useI18n } from '#imports';
	import useStore from '~/store';

	const { t } = useI18n();

	useHead({
		title: t('pages.index.meta_title'),
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
		window.location.href = '/login/social/' + service;
	}
</script>