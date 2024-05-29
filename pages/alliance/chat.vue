<template>
	<div class="page-alliance-chat">
		<RouterForm action="/alliance/chat">
			<div class="block-table">
				<div class="row">
					<div class="col-12 c">
						<NuxtLinkLocale to="/alliance/chat">Обновить</NuxtLinkLocale>
					</div>
				</div>

				<div v-for="(item, index) in page['items']" class="row">
					<div class="col-2 b text-center">
						{{ $date(item['time'], 'H:i:s') }}
						<br>
						<a :href="'/players/'+item['user_id']+'/'" target="_blank">{{ item['user'] }}</a>
						<a @click.prevent="quote(index)"> -> </a>
					</div>
					<div class="col-9 b">
						<TextViewer v-if="page['parser']" :text="item['text']"/>
						<div v-else>{{ item['text'] }}</div>
					</div>
					<div v-if="page['owner']" class="col-1 b text-center">
						<input name="delete[]" type="checkbox" :value="item['id']" v-model="marked">
					</div>
				</div>

				<div v-if="page['items'].length === 0" class="row">
					<div class="col-12 b" align="center">В альянсе нет сообщений.</div>
				</div>

				<div class="row">
					<div class="col-12 th">
						<Pagination :options="page['pagination']"/>
					</div>
				</div>

				<div v-if="marked.length" class="row">
					<div class="col-12 th">
						<select id="deletemessages" name="delete_type">
							<option value="marked">Удалить выделенные</option>
							<option value="unmarked">Удалить не выделенные</option>
							<option value="all">Удалить все</option>
						</select>
						<input value="Удалить" type="submit">
					</div>
				</div>
			</div>
		</RouterForm>
		<div class="separator"></div>
		<RouterForm action="/alliance/chat">
			<table class="table">
				<tr>
					<td class="c">Отправить сообщение в чат альянса</td>
				</tr>
				<tr>
					<th class="p-a-0">
						<TextEditor v-model="text"/>
					</th>
				</tr>
				<tr>
					<td class="c">
						<input type="reset" value="Очистить">
						<input type="submit" value="Отправить" @click="text = ''">
					</td>
				</tr>
			</table>
		</RouterForm>
		<span style="float:left;margin-left:10px;margin-top:7px;">
			<NuxtLinkLocale to="/alliance">[назад к альянсу]</NuxtLinkLocale>
		</span>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Альянс-чат',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const text = ref('');
	const marked = ref([]);

	function quote (messageIndex) {
		if (typeof page.value['items'][messageIndex] === 'undefined')
			return;

		let message = page.value['items'][messageIndex];

		let text = message['text'];
		text = text.replace(/<br>/gi, "\n");
	    text = text.replace(/<br \/>/gi, "\n");

		text.value = text.value + '[quote author='+message['user']+']'+text+'[/quote]';
	}
</script>