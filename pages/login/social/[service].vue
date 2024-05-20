<script>
	import { defineNuxtComponent } from '#imports';
	import useStore from '~/store';

	export default defineNuxtComponent({
		name: "login_social",
		async asyncData () {
			await useStore().loadPage();

			return {}
		},
	})
</script>