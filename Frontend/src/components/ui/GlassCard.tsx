import { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
    tiltIntensity?: number;
    glowColor?: string;
    hoverLift?: number;
    delay?: number;
}

export function GlassCard({
    children,
    className,
    tiltIntensity = 8,
    glowColor = "rgba(0, 217, 255, 0.15)",
    delay = 0,
    ...rest
}: GlassCardProps) {
    const { ref, tilt, handlers, style } = useTilt(tiltIntensity);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay }}
            className={cn("relative group", className)}
            style={style}
            {...handlers}
            {...(rest as any)}
        >
            {/* Glow border on hover */}
            <div
                className="absolute -inset-px rounded-[1.3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, ${glowColor}, transparent 40%, ${glowColor})`,
                }}
            />

            {/* Card body */}
            <div className="relative glass-card p-6 h-full">
                {/* Top shine line */}
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Content */}
                {children}
            </div>
        </motion.div>
    );
}
