import AnimateScroll from 'js-animate-scroll';

export const useAnimateScroll = (element?: String | Element, duration = 500, options = {}) => {
	if (typeof element === 'string') {
		element = document.querySelector(element)!;
	}

	if (!element) {
		return;
	}

	new AnimateScroll(element, {
		duration,
		...Object.assign({
			easing: 'linear',
			padding: 25,
		}, options)
	})
}