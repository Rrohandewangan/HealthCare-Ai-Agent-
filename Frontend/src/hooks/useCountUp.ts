import { useEffect, useState, useRef } from "react";

export function useCountUp(
    end: number,
    duration: number = 2000,
    startOnView: boolean = true,
) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(!startOnView);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!startOnView || !ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 },
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [startOnView]);

    useEffect(() => {
        if (!started) return;
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [started, end, duration]);

    return { count, ref };
}
