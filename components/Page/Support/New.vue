<template>
	<div class="block page-support-new">
		<div class="title text-center">
			Новый запрос
		</div>
		<div class="content border-0">
			<div class="block-table">
				<div class="row">
					<div class="col-3 th">Тема:</div>
					<div class="col-9 th">
						<input type="text" v-model="subject" class="width-full" name="subject">
					</div>
				</div>
				<div class="row">
					<div class="col-3 th">Текст сообщения:</div>
					<div class="col-9 th">
						<text-editor v-model="text"></text-editor>
					</div>
				</div>
				<div class="row">
					<div class="col c">
						<input type="button" value="Отправить" @click="request">
						<input type="button" value="Закрыть" @click="$emit('close')">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useApiPost } from '~/composables/useApi';
	import useStore from '~/store';
	import { openAlertModal } from '~/composables/useModals';

	export default {
		name: "support-new",
		data () {
			return {
				text: '',
				subject: ''
			}
		},
		methods: {
			request () {
				useApiPost('/support/add/', {
					subject: this.subject,
					text: this.text
				})
				.then((result) => {
					if (result.error) {
						openAlertModal(
							result.error.title, result.error.message
						);
					} else {
						useStore().PAGE_LOAD(result)
						this.$emit('close');
					}
				})
			}
		}
	}
</script>