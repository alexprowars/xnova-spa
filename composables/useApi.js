import { showError, navigateTo, startLoading, stopLoading } from '#imports';
import useStore from '~/store';
import { toast } from 'vue3-toastify';

export const useApiGet = async (url, params = {}) => {
	try {
		const result = await $fetch('/api' + url, {
			method: 'get', params, headers: { 'X-Requested-With': 'XMLHttpRequest' }, retry: false
		});

		return handleResult(result);
	} catch (e) {
		return handleError(e);
	}
}

export const useApiPost = async (url, data = {}) => {
	if (data.toString().indexOf('FormData') < 0) {
		data = objectToFormData(data);
	}

	try {
		const result = await $fetch('/api' + url, {
			method: 'post', body: data, headers: { 'X-Requested-With': 'XMLHttpRequest' }, retry: false
		});

		return handleResult(result);
	} catch (e) {
		if (e.response?.status === 422) {
			throw e;
		}

		return handleError(e);
	}
}

export const useApiSubmit = async (url, data = {}, callback) => {
	startLoading();

	try {
		const result = await useApiPost(url, data);

		if (typeof callback === 'function') {
			callback?.(result);
		}
	} catch (e) {
		if (e.message) {
			toast(e.message, { type: 'error' });
		}
	} finally {
		stopLoading();
	}
}

function handleError (e) {
	if (typeof e.response === 'undefined') {
		throw new Error(e);
	}

	if (typeof e.response._data !== 'undefined' && typeof e.response._data.message !== 'undefined') {
		throw new Error(e.response._data.message);
	}

	if (typeof e.response._data !== 'undefined' && typeof e.response._data.error !== 'undefined') {
		throw showError({
			data: e.response._data,
		});
	}

	if (typeof e.response._data !== 'undefined' && typeof e.response._data.messages !== 'undefined' && e.response._data.messages.length) {
		useStore().PAGE_LOAD(e.response._data);
		throw new ReferenceError(e);
	}

	if (e.response?.status !== 200) {
		throw showError({
			statusCode: e.response.status,
			statusMessage: e.response?.statusText,
		});
	}

	return parseData(e.response._data);
}

function handleResult (data) {
	if (typeof data === 'string') {
		throw new Error(data)
	}

	return parseData(data)
}

function parseData (data) {
	if (data !== undefined) {
		if (typeof data['redirect'] !== 'undefined') {
			navigateTo({ path: data['redirect'], force: true });
		}

		if (data.data !== undefined && Array.isArray(data.data) && data.data.length === 0) {
			data.data = null;
		}

		return data;
	} else {
		throw new Error("request error");
	}
}

function objectToFormData (obj, rootName)
{
	let formData = new FormData();

	function appendFormData(data, root) {
		root = root || '';

		if (data instanceof File)
			formData.append(root, data);
		else if (Array.isArray(data)) {
			for (let i = 0; i < data.length; i++)
				appendFormData(data[i], root + '[' + i + ']');
		} else if (typeof data === 'object' && data) {
			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					if (root === '')
						appendFormData(data[key], key);
					else
						appendFormData(data[key], root + '[' + key + ']');
				}
			}
		} else {
			if (data !== null && typeof data !== 'undefined') {
				formData.append(root, data);
			}
		}
	}

	appendFormData(obj, rootName);

	return formData;
}