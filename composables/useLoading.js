export const useLoading = () => useState('loading', () => false);

let loaderTimeout;

export const startLoading = (force = false) => {
	const loading = useLoading();

	stopLoading();

	if (typeof force === true) {
		loading.value = true;
	} else {
		loaderTimeout = setTimeout(() => {
			loading.value = true;
		}, 500)
	}
}

export const stopLoading = () => {
	const loading = useLoading();

	clearTimeout(loaderTimeout)

	loading.value = false;
}