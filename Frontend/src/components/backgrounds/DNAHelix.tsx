import { motion } from "framer-motion";
import { useMemo } from "react";

interface HelixNode {
    id: number;
    y: number;
    phase: number;
}

export function DNAHelix({ className = "" }: { className?: string }) {
    const nodes = useMemo<HelixNode[]>(
        () =>
            Array.from({ length: 20 }, (_, i) => ({
                id: i,
                y: i * 5,
                phase: i * 18,
            })),
        [],
    );

    return (
        <div
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
            aria-hidden
        >
            <div className="absolute left-[8%] top-0 bottom-0 w-32 opacity-30">
                <motion.div
                    className="relative h-full"
                    animate={{ rotateY: 360 }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        transformStyle: "preserve-3d",
                        perspective: 600,
                    }}
                >
                    {nodes.map((node) => {
                        const angle = (node.phase * Math.PI) / 180;
                        const x1 = 50 + Math.cos(angle) * 30;
                        const x2 = 50 + Math.cos(angle + Math.PI) * 30;
                        return (
                            <div
                                key={node.id}
                                className="absolute w-full"
                                style={{ top: `${node.y}%` }}
                            >
                                {/* Left strand node */}
                                <motion.div
                                    className="absolute h-2.5 w-2.5 rounded-full"
                                    style={{
                                        left: `${x1}%`,
                                        background: "#00D9FF",
                                        boxShadow: "0 0 8px rgba(0, 217, 255, 0.6)",
                                    }}
                                    animate={{
                                        opacity: [0.5, 1, 0.5],
                                        scale: [0.8, 1.1, 0.8],
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: node.id * 0.15,
                                        repeat: Infinity,
                                    }}
                                />
                                {/* Right strand node */}
                                <motion.div
                                    className="absolute h-2.5 w-2.5 rounded-full"
                                    style={{
                                        left: `${x2}%`,
                                        background: "#2563EB",
                                        boxShadow: "0 0 8px rgba(37, 99, 235, 0.6)",
                                    }}
                                    animate={{
                                        opacity: [0.5, 1, 0.5],
                                        scale: [0.8, 1.1, 0.8],
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: node.id * 0.15 + 1,
                                        repeat: Infinity,
                                    }}
                                />
                                {/* Connector */}
                                <div
                                    className="absolute h-px top-1"
                                    style={{
                                        left: `${Math.min(x1, x2) + 2}%`,
                                        width: `${Math.abs(x1 - x2) - 2}%`,
                                        background:
                                            "linear-gradient(to right, rgba(0,217,255,0.4), rgba(37,99,235,0.4))",
                                    }}
                                />
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Second DNA strand (right side, fainter) */}
            <div className="absolute right-[5%] top-0 bottom-0 w-24 opacity-15">
                <motion.div
                    className="relative h-full"
                    animate={{ rotateY: -360 }}
                    transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        transformStyle: "preserve-3d",
                        perspective: 600,
                    }}
                >
                    {nodes.slice(0, 14).map((node) => {
                        const angle = (node.phase * Math.PI) / 180;
                        const x1 = 50 + Math.cos(angle) * 25;
                        const x2 = 50 + Math.cos(angle + Math.PI) * 25;
                        return (
                            <div
                                key={node.id}
                                className="absolute w-full"
                                style={{ top: `${node.y}%` }}
                            >
                                <div
                                    className="absolute h-2 w-2 rounded-full"
                                    style={{
                                        left: `${x1}%`,
                                        background: "#38BDF8",
                                        boxShadow: "0 0 6px rgba(56, 189, 248, 0.4)",
                                    }}
                                />
                                <div
                                    className="absolute h-2 w-2 rounded-full"
                                    style={{
                                        left: `${x2}%`,
                                        background: "#14B8A6",
                                        boxShadow: "0 0 6px rgba(20, 184, 166, 0.4)",
                                    }}
                                />
                                <div
                                    className="absolute h-px top-1"
                                    style={{
                                        left: `${Math.min(x1, x2) + 2}%`,
                                        width: `${Math.abs(x1 - x2) - 2}%`,
                                        background:
                                            "linear-gradient(to right, rgba(56,189,248,0.3), rgba(20,184,166,0.3))",
                                    }}
                                />
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
