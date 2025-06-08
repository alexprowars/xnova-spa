<template>
	<div class="page-info">
		<div class="page-info-description block">
			<div class="title">{{ $t('tech.' + page['i']) }}</div>
			<div class="content flex gap-2 p-2">
				<div>
					<img v-if="page['i'] < 600" :src="'/images/gebaeude/'+page['i']+'.gif'" class="info" height="120" width="120" alt="">
					<img v-else-if="page['i'] < 700" :src="'/images/officiers/'+page['i']+'.jpg'" class="info" height="120" width="120" alt="">
					<img v-else :src="'/images/skin/race'+(page['i'] - 700)+'.gif'" style="float:left;margin:0 20px 10px 0" height="35" width="35" alt="">
				</div>
				<div v-html="$t('info.' + page['i'])"></div>
			</div>
		</div>

		<InfoProduction v-if="page['production']" :item="page['i']" :production="page['production']"/>
		<InfoFleet v-if="page['fleet']" :item="page['i']" :fleet="page['fleet']"/>
		<InfoDefence v-if="page['defence']" :item="page['i']" :defence="page['defence']"/>
		<InfoMissile v-if="page['missile']" :item="page['i']"/>
		<InfoAlliance v-if="page['alliance']" :item="page['i']" :data="page['alliance']"/>

		<InfoDestroy v-if="page['destroy']" :item="page['i']" :data="page['destroy']"/>
	</div>
</template>

<script setup>
	import InfoProduction from '~/components/Page/Info/Production.vue';
	import InfoFleet from '~/components/Page/Info/Fleet.vue';
	import InfoDefence from '~/components/Page/Info/Defence.vue';
	import InfoDestroy from '~/components/Page/Info/Destroy.vue';
	import InfoMissile from '~/components/Page/Info/Missile.vue';
	import InfoAlliance from '~/components/Page/Info/Alliance.vue';

	defineProps({
		page: {
			type: Object
		}
	})
</script>