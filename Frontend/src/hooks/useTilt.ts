import { useRef, useCallback, useState } from "react";

interface TiltState {
    rotateX: number;
    rotateY: number;
    scale: number;
}

export function useTilt(intensity: number = 15) {
    const ref = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState<TiltState>({
        rotateX: 0,
        rotateY: 0,
        scale: 1,
    });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -intensity;
            const rotateY = ((x - centerX) / centerX) * intensity;

            setTilt({ rotateX, rotateY, scale: 1.02 });
        },
        [intensity],
    );

    const handleMouseLeave = useCallback(() => {
        setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    }, []);

    return {
        ref,
        tilt,
        handlers: {
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
        },
        style: {
            transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
            transition: "transform 0.15s ease-out",
        },
    };
}
