<template>
	<form action="" method="post" @submit.prevent="send">
		<div class="block-table">
			<div class="row">
				<div class="col c">
					Начать ракетную атаку на [{{ page['galaxy'] }}:{{ page['system'] }}:{{ planet }}]
				</div>
			</div>
			<div class="row">
				<div class="col th">
					Количество ракет ({{ page['user']['interplanetary_misil'] }}):
					<input type="number" style="width:25%" min="1" :max="page['user']['interplanetary_misil']" v-model.number="count">
				</div>
				<div class="col th">
					Цель:
					<select name="target" v-model="target">
						<option value="all">Вся оборона</option>
						<option value="0">{{ $t('tech.401') }}</option>
						<option value="1">{{ $t('tech.402') }}</option>
						<option value="2">{{ $t('tech.403') }}</option>
						<option value="3">{{ $t('tech.404') }}</option>
						<option value="4">{{ $t('tech.405') }}</option>
						<option value="5">{{ $t('tech.406') }}</option>
						<option value="6">{{ $t('tech.407') }}</option>
						<option value="7">{{ $t('tech.408') }}</option>
					</select>
				</div>
			</div>
			<div class="row">
				<div class="col c">
					<button type="submit">Отправить</button>
					<button @click.prevent="$emit('close')">Отмена</button>
				</div>
			</div>
		</div>
		<div class="separator"></div>
	</form>
</template>

<script>
	import { useApiPost } from '~/composables/useApi';
	import useStore from '~/store';

	export default {
		name: "galaxy-missile-attack",
		props: {
			page: {
				type: Object
			},
			planet: {
				type: Number
			}
		},
		data () {
			return {
				target: 'all',
				count: this.page['user']['interplanetary_misil']
			}
		},
		methods: {
			send ()
			{
				useApiPost('/rocket/', {
					galaxy: this.page['galaxy'],
					system: this.page['system'],
					planet: this.planet,
					count: this.count,
					target: this.target
				})
				.then((result) => {
					useStore().PAGE_LOAD(result)
				})
			}
		}
	}
</script>