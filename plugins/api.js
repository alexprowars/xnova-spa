import qs from 'qs'

export default ({ res, store, $axios, error }, inject) =>
{
	$axios.setHeader('X-Requested-With', 'XMLHttpRequest');
	$axios.defaults.timeout = 15000;

	const $get = (url, data) =>
	{
		if (data === undefined)
			data = {}

		data['_'] = Math.random()

		return $axios({
			method: 'get',
			url: url,
			params: data
		})
		.then(result => {
			return handleResult(result, res)
		})
		.catch((e) => {
			return handleError(e)
		})
	}

	const $post = (url, data) =>
	{
		let headers = {}

		data = data || {}

		if (!process.server)
		{
			if (data.toString().indexOf('FormData') < 0)
				data = objectToFormData(data)

			headers['Content-Type'] = 'multipart/form-data'
		}
		else
		{
			headers['Content-Type'] = 'application/x-www-form-urlencoded'

			data = qs.stringify(data);
		}

		return $axios({
			url: url,
			method: 'post',
			data: data,
			headers: headers
		})
		.then(result => {
			return handleResult(result, res)
		})
		.catch((e) => {
			return handleError(e)
		})
	}

	inject('get', $get)
	inject('post', $post)
}

function handleError (e)
{
	if (typeof e.response === 'undefined')
		throw new Error(e)

	if (e.response && typeof e.response.data === 'object' && typeof e.response.data.data === 'object')
		throw new Error(e.response.data.data.message)

	if (e.response && e.response.status !== 200)
		return error({message: e.response.statusText, statusCode: e.response.status})

	return parseData(e.response.data.data)
}

function handleResult (result, res)
{
	if (process.server && result.headers['set-cookie'])
		res.setHeader('Set-Cookie', result.headers['set-cookie'])

	if (typeof result.data === 'string')
		throw new Error(result.data)

	return parseData(result.data.data)
}

function parseData (data)
{
	if (data !== undefined)
	{
		if (data.page !== undefined && Array.isArray(data.page) && data.page.length === 0)
			data.page = null

		return data
	}
	else
		throw new Error("request error");
}

function objectToFormData (obj, rootName)
{
	let formData = new FormData();

	function appendFormData(data, root)
	{
		root = root || '';

		if (data instanceof File)
			formData.append(root, data);
		else if (Array.isArray(data))
		{
			for (let i = 0; i < data.length; i++)
				appendFormData(data[i], root + '[' + i + ']');
		}
		else if (typeof data === 'object' && data)
		{
			for (let key in data)
			{
				if (data.hasOwnProperty(key))
				{
					if (root === '')
						appendFormData(data[key], key);
					else
						appendFormData(data[key], root + '[' + key + ']');
				}
			}
		}
		else
		{
			if (data !== null && typeof data !== 'undefined')
				formData.append(root, data);
		}
	}

	appendFormData(obj, rootName);

	return formData;
}