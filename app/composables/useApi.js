import { showError, navigateTo, startLoading, stopLoading, useErrorNotification } from '#imports';
import useStore from '~/store';

export const useApiGet = async (url, params = {}) => {
	if (!url.startsWith('/')) {
		url = '/' + url;
	}

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

	if (!url.startsWith('/')) {
		url = '/' + url;
	}

	try {
		const result = await $fetch('/api' + url, {
			method: 'post', body: data, headers: { 'X-Requested-With': 'XMLHttpRequest' }, retry: false
		});

		return handleResult(result);
	} catch (e) {
		return handleError(e);
	}
}

export const useApiSubmit = async (url, data = {}, callback, error) => {
	startLoading();

	try {
		const result = await useApiPost(url, data);

		if (typeof callback === 'function') {
			callback?.(result);
		}
	} catch (e) {
		if (e.message) {
			useErrorNotification(e.message);
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

		return data['data'];
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