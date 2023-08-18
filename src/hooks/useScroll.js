import { useEffect, useState } from "react";

export function useScroll(offsetY = 0) {
    const [endScreen, setEndScreen] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onScroll = () => {
        // return window height in pexels
        let windowHeight = window.innerHeight;
        // scroll location
        let scrollTop = document.documentElement.scrollTop;
        // all the files inside the window height
        let docHeight = document.documentElement.offsetHeight;
        if (Math.ceil(windowHeight + scrollTop) >= docHeight - offsetY) {
            setEndScreen(true);
        }
    };

    const endScreenFalse = () => {
        setEndScreen(false);
    };

    return [endScreen, endScreenFalse];
}