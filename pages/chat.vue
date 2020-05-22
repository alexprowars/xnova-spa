<template>
	<div class="page-chat">
		<div class="col-12 th">
			<div ref="chatbox" class="page-chat-messages">
				<div v-for="item in messages" class="page-chat-messages-row text-left">
					<span :class="{date1: !item['me'] && !item['my'], date2: !!item['me'], date3: !!item['my']}" @click="toPrivate(item['user'])">{{ item['time']|date('H:i') }}</span>
					<span v-if="item['my']" class="negative">{{ item['user'] }}</span><span v-else class="to" @click="toPlayer(item['user'])">{{ item['user'] }}</span>:
					<span v-if="item['tou'].length" :class="[item['private'] ? 'private' : 'player']">
						{{ item['private'] ? 'приватно' : 'для' }} [<span v-for="(u, i) in item['tou']">{{ i > 0 ? ',' : '' }}<a v-if="!item['private']" @click.prevent="toPlayer(u)">{{ u }}</a><a v-else @click.prevent="toPrivate(u)">{{ u }}</a></span>]
					</span>
					<span class="page-chat-row-message" v-html="item['text']"></span>
				</div>
			</div>
		</div>
		<div class="col-12 th">
			<div class="float-right">
				<div class="editor-component-toolbar d-inline-block">
					<button type="button" class="buttons" title="Вставить ссылку" @click="addTag('[url]|[/url]', 1)">
						<span class="sprite bb_world_link"></span>
					</button>
					<button type="button" class="buttons" title="Вставить картинку" @click="addTag('[img]|[/img]', 3)">
						<span class="sprite bb_picture_add"></span>
					</button>
					<button type="button" class="buttons" title="Смайлы" @click="smiles = !smiles">
						<span class="sprite bb_emoticon_grin"></span>
					</button>
				</div>
				<div v-if="smiles" class="smiles">
					<img v-for="smile in smilesList" :src="'/images/smile/'+smile+'.gif'" :alt="smile" @click="addSmile(smile)">
				</div>
			</div>
			<input ref="text" class="page-chat-message" type="text" v-model="message" @keypress.13.prevent="sendMessage" maxlength="750">

			<input type="button" value="Очистить" @click.prevent="clear">
			<input type="button" value="Отправить" @click.prevent="sendMessage">
		</div>
	</div>
</template>

<script>
	import parser from '~/utils/parser'
	import { mapGetters } from 'vuex'

	export default {
		name: 'chat',
		async asyncData ({ store }) {
			await store.dispatch('loadPage')
		},
		watchQuery: true,
		middleware: 'auth',
		data () {
			return {
				smiles: false,
				smilesList: parser.patterns.smiles,
				message: '',
			}
		},
		computed: {
			...mapGetters('chat', [
				'messages',
			]),
		},
		mounted () {
			this.$store.dispatch('chat/loadMessages')

			window.addEventListener('resize', this.scrollToBottom, true)
		},
		beforeDestroy () {
			window.removeEventListener('resize', this.scrollToBottom)
		},
		watch: {
			message () {
				this.$refs['text'].focus()
			},
			messages () {
				setTimeout(() => {
					this.scrollToBottom()
				}, 250)

				if (this.active) {
					this.$store.commit('chat/clearUnread')
				}
			},
		},
		methods: {
			scrollToBottom ()
			{
				if (this.$refs['chatbox']) {
					this.$refs['chatbox'].scrollTop = this.$refs['chatbox'].scrollHeight
				}
			},
			addTag (tag, type)
			{
				let len = this.message.length;
				let start = this.$refs.text.selectionStart;
				let end = this.$refs.text.selectionEnd;

				let rep = parser.addTag(tag, this.message.substring(start, end), type)

				this.message = this.message.substring(0, start) + rep + this.message.substring(end, len)
			},
			addSmile (smile)
			{
				this.message = this.message+' :'+smile+':';
				this.smiles = false;
			},
			toPlayer (user) {
				this.message = 'для ['+user+'] '+this.message
			},
			toPrivate (user) {
				this.message = 'приватно ['+user+'] '+this.message
			},
			clear () {
				this.$store.dispatch('chat/clear')
				this.smiles = false
			},
			sendMessage ()
			{
				this.smiles = false
				this.$store.dispatch('chat/sendMessage', this.message)
				this.message = ''
			},
		},
	}
</script>