import Vue from 'vue'
import Modal from '~/components/views/modal.vue'
import * as ModalDialogs from 'vue-modal-dialogs'
import { useApiGet } from '~/composables/useApi';

Vue.use(ModalDialogs)

export default ({ app }, inject) =>
{
  	const modal = {
		show (modal, props, events)
		{
			const popup = ModalDialogs.create(Modal)
			popup({
				component: modal,
				props: props || {},
				events: events || {},
			})
		},
		showAjax (modal, url, props, events)
		{
			app.router.app.$loading.start()

			useApiGet(url, {
				popup: 'Y'
			})
			.then((result) =>
			{
				app.router.app.$loading.finish()

				props = props || {}
				props.page = result['page']

				const popup = ModalDialogs.create(Modal)
				popup({
					component: modal,
					props: props || {},
					events: events || {},
				})
			})
		},
		alert (props) {
			Vue.nextTick(() =>
			{
				const popup = ModalDialogs.create(Confirm)
				popup({...props})
			})
		},
		close () {
			app.$bus.$emit('closeModals')
		},
	}

	inject('modal', modal)
}