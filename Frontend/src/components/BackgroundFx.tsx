import { motion } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";

/** Decorative animated background orbs + grid + particles. Pointer-events: none. */
export function BackgroundFx() {
    const parallax = useMouseParallax(0.015);

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-bg opacity-[0.35]" />

            {/* Gradient mesh base */}
            <div className="absolute inset-0 bg-gradient-mesh opacity-60" />

            {/* Primary orb - cyan */}
            <motion.div
                className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-3xl"
                style={{
                    background:
                        "radial-gradient(circle, rgba(0,217,255,0.2), transparent 60%)",
                    x: parallax.x * 2,
                    y: parallax.y * 2,
                }}
                animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Secondary orb - blue */}
            <motion.div
                className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full blur-3xl"
                style={{
                    background:
                        "radial-gradient(circle, rgba(37,99,235,0.18), transparent 60%)",
                    x: parallax.x * -1.5,
                    y: parallax.y * -1.5,
                }}
                animate={{ x: [0, -40, 30, 0], y: [0, -50, 20, 0] }}
                transition={{
                    duration: 26,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Tertiary orb - teal */}
            <motion.div
                className="absolute bottom-[-200px] left-1/3 h-[420px] w-[420px] rounded-full blur-3xl"
                style={{
                    background:
                        "radial-gradient(circle, rgba(20,184,166,0.15), transparent 60%)",
                    x: parallax.x,
                    y: parallax.y,
                }}
                animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Floating micro particles */}
            {Array.from({ length: 15 }, (_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 80}%`,
                        width: Math.random() * 2 + 1,
                        height: Math.random() * 2 + 1,
                        background: i % 2 === 0 ? "rgba(0,217,255,0.4)" : "rgba(37,99,235,0.4)",
                    }}
                    animate={{
                        y: [0, -(20 + Math.random() * 30), 0],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        delay: Math.random() * 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Noise texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-noise" />
        </div>
    );
}
