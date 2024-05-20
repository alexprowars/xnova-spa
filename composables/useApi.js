export const useApiGet = (url, params = undefined) => {
	if (params === undefined) {
		params = {};
	}

	params['_'] = Math.random();

	return $fetch('/api' + url, {
		method: 'get', params
	})
	.then(({ data }) => {
		return handleResult(data);
	})
	.catch((e) => {
		return handleError(e);
	})
}

export const useApiPost = (url, data) => {
	data = data || {}

	if (data.toString().indexOf('FormData') < 0) {
		data = objectToFormData(data);
	}

	return $fetch('/api' + url, {
		method: 'post', body: data
	})
	.then(({ data }) => {
		return handleResult(data);
	})
	.catch((e) => {
		return handleError(e);
	})
}

function handleError (e) {
	if (typeof e.response === 'undefined') {
		throw new Error(e)
	}

	if (e.response && typeof e.response.data === 'object' && typeof e.response.data.data === 'object') {
		throw new Error(e.response.data.data.message)
	}

	if (e.response && e.response.status !== 200) {
		return error({message: e.response.statusText, statusCode: e.response.status})
	}

	return parseData(e.response.data.data)
}

function handleResult (data) {
	if (typeof data === 'string') {
		throw new Error(data)
	}

	return parseData(data)
}

function parseData (data) {
	if (data !== undefined) {
		if (data.page !== undefined && Array.isArray(data.page) && data.page.length === 0) {
			data.page = null
		}

		return data
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