<template>
	<div class="block page-support-detail">
		<div class="title text-center">
			Текст обращения
		</div>
		<div class="content">
			<div class="block-table">
				<div class="grid">
					<div class="th text-left" v-html="item['message']"></div>
				</div>
				<div v-if="item['status'] === 0" class="grid">
					<div class="c">Закрыт</div>
				</div>
				<div v-else>
					<div class="grid">
						<div class="c">Ответ</div>
					</div>
					<div class="grid">
						<div class="th">
							<TextEditor v-model="message"/>
						</div>
					</div>
					<div class="grid">
						<div class="c">
							<button @click.prevent="answer">Ответить</button>
							<button @click.prevent="emit('close')">Закрыть</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { openAlertModal, useApiPost, useSuccessNotification } from '#imports';
	import { ref } from 'vue';

	const props = defineProps({
		item: Object,
	});

	const emit = defineEmits(['close']);

	const message = ref('');

	async function answer () {
		try {
			await useApiPost('/support/answer/' + props.item['id'], {
				message: message.value,
			});

			useSuccessNotification('Запрос добавлен');

			emit('close');
		} catch (e) {
			await openAlertModal(null, e);
		}
	}
</script>