<template>
	<div class="row flight">
		<div class="th col-4 col-sm-2">
			<div class="z">
				<timer :value="item[0]"></timer>
			</div>
			<span class="positive d-sm-none">{{ $date(item[0], 'd.m H:i:s') }}</span>
		</div>
		<div class="th col-sm-10 col-8 text-start">
			<span class="flight owndeploy">
				<NuxtLinkLocale v-if="item[1] === $state.user.planet" :to="'/buildings/?chpl='+item[1]" style="color:#33ff33;">{{ item[2] }}</NuxtLinkLocale><span v-else>{{ item[2] }}</span>:
			</span>
			<span class="holding colony">{{ item[3] }}</span>
			<span class="positive float-sm-right d-none d-sm-inline">{{ $date(item[0], 'd.m H:i:s') }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "overview-queue-row",
		props: {
			item: Array
		}
	}
</script>