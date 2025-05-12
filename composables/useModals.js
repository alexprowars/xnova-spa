import { useNuxtApp, useLoadingIndicator } from '#imports';
import { useModal, useModalSlot, useVfm } from 'vue-final-modal'
import Modal from '~/components/Dialogs/Modal.vue'
import ConfirmPopup from '~/components/Dialogs/Confirm.vue'
import { stopLoading } from '~/composables/useLoading.js'
import { useApiGet } from '~/composables/useApi';

export const openPopupModal = (component, attrs = {}, events = {}) => {
	const { open, close } = useModal({
		component: Modal,
		attrs: {
			...events,
		},
		slots: {
			default: useModalSlot({
				component,
				attrs: {
					...attrs,
					onClose() {
						close?.()
					}
				},
			})
		}
	});

	return open?.();
}

export const openConfirmModal = (title, content, buttons = []) => {
	const { open, close } = useModal({
		component: Modal,
		slots: {
			default: useModalSlot({
				component: ConfirmPopup,
				attrs: {
					title, content, buttons,
					onClose() {
						close?.()
					}
				},
			})
		}
	});

	return open?.();
}

export const openAlertModal = (title, content) => {
	stopLoading();

	const { open, close } = useModal({
		component: Modal,
		slots: {
			default: useModalSlot({
				component: ConfirmPopup,
				attrs: {
					title, content,
					onClose() {
						close?.()
					}
				},
			})
		}
	});

	return open?.();
}

export const openAjaxPopupModal = async (component, url, attrs = {}, events = {}) => {
	const { start, finish } = useLoadingIndicator();

	start();

	const result = await useApiGet(url);

	finish();

	attrs = attrs || {};
	attrs.page = result;

	await openPopupModal(component, attrs, events);
}

export const openErrorModal = (e) => {
	stopLoading();

	const { t } = useNuxtApp().$i18n;

	openAlertModal(t?.('forms.error'), e.message);
}

export const closeModals = async () => {
	await useVfm().closeAll();
}