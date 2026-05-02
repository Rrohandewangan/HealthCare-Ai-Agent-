import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "relative rounded-2xl glass p-6 overflow-hidden",
                "before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
                className,
            )}
            {...rest}
        />
    );
}

export function Badge({
    children,
    tone = "default",
    className,
}: {
    children: React.ReactNode;
    tone?: "default" | "mint" | "amber" | "rose" | "violet";
    className?: string;
}) {
    const tones = {
        default: "bg-white/5 text-zinc-300 border-white/10",
        mint: "bg-mint-300/10 text-mint-300 border-mint-300/20",
        amber: "bg-amber-300/10 text-amber-300 border-amber-300/20",
        rose: "bg-rose-400/10 text-rose-300 border-rose-400/20",
        violet: "bg-violet-400/10 text-violet-300 border-violet-400/20",
    } as const;
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
                tones[tone],
                className,
            )}
        >
            {children}
        </span>
    );
}
