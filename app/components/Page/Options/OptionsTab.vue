<template>
	<form ref="formRef" method="post" @submit.prevent="send">
		<Tabs>
			<Tab name="Информация">
				<div class="block-table text-center">
					<div class="grid grid-cols-2">
						<div class="th flex-col middle">
							{{ $t('pages.options.nickname') }}
							<br>
							<span class="negative">Можно менять не чаще раза в сутки</span>
						</div>
						<div class="th middle">
							<input v-if="data['allow_name_change']" name="name" size="20" :value="user.name" type="text" autocomplete="username">
							<template v-else>{{ user.name }}</template>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Адрес e-mail (логин)</div>
						<div class="th middle gap-2">
							<input v-if="!user.email" type="text" name="email" value="">
							<template v-else>
								{{ user.email }} <NuxtLink to="/options/email" class="button">сменить</NuxtLink>
							</template>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Пол</div>
						<div class="th middle">
							<select name="sex">
								<option value="M">мужской</option>
								<option value="F" :selected="user.sex === 2" >женский</option>
							</select>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Язык</div>
						<div class="th middle">
							<select name="locale" v-model="user.locale">
								<option value="en">English</option>
								<option value="ru">Русский</option>
							</select>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<button type="submit">{{ $t('pages.options.save') }}</button>
						</div>
					</div>
				</div>
			</Tab>
			<Tab v-if="user.email" name="Пароль">
				<ChangePasswordForm/>
			</Tab>
			<Tab name="Интерфейс">
				<div class="block-table text-center">
					<div class="grid grid-cols-2">
						<div class="th middle">Упорядочить планеты по:</div>
						<div class="th middle">
							<div class="flex flex-col gap-2">
								<select name="settings_sort" style='width:170px' v-model="user.options['planet_sort']">
									<option value="0">Времени колонизации</option>
									<option value="1">Координатам</option>
									<option value="2">Алфавитному порядку</option>
									<option value="3">Типу</option>
								</select>

								<select name="settings_order" style='width:170px' v-model="user.options['planet_sort_order']">
									<option value="0">Возрастанию</option>
									<option value="1">Убыванию</option>
								</select>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Кол-во отправляемых шпионских зондов в меню "Космос"</div>
						<div class="th middle"><input name="spy" :value="user.options['spy']" type="text"></div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Участвовать в рекордах</div>
						<div class="th middle">
							<input name="records" value="" type="hidden">
							<input name="records" v-model="user.options['records']" type="checkbox">
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Использовать BB коды в сообщениях</div>
						<div class="th middle">
							<input name="bbcode" value="" type="hidden">
							<input name="bbcode" v-model="user.options['bb_parser']" type="checkbox">
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Показывать только доступные постройки</div>
						<div class="th middle">
							<input name="available" value="" type="hidden">
							<input name="available" v-model="user.options['only_available']" type="checkbox">
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Показывать панель чата</div>
						<div class="th middle">
							<input name="chatbox" value="" type="hidden">
							<input name="chatbox" v-model="user.options['chatbox']" type="checkbox">
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Цвет ваших сообщений в чате</div>
						<div class="th middle">
							<select name="color" style='width:170px' v-model="user.options['color']">
								<option v-for="id in Object.keys($tm('colors')).filter((c) => $t('colors.' + c + '.1') !== '')" :value="id" :style="'color:'+$t('colors.' + id + '.0')">{{ $t('colors.' + id + '.1') }}</option>
							</select>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Часовой пояс</div>
						<div class="th middle">
							<select name="timezone" style="width:170px" v-model="user.options['timezone']">
								<option :value="null">Системный</option>
								<option v-for="i in timezones" :value="i">{{ i > 0 ? '+' + i : i }}</option>
							</select>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Аватар</div>
						<div class="th middle flex-col gap-6">
							<div v-if="user.photo">
								<div><img :src="user.photo" class="h-52" alt=""></div>
								<label>
									<input type="checkbox" name="photo_delete" value="Y">
									Удалить
								</label>
							</div>
							<div>
								<div><input type="file" name="photo" value=""></div>
								<small>Картинки уменьшаются до размера в 300x300 пикселей</small>
							</div>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<button type="submit">{{ $t('pages.options.save') }}</button>
						</div>
					</div>
				</div>
			</Tab>
			<Tab name="Описание">
				<div class="block-table text-center">
					<div class="grid">
						<div class="th">
							<TextEditor v-model="data['about']"/>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<button type="submit">{{ $t('pages.options.save') }}</button>
						</div>
					</div>
				</div>
			</Tab>
			<Tab name="Отпуск / Удаление">
				<div class="block-table text-center">
					<div class="grid">
						<div class="th text-center">
							<a @click.prevent="enableVacationMode" class="button" v-tooltip="'Режим отпуска нужен для защиты планет во время вашего отсутствия'">
								Включить режим отпуска
							</a>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<span class="negative">Режим отпуска включается минимум на 2 суток!<br>Пока это время не прошло, выключить режим отпуска НЕВОЗМОЖНО!</span>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th"><a title="Профиль будет удалён через 7 дней">Удалить профиль</a></div>
						<div class="th">
							<input name="delete" value="0" type="hidden">
							<input name="delete" value="1" :checked="user.deleted_at !== null" type="checkbox">
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<span class="negative">Ваш профиль будет удален спустя несколько дней, в течение которых вы можете отменить данную процедуру.</span>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<button type="submit">{{ $t('pages.options.save') }}</button>
						</div>
					</div>
				</div>
			</Tab>
			<Tab name="Точки входа">
				<div v-if="data['auth'].length" class="block-table text-center !border-b">
					<div class="grid grid-cols-3">
						<div class="c">Аккаунт</div>
						<div class="c">Дата регистрации</div>
						<div class="c">Последняя авторизация</div>
					</div>
					<div v-for="auth in data['auth']" class="grid grid-cols-3">
						<div class="th">{{ auth['provider'] }} {{ auth['provider_id'] }}</div>
						<div class="th">{{ $formatDate(auth['created_at'], 'DD MMM YYYY HH:mm:ss') }}</div>
						<div class="th">
							<template v-if="auth['login_date']">
								{{ $formatDate(auth['login_date'], 'DD MMM YYYY HH:mm:ss') }}
							</template>
							<template>
								-
							</template>
						</div>
					</div>
				</div>
				<div class="block-table text-center !mt-2">
					<div class="grid">
						<div class="c">Привязать аккаунт к социальным сетям</div>
					</div>
					<div class="grid">
						<div class="th"></div>
					</div>
				</div>
			</Tab>
		</Tabs>
	</form>
</template>

<script setup>
	import { ref } from 'vue';
	import { refreshNuxtData, useApiSubmit, useSuccessNotification, useAsyncData, useApiGet, openConfirmModal, useApiPost } from '#imports';
	import ChangePasswordForm from '~/components/Page/Options/ChangePasswordForm.vue';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store/index.js';

	const { data } = await useAsyncData(
		async () => await useApiGet('/user/info'),
	);

	const store = useStore();
	const { user } = storeToRefs(store);
	const formRef = ref(null);
	const timezones = ref([]);

	for (let i = -12; i <= 12; i++) {
		timezones.value.push(i);
	}

	function send() {
		useApiSubmit('/options', new FormData(formRef.value), () => {
			useSuccessNotification('Настройки успешно изменены');

			refreshNuxtData();
			store.loadState();
		});
	}

	function enableVacationMode() {
		openConfirmModal(
			null,
			'Включить режим отпуска?',
			[{
				title: 'Нет',
			}, {
				title: 'Да',
				handler: async () => {
					await useApiPost('/options/vacation');
					await refreshNuxtData();
					await store.loadState();
				}
			}]
		);
	}
</script>