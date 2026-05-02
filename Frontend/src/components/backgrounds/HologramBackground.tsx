import { motion } from "framer-motion";

export function HologramBackground({ className = "" }: { className?: string }) {
    return (
        <div
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
            aria-hidden
        >
            {/* Holographic scanning rings */}
            {[1, 2, 3].map((ring) => (
                <motion.div
                    key={ring}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                    style={{
                        width: `${ring * 200}px`,
                        height: `${ring * 200}px`,
                        borderColor: `rgba(0, 217, 255, ${0.15 / ring})`,
                    }}
                    animate={{
                        rotate: ring % 2 === 0 ? 360 : -360,
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        rotate: { duration: 20 + ring * 5, repeat: Infinity, ease: "linear" },
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    }}
                >
                    {/* Dots on the ring */}
                    {Array.from({ length: 4 }, (_, i) => (
                        <motion.div
                            key={i}
                            className="absolute h-1.5 w-1.5 rounded-full bg-neon-cyan"
                            style={{
                                top: i === 0 ? "-3px" : i === 2 ? "auto" : "50%",
                                bottom: i === 2 ? "-3px" : "auto",
                                left: i === 3 ? "-3px" : i === 1 ? "auto" : "50%",
                                right: i === 1 ? "-3px" : "auto",
                                transform: i === 0 || i === 2 ? "translateX(-50%)" : "translateY(-50%)",
                                boxShadow: "0 0 6px rgba(0, 217, 255, 0.8)",
                            }}
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                        />
                    ))}
                </motion.div>
            ))}

            {/* Pulsing center rings */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={`pulse-${i}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-cyan/20"
                    style={{ width: 100, height: 100 }}
                    animate={{
                        scale: [1, 3, 5],
                        opacity: [0.4, 0.1, 0],
                    }}
                    transition={{
                        duration: 4,
                        delay: i * 1.3,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
            ))}

            {/* HUD Grid lines */}
            <div className="absolute inset-0 holo-grid opacity-30" />

            {/* Floating HUD data panels */}
            <motion.div
                className="absolute top-[15%] right-[10%] w-48 h-24 rounded-lg border border-neon-cyan/10 bg-neon-cyan/[0.02]"
                animate={{ y: [0, -8, 0], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="p-3 text-[10px] font-mono text-neon-cyan/40 space-y-1">
                    <div>SYS:VITALIS_AI v4.1</div>
                    <div>STATUS: ACTIVE</div>
                    <div className="flex gap-1">
                        {Array.from({ length: 8 }, (_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-neon-cyan/30 rounded-full"
                                animate={{ height: [4, 12 + Math.random() * 8, 4] }}
                                transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-[20%] left-[8%] w-40 h-20 rounded-lg border border-neon-blue/10 bg-neon-blue/[0.02]"
                animate={{ y: [0, 6, 0], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="p-3 text-[10px] font-mono text-neon-blue/40 space-y-1">
                    <div>NEURAL_NET: READY</div>
                    <div>CONFIDENCE: 0.94</div>
                    <div>NODES: 2,847</div>
                </div>
            </motion.div>

            {/* Corner brackets */}
            {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
                <div
                    key={i}
                    className={`absolute ${pos} w-8 h-8 opacity-20`}
                    style={{
                        borderTop: i < 2 ? "1px solid rgba(0,217,255,0.4)" : "none",
                        borderBottom: i >= 2 ? "1px solid rgba(0,217,255,0.4)" : "none",
                        borderLeft: i % 2 === 0 ? "1px solid rgba(0,217,255,0.4)" : "none",
                        borderRight: i % 2 === 1 ? "1px solid rgba(0,217,255,0.4)" : "none",
                    }}
                />
            ))}
        </div>
    );
}
