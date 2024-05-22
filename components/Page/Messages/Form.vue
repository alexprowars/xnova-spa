<template>
	<form action="" method="post" @submit.prevent="send">
		<div v-if="error" v-html="error.message" :class="[error.type]" class="message"></div>
		<div class="block">
			<div class="title">
				Отправка сообщения
			</div>
			<div class="content border-0">
				<div class="block-table form-group">
					<div class="row">
						<div class="col th">
							Получатель
						</div>
					</div>
					<div v-if="to.length" class="row">
						<div class="col c" v-html="to"></div>
					</div>
					<div class="row">
						<div class="col th p-a-0">
							<TextEditor :class="{error: v$.text.$error}" v-model="text"/>
						</div>
					</div>
					<div class="row">
						<div class="col c">
							<input type="submit" value="Отправить">
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</template>

<script setup>
	import { useVuelidate } from '@vuelidate/core'
	import { required } from '@vuelidate/validators'
	import { ref } from 'vue';

	const props = defineProps({
		id: {
			type: Number,
			default: 0,
		},
		to: {
			type: String,
			default: '',
		},
		message: {
			type: String,
			default: '',
		}
	});

	const text = ref(props.message);
	const error = ref(false);

	const validations = {
		text: {
			required
		},
	}

	const v$ = useVuelidate(
		validations,
		{ text },
		{ $autoDirty: true }
	);

	async function send () {
		if (props.id <= 0) {
			return;
		}

		if (!await v$.value.$validate()) {
			return
		}

		post('/messages/write/' + props.id + '/', {
			text: text.value
		})
		.then((result) => {
			if (result.redirect && result.redirect.length) {
				window.location.href = result.redirect
			} else {
				error.value = result.error

				if (error.value['type'] === 'success') {
					text.value = '';
					v$.value.$reset();
				}
			}
		})
	}
</script>