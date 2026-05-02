import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

export function ParticleField({
    count = 40,
    color = "rgba(0, 217, 255, 0.4)",
    className = "",
}: {
    count?: number;
    color?: string;
    className?: string;
}) {
    const particles = useMemo<Particle[]>(
        () =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                duration: Math.random() * 8 + 6,
                delay: Math.random() * 5,
                opacity: Math.random() * 0.5 + 0.2,
            })),
        [count],
    );

    return (
        <div
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
            aria-hidden
        >
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: color,
                    }}
                    animate={{
                        y: [0, -30, 10, -20, 0],
                        x: [0, 15, -10, 20, 0],
                        opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
