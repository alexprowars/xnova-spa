<template>
	<div v-if="missile['interceptor'] > 0 || missile['interplanetary'] > 0" class="block">
		<div class="title">Уничтожитель ракет</div>
		<div class="content border-0">
			<RouterForm :action="'/info/'+item+'/'">
				<input type="hidden" name="missiles" value="Y">
				<div class="block-table">
					<div v-if="missile['interceptor'] > 0" class="row">
						<div class="col th">{{ $t('tech.502') }}: {{ missile['interceptor'] }}</div>
						<div class="col th"><Number name="interceptor" v-model="interceptor"/></div>
					</div>
					<div v-if="missile['interplanetary'] > 0" class="row">
						<div class="col th">{{ $t('tech.502') }}: {{ missile['interplanetary'] }}</div>
						<div class="col th"><Number name="interplanetary" v-model="interplanetary"/></div>
					</div>
					<div v-if="interceptor > 0 || interplanetary > 0" class="row">
						<div class="col th">
							<input type="submit" value="Уничтожить">
						</div>
					</div>
				</div>
			</RouterForm>
		</div>
	</div>
</template>

<script>
	export default {
		name: "info-missile",
		props: {
			item: {
				type: Number,
			},
			missile: {
				type: Object,
			}
		},
		data () {
			return {
				interceptor: 0,
				interplanetary: 0
			}
		}
	}
</script>