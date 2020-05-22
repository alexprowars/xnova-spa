<template>
	<div v-if="!mobile" class="component-chat" :class="{active: active}">
		<div class="block">
			<div class="title" v-on:click="toggleActive">
				Чат
				<span v-if="unread > 0">({{ unread }})</span>
			</div>
			<div v-show="active" class="content border-0">
				<div class="col-12 th">
					<div ref="chatbox" class="page-chat-messages">
						<div v-for="item in messages" class="page-chat-messages-row text-left">
							<span :class="{date1: !item['me'] && !item['my'], date2: !!item['me'], date3: !!item['my']}" v-on:click="toPrivate(item['user'])">{{ item['time']|date('H:m') }}</span>
							<span v-if="item['my']" class="negative">{{ item['user'] }}</span><span v-else class="to" v-on:click="toPlayer(item['user'])">{{ item['user'] }}</span>:
							<span v-if="item['tou'].length" :class="[item['private'] ? 'private' : 'player']">
								{{ item['private'] ? 'приватно' : 'для' }} [<span v-for="(u, i) in item['tou']">{{ i > 0 ? ',' : '' }}<a v-if="!item['private']" v-on:click.prevent="toPlayer(u)">{{ u }}</a><a v-else v-on:click.prevent="toPrivate(u)">{{ u }}</a></span>]
							</span>
							<span class="page-chat-row-message" v-html="item['text']"></span>
						</div>
					</div>
				</div>
				<div class="col-12 th d-flex">
					<input ref="text" class="page-chat-message" type="text" v-model="message" v-on:keypress.13.prevent="sendMessage" maxlength="750">

					<input type="button" value="Отправить" v-on:click.prevent="sendMessage">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'

	export default {
		name: 'chat',
		props: {
			visible: {
				type: Boolean,
				default: false,
			}
		},
		data () {
			return {
				mobile: this.$store.getters.isMobile || !this.visible,
				active: localStorage.getItem('mini-chat-active') === 'Y',
				message: '',
			}
		},
		computed: {
			...mapState('chat', [
				'unread',
			]),
			...mapGetters('chat', [
				'messages',
			]),
		},
		watch: {
			messages () {
				setTimeout(() => {
					this.scrollToBottom()
				}, 250)

				if (this.active) {
					this.$store.commit('chat/clearUnread')
				}
			},
			message () {
				this.$refs['text'].focus()
			},
			visible (value) {
				this.mobile = this.$store.getters.isMobile || !value
			}
		},
		methods: {
			scrollToBottom () {
				if (this.$refs['chatbox']) {
					this.$refs['chatbox'].scrollTop = this.$refs['chatbox'].scrollHeight
				}
			},
			toggleActive ()
			{
				this.active = !this.active

				try {
					localStorage.setItem('mini-chat-active', this.active ? 'Y' : 'N')
				} catch (e) {}

				if (this.active) {
					this.$store.commit('chat/clearUnread')

					this.$nextTick(() => {
						this.scrollToBottom()
					})
				}
			},
			toPlayer (user) {
				this.message = 'для ['+user+'] '+this.message
			},
			toPrivate (user) {
				this.message = 'приватно ['+user+'] '+this.message
			},
			sendMessage ()
			{
				this.smiles = false
				this.$store.dispatch('chat/sendMessage', this.message)
				this.message = ''
			},
			onResize ()
			{
				if (this.active) {
					this.scrollToBottom()
				}
			}
		},
		mounted () {
			window.addEventListener('resize', this.onResize, true)
		},
		destroyed () {
			window.removeEventListener('resize', this.onResize)
		}
	}
</script>