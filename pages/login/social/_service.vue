<script>
	export default {
		name: "login_social",
		async asyncData ({ store }) {
			return await store.dispatch('loadPage')
		},
	}
</script>