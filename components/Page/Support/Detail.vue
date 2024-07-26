<template>
	<div class="block page-support-detail">
		<div class="title text-center">
			Текст обращения
		</div>
		<div class="content border-0">
			<div class="block-table">
				<div class="row">
					<div class="col th text-start" v-html="item['message']"></div>
				</div>
				<div v-if="item['status'] === 0" class="row">
					<div class="col c">Закрыт</div>
				</div>
				<div v-else>
					<div class="row">
						<div class="col c">Ответ</div>
					</div>
					<div class="row">
						<div class="col th">
							<TextEditor v-model="message"/>
						</div>
					</div>
					<div class="row">
						<div class="col c">
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
	import { openAlertModal, useApiPost } from '#imports';
	import { ref } from 'vue';
	import { toast } from 'vue3-toastify';

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

			toast('Запрос добавлен', {
				type: 'success',
			});

			emit('close');
		} catch (e) {
			await openAlertModal(null, e);
		}
	}
</script>