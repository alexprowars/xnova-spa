export function addScript (url)
{
	let script = document.createElement('script');
	script.setAttribute('src', url);

	document.head.appendChild(script);
}

export const isMobile = () => {
	return typeof window !== 'undefined' ? /Android|Mini|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent) : false
};