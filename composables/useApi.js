import { showError, navigateTo } from '#imports';
import useStore from '~/store';

export const useApiGet = (url, params = {}) => {
	return $fetch('/api' + url, {
		method: 'get', params, headers: { 'X-Requested-With': 'XMLHttpRequest' }
	})
	.then((data) => {
		return handleResult(data);
	})
	.catch((e) => {
		return handleError(e);
	})
}

export const useApiPost = (url, data = {}) => {
	if (data.toString().indexOf('FormData') < 0) {
		data = objectToFormData(data);
	}

	return $fetch('/api' + url, {
		method: 'post', body: data, headers: { 'X-Requested-With': 'XMLHttpRequest' }
	})
	.then((data) => {
		return handleResult(data);
	})
	.catch(e => {
		if (e.response?.status === 422) {
			throw e;
		}

		return handleError(e);
	})
}

export const useApiPostWithState = async (url, data = {}) => {
	const result = await useApiPost(url, data);

	useStore().PAGE_LOAD(result);

	return result['data'] || null;
}

function handleError (e) {
	if (typeof e.response === 'undefined') {
		throw new Error(e);
	}

	if (typeof e.response._data !== 'undefined' && typeof e.response._data.message !== 'undefined') {
		throw new Error(e.response._data.message);
	}

	if (typeof e.response._data !== 'undefined' && typeof e.response._data.error !== 'undefined') {
		return showError({
			data: e.response._data,
		});
	}

	if (e.response?.status !== 200) {
		return showError({
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