<template>
	<div>
		<RouterForm v-if="page['vacation']" action="/options/save/">
			<table class="table">
				<tbody>
					<tr>
						<td class="c" colspan="2">Режим отпуска</td>
					</tr>
					<tr>
					</tr>
					<tr>
						<th colspan="2">Режим отпуска включён до: <br/>{{ dayjs(page['um_end_date']).tz().format('DD MMM YYYY HH:mm:ss') }}</th>
					</tr>
					<tr>
						<th>Имя</th>
						<th><input name="username" size="20" :value="page['opt_usern_data']" type="hidden">{{ page['opt_usern_data'] }}</th>
					</tr>
					<tr>
						<th><a title="Режим отпуска нужен для защиты планет во время вашего отсутствия.">Включить режим отпуска</a></th>
						<th><input name="vacation" v-model="page['opt_modev_data']" type="checkbox" title=""></th>
					</tr>
					<tr>
						<th><a title="Профиль будет удалён через 7 дней.">Удалить профиль</a></th>
						<th><input name="delete" v-model="page['opt_delac_data']" type="checkbox" title=""></th>
					</tr>
					<tr>
						<th colspan="2"><input type="submit" value="Сохранить изменения"/></th>
					</tr>
				</tbody>
			</table>
		</RouterForm>

		<RouterForm v-else action="/options/save/">
			<Tabs>
				<Tab name="Информация">
					<table class="table">
						<tbody>
							<tr>
								<th width="50%">
									Ник
									<br>
									<span class="negative">Можно менять не чаще раза в сутки</span>
								</th>
								<th>
									<input v-if="page['opt_usern_datatime']" name="username" size="20" :value="page['opt_usern_data']" type="text" title="" autocomplete="username">
									<template v-else>{{ page['opt_usern_data'] }}</template>
								</th>
							</tr>
							<template v-if="page['opt_isemail']">
								<tr>
									<th>Старый пароль</th>
									<th><input name="password" size="20" value="" type="password" title="" autocomplete="current-password"></th>
								</tr>
								<tr>
									<th>Новый пароль (мин. 8 Знаков)</th>
									<th><input name="new_password" size="20" maxlength="40" type="password" title="" autocomplete="new-password"></th>
								</tr>
								<tr>
									<th>Новый пароль (повтор)</th>
									<th><input name="new_password_confirm" size="20" maxlength="40" type="password" title="" autocomplete="new-password"></th>
								</tr>
							</template>
							<tr>
								<th>Адрес e-mail (логин)</th>
								<th>
									<input v-if="!page['opt_isemail']" type="text" name="email" value="" title="">
									<template v-else>
										{{ page['opt_mail_data'] }} <NuxtLinkLocale to="/options/email/" class="button">сменить</NuxtLinkLocale>
									</template>
								</th>
							</tr>
							<tr>
								<th>Пол</th>
								<th><select name="sex" title="">
									<option value="M">мужской</option>
									<option value="F" :selected="page['sex'] === 2" >женский</option>
								</select></th>
							</tr>
							<tr>
								<th colspan="2"><input value="Сохранить изменения" type="submit"></th>
							</tr>
						</tbody>
					</table>
				</Tab>
				<Tab name="Интерфейс">
					<table class="table">
						<tbody>
							<tr>
								<th rowspan="2" width="50%">Упорядочить планеты по:</th>
								<th>
									<select name="settings_sort" style='width:170px' title="" v-model="page['options']['planet_sort']">
										<option value="0">Времени колонизации</option>
										<option value="1">Координатам</option>
										<option value="2">Алфавитному порядку</option>
										<option value="3">Типу</option>
									</select>
								</th>
							</tr>
							<tr>
								<th>
									<select name="settings_order" style='width:170px' title="" v-model="page['options']['planet_sort_order']">
										<option value="0">Возрастанию</option>
										<option value="1">Убыванию</option>
									</select>
								</th>
							</tr>
							<tr>
								<th>Кол-во отправляемых шпионских зондов в меню "Космос"</th>
								<th><input name="spy" :value="page['options']['spy']" type="text" title=""></th>
							</tr>
							<tr>
								<th>Участвовать в рекордах</th>
								<th><input name="records" v-model="page['options']['records']" type="checkbox" title=""></th>
							</tr>
							<tr>
								<th>Использовать BB коды в сообщениях</th>
								<th><input name="bbcode" v-model="page['options']['bb_parser']" type="checkbox" title=""></th>
							</tr>
							<tr>
								<th>Показывать только доступные постройки</th>
								<th><input name="available" v-model="page['options']['only_available']" type="checkbox" title=""></th>
							</tr>
							<tr>
								<th>Показывать панель чата</th>
								<th><input name="chatbox" v-model="page['options']['chatbox']" type="checkbox" title=""></th>
							</tr>
							<tr>
								<th>Цвет ваших сообщений в чате</th>
								<th>
									<select name="color" style='width:170px' title="" v-model="page['options']['color']">
										<option v-for="id in Object.keys($tm('colors')).filter((c) => $t('colors.' + c + '.1') !== '')" :value="id" :style="'color:'+$t('colors.' + id + '.0')">{{ $t('colors.' + id + '.1') }}</option>
									</select>
								</th>
							</tr>
							<tr>
								<th>Часовой пояс</th>
								<th>
									<select name="timezone" style="width:170px" v-model="page['options']['timezone']">
										<option :value="null">Системный</option>
										<option v-for="i in timezones" :value="i">{{ i > 0 ? '+' + i : i }}</option>
									</select>
								</th>
							</tr>
							<tr>
								<th>Аватар</th>
								<th>
									<template v-if="page['avatar'] !== ''">
										<img :src="page['avatar']" height="100" alt=""><br>
										<label>
											<input type="checkbox" name="image_delete" value="Y">
											Удалить
										</label>
										<br><br>
									</template>

									<input type="file" name="image" value=""><br>
									<small>Картинки уменьшаются до размера в 300x300 пикселей</small>
								</th>
							</tr>
							<tr>
								<th colspan="2"><input value="Сохранить изменения" type="submit"></th>
							</tr>
						</tbody>
					</table>
				</Tab>
				<Tab name="Описание">
					<table class="table">
						<tbody>
							<tr>
								<th colspan="2" class="p-a-0">
									<TextEditor :text="page['about']"/>
								</th>
							</tr>
							<tr>
								<th colspan="2"><input value="Сохранить изменения" type="submit"></th>
							</tr>
						</tbody>
					</table>
				</Tab>
				<Tab name="Отпуск / Удаление">
					<table class="table">
						<tbody>
							<tr>
								<th width="50%"><a title="Режим отпуска нужен для защиты планет во время вашего отсутствия">Включить режим отпуска</a></th>
								<th><input name="vacation" v-model="page['opt_modev_data']" type="checkbox" title=""></th>
							</tr>
							<tr>
								<th colspan="2">
									<span class="negative">Режим отпуска включается минимум на 2 суток!<br>Пока это время не прошло, выключить режим отпуска НЕВОЗМОЖНО!</span>
								</th>
							</tr>
							<tr>
								<th><a title="Профиль будет удалён через 7 дней">Удалить профиль</a></th>
								<th><input name="delete" v-model="page['opt_delac_data']" type="checkbox" title=""></th>
							</tr>
							<tr>
								<th colspan="2">
									<span class="negative">Ваш профиль будет удален спустя несколько дней, в течение которых вы можете отменить данную процедуру.</span>
								</th>
							</tr>
							<tr>
								<th colspan="2"><input value="Сохранить изменения" type="submit"></th>
							</tr>
						</tbody>
					</table>
				</Tab>
				<Tab name="Личное дело">
					<table class="table">
						<tbody>
							<tr>
								<td class="c">Добавить запись в личное дело</td>
							</tr>
							<tr>
								<th><textarea name="ld" cols="" rows="5" title=""></textarea></th>
							</tr>
							<tr>
								<th><input value="Записать" type="submit"></th>
							</tr>
						</tbody>
					</table>
				</Tab>
				<Tab name="Точки входа">
					<table v-if="page['auth'].length" class="table">
						<tbody>
							<tr>
								<td class="c">Аккаунт</td>
								<td class="c">Дата регистрации</td>
								<td class="c">Последняя авторизация</td>
							</tr>
							<tr v-for="auth in page['auth']">
								<th>{{ auth['external_id'] }}</th>
								<th>{{ dayjs(auth['create_time']).tz().format('DD MMM YYYY HH:mm:ss') }}</th>
								<th>
									<template v-if="auth['enter_time'] > 0">
										{{ dayjs(auth['enter_time']).tz().format('DD MMM YYYY HH:mm:ss') }}
									</template>
									<template>
										-
									</template>
								</th>
							</tr>
						</tbody>
					</table>
					<table class="table">
						<tbody>
							<tr>
								<td class="c">Привязать аккаунт к социальным сетям</td>
							</tr>
							<tr>
								<th>
								</th>
							</tr>
						</tbody>
					</table>
				</Tab>
			</Tabs>
		</RouterForm>

		<template v-if="typeof page['bot_auth'] === 'object'">
			<br><br>
			<div class="block-table">
				<div class="row">
					<div class="col-12 th">
						Ваш код для привязки Telegram-бота:<br><br><b>{{ page['bot_auth']['code'] }}</b>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import dayjs from 'dayjs';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Hacтpoйки',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const timezones = ref([]);

	for (let i = -12; i <= 12; i++) {
		timezones.value.push(i);
	}
</script>