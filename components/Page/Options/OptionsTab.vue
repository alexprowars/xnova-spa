<template>
	<form ref="formRef" method="post" @submit.prevent="send">
		<Tabs>
			<Tab name="Информация">
				<div class="block-table !border-0 text-center">
					<div class="grid grid-cols-2">
						<div class="th flex-col middle">
							{{ $t('options.nickname') }}
							<br>
							<span class="negative">Можно менять не чаще раза в сутки</span>
						</div>
						<div class="th middle">
							<input v-if="data['opt_usern_datatime']" name="username" size="20" :value="data['opt_usern_data']" type="text" autocomplete="username">
							<template v-else>{{ data['opt_usern_data'] }}</template>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Адрес e-mail (логин)</div>
						<div class="th middle gap-2">
							<input v-if="!data['opt_isemail']" type="text" name="email" value="">
							<template v-else>
								{{ data['opt_mail_data'] }} <NuxtLink to="/options/email" class="button">сменить</NuxtLink>
							</template>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Пол</div>
						<div class="th middle">
							<select name="sex">
								<option value="M">мужской</option>
								<option value="F" :selected="data['sex'] === 2" >женский</option>
							</select>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Язык</div>
						<div class="th middle">
							<select name="locale" v-model="data['locale']">
								<option value="en">English</option>
								<option value="ru">Русский</option>
							</select>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<button type="submit">{{ $t('options.save') }}</button>
						</div>
					</div>
				</div>
			</Tab>
			<Tab v-if="data['opt_isemail']" name="Пароль">
				<ChangePasswordForm/>
			</Tab>
			<Tab name="Интерфейс">
				<div class="block-table !border-0 text-center">
					<div class="grid grid-cols-2">
						<div class="th middle">Упорядочить планеты по:</div>
						<div class="th middle">
							<div class="flex flex-col gap-2">
								<select name="settings_sort" style='width:170px' v-model="data['options']['planet_sort']">
									<option value="0">Времени колонизации</option>
									<option value="1">Координатам</option>
									<option value="2">Алфавитному порядку</option>
									<option value="3">Типу</option>
								</select>

								<select name="settings_order" style='width:170px' v-model="data['options']['planet_sort_order']">
									<option value="0">Возрастанию</option>
									<option value="1">Убыванию</option>
								</select>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Кол-во отправляемых шпионских зондов в меню "Космос"</div>
						<div class="th middle"><input name="spy" :value="data['options']['spy']" type="text"></div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Участвовать в рекордах</div>
						<div class="th middle"><input name="records" v-model="data['options']['records']" type="checkbox"></div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Использовать BB коды в сообщениях</div>
						<div class="th middle"><input name="bbcode" v-model="data['options']['bb_parser']" type="checkbox"></div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Показывать только доступные постройки</div>
						<div class="th middle"><input name="available" v-model="data['options']['only_available']" type="checkbox"></div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Показывать панель чата</div>
						<div class="th middle"><input name="chatbox" v-model="data['options']['chatbox']" type="checkbox"></div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Цвет ваших сообщений в чате</div>
						<div class="th middle">
							<select name="color" style='width:170px' v-model="data['options']['color']">
								<option v-for="id in Object.keys($tm('colors')).filter((c) => $t('colors.' + c + '.1') !== '')" :value="id" :style="'color:'+$t('colors.' + id + '.0')">{{ $t('colors.' + id + '.1') }}</option>
							</select>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Часовой пояс</div>
						<div class="th middle">
							<select name="timezone" style="width:170px" v-model="data['options']['timezone']">
								<option :value="null">Системный</option>
								<option v-for="i in timezones" :value="i">{{ i > 0 ? '+' + i : i }}</option>
							</select>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th middle">Аватар</div>
						<div class="th middle flex-col gap-6">
							<div v-if="data['avatar'] !== ''">
								<div><img :src="data['avatar']" class="h-52" alt=""></div>
								<label>
									<input type="checkbox" name="image_delete" value="Y">
									Удалить
								</label>
							</div>
							<div>
								<div><input type="file" name="image" value=""></div>
								<small>Картинки уменьшаются до размера в 300x300 пикселей</small>
							</div>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<button type="submit">{{ $t('options.save') }}</button>
						</div>
					</div>
				</div>
			</Tab>
			<Tab name="Описание">
				<div class="block-table !border-0 text-center">
					<div class="grid">
						<div class="th">
							<TextEditor v-model="data['about']"/>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<button type="submit">{{ $t('options.save') }}</button>
						</div>
					</div>
				</div>
			</Tab>
			<Tab name="Отпуск / Удаление">
				<div class="block-table !border-0 text-center">
					<div class="grid grid-cols-2">
						<div class="th"><a title="Режим отпуска нужен для защиты планет во время вашего отсутствия">Включить режим отпуска</a></div>
						<div class="th"><input name="vacation" v-model="data['opt_modev_data']" type="checkbox"></div>
					</div>
					<div class="grid">
						<div class="th">
							<span class="negative">Режим отпуска включается минимум на 2 суток!<br>Пока это время не прошло, выключить режим отпуска НЕВОЗМОЖНО!</span>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th"><a title="Профиль будет удалён через 7 дней">Удалить профиль</a></div>
						<div class="th"><input name="delete" v-model="data['opt_delac_data']" type="checkbox"></div>
					</div>
					<div class="grid">
						<div class="th">
							<span class="negative">Ваш профиль будет удален спустя несколько дней, в течение которых вы можете отменить данную процедуру.</span>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<button type="submit">{{ $t('options.save') }}</button>
						</div>
					</div>
				</div>
			</Tab>
			<Tab name="Личное дело">
				<div class="block-table !border-0 text-center">
					<div class="grid">
						<div class="c">Добавить запись в личное дело</div>
					</div>
					<div class="grid">
						<div class="th"><textarea name="ld" cols="" rows="5"></textarea></div>
					</div>
					<div class="grid">
						<div class="th"><input value="Записать" type="submit"></div>
					</div>
				</div>
			</Tab>
			<Tab name="Точки входа">
				<div v-if="data['auth'].length" class="block-table !border-0 text-center">
					<div class="grid grid-cols-3">
						<div class="c">Аккаунт</div>
						<div class="c">Дата регистрации</div>
						<div class="c">Последняя авторизация</div>
					</div>
					<div v-for="auth in data['auth']" class="grid grid-cols-3">
						<div class="th">{{ auth['external_id'] }}</div>
						<div class="th">{{ $formatDate(auth['create_time'], 'DD MMM YYYY HH:mm:ss') }}</div>
						<div class="th">
							<template v-if="auth['enter_time'] > 0">
								{{ $formatDate(auth['enter_time'], 'DD MMM YYYY HH:mm:ss') }}
							</template>
							<template>
								-
							</template>
						</div>
					</div>
				</div>
				<div class="block-table !border-0 text-center">
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
	import { refreshNuxtData, useApiSubmit, useSuccessNotification } from '#imports';
	import ChangePasswordForm from '~/components/Page/Options/ChangePasswordForm.vue';

	defineProps({
		data: Object,
	});

	const formRef = ref(null);
	const timezones = ref([]);

	for (let i = -12; i <= 12; i++) {
		timezones.value.push(i);
	}

	function send() {
		useApiSubmit('/options', new FormData(formRef.value), () => {
			useSuccessNotification('Настройки успешно изменены');

			refreshNuxtData();
		});
	}
</script>