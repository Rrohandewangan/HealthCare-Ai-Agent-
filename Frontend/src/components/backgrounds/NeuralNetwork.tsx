import { motion } from "framer-motion";
import { useMemo } from "react";

interface Node {
    id: number;
    x: number;
    y: number;
    size: number;
}

interface Edge {
    from: number;
    to: number;
}

export function NeuralNetwork({ className = "" }: { className?: string }) {
    const { nodes, edges } = useMemo(() => {
        const n: Node[] = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
        }));

        const e: Edge[] = [];
        for (let i = 0; i < n.length; i++) {
            const closest = n
                .map((other, j) => ({
                    j,
                    dist: Math.hypot(n[i].x - other.x, n[i].y - other.y),
                }))
                .filter((d) => d.j !== i && d.dist < 30)
                .sort((a, b) => a.dist - b.dist)
                .slice(0, 2);
            closest.forEach((c) => {
                if (!e.find((edge) => (edge.from === c.j && edge.to === i) || (edge.from === i && edge.to === c.j))) {
                    e.push({ from: i, to: c.j });
                }
            });
        }
        return { nodes: n, edges: e };
    }, []);

    return (
        <div
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
            aria-hidden
        >
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <linearGradient id="neural-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(0,217,255,0.15)" />
                        <stop offset="50%" stopColor="rgba(37,99,235,0.25)" />
                        <stop offset="100%" stopColor="rgba(0,217,255,0.15)" />
                    </linearGradient>
                </defs>
                {edges.map((edge, i) => (
                    <motion.line
                        key={i}
                        x1={`${nodes[edge.from].x}%`}
                        y1={`${nodes[edge.from].y}%`}
                        x2={`${nodes[edge.to].x}%`}
                        y2={`${nodes[edge.to].y}%`}
                        stroke="url(#neural-line)"
                        strokeWidth="0.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            delay: Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>

            {nodes.map((node) => (
                <motion.div
                    key={node.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        width: node.size,
                        height: node.size,
                        background: node.id % 3 === 0 ? "#00D9FF" : node.id % 3 === 1 ? "#2563EB" : "#14B8A6",
                        boxShadow: `0 0 ${node.size * 3}px ${node.id % 3 === 0 ? "rgba(0,217,255,0.5)" : "rgba(37,99,235,0.5)"}`,
                    }}
                    animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        delay: Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* AI pulse wave */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(0,217,255,0.1) 0%, transparent 70%)",
                }}
                animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.3, 0.05, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
