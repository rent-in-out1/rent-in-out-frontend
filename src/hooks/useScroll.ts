import { useEffect, useState } from 'react';

export function useScroll(offsetY: number = 0) {
	const [endScreen, setEndScreen] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	const onScroll = () => {
		// return window height in pexels
		const windowHeight = window.innerHeight;
		// scroll location
		const scrollTop = document.documentElement.scrollTop;
		// all the files inside the window height
		const docHeight = document.documentElement.offsetHeight;
		if (Math.ceil(windowHeight + scrollTop) >= docHeight - offsetY) {
			setEndScreen(true);
		}
	};

	const endScreenFalse = () => {
		setEndScreen(false);
	};

	return [endScreen, endScreenFalse];
}
