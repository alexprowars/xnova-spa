<template>
	<div class="block page-support-detail">
		<div class="title text-center">
			Текст обращения
		</div>
		<div class="content border-0">
			<div class="block-table">
				<div class="row">
					<div class="col th text-start" v-html="item['text']"></div>
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
							<TextEditor v-model="text"/>
						</div>
					</div>
					<div class="row">
						<div class="col c">
							<input type="button" value="Ответить" @click="answer">
							<input type="button" value="Закрыть" @click="$emit('close')">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useApiPost } from '~/composables/useApi';
	import useStore from '~/store';
	import { navigateTo, openAlertModal } from '#imports';

	export default {
		name: "support-detail",
		props: ['item'],
		data () {
			return {
				text: ''
			}
		},
		methods: {
			answer () {
				useApiPost('/support/answer/' + this.item['id'], {
					text: this.text
				})
				.then((result) => {
					if (result.error && (result.error.type === 'error' || result.error.type === 'success')) {
						openAlertModal(
							result.error.title, result.error.message,
						);

						if (result.error.type === 'success') {
							navigateTo('/support/', { replace: true });
							this.$emit('close');
						}
					} else {
						useStore().PAGE_LOAD(result)
					}
				})
			}
		}
	}
</script>