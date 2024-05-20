<template>
	<span :class="style">
		{{ $number(value) }}
	</span>
</template>

<script>
	export default {
		name: "colored",
		props: {
			value: {
				type: Number,
				default: 0,
			}
		},
		computed: {
			style () {
				return (this.value > 0 ? 'positive' : (this.value < 0 ? 'negative' : ''))
			}
		}
	}
</script>