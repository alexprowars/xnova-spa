<template>
	<form action="" method="post" @submit.prevent="send">
		<div v-if="error" v-html="error.message" :class="[error.type]" class="message"></div>
		<div class="block">
			<div class="title">
				Отправка сообщения
			</div>
			<div class="content border-0">
				<div class="table form-group">
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
							<text-editor :class="{error: $v.text.$error}" @change="$v.text.$touch()" v-model="text"></text-editor>
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

<script>
	import { required } from 'vuelidate/lib/validators'

	export default {
		name: "message-form",
		props: {
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
		},
		data () {
			return {
				text: '',
				error: false
			}
		},
		validations: {
			text: {
				required
			},
		},
		created () {
			this.text = this.message
		},
		methods: {
			send ()
			{
				if (id <= 0)
					return

				this.$v.$touch()

				if (!this.$v.$invalid)
				{
					this.$post('/messages/write/'+this.id+'/', {
						'text': this.text
					})
					.then((result) =>
					{
						if (result.redirect && result.redirect.length)
							window.location.href = result.redirect
						else
						{
							this.error = result.error

							if (this.error.type === 'success')
							{
								this.text = ''
								this.$v.$reset()
							}
						}
					})
				}
			}
		},
	}
</script>