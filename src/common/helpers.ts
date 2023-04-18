
export const debounced = (cb: () => any, delay: number) => {
	let timer;

	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout((...args) => {
			cb(...args);
		}, delay);
	}
}