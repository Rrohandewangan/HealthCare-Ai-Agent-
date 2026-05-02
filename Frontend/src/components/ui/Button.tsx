import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
}

const variants: Record<Variant, string> = {
    primary:
        "text-ink-950 bg-gradient-to-br from-mint-300 to-cyan-400 hover:shadow-[0_8px_30px_-8px_rgba(94,234,212,0.6)] hover:-translate-y-px active:translate-y-0",
    secondary:
        "text-white bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.10]",
    ghost: "text-zinc-200 hover:bg-white/[0.06]",
    outline:
        "text-mint-300 border border-mint-300/30 hover:border-mint-300/60 hover:bg-mint-300/[0.06]",
};

const sizes: Record<Size, string> = {
    sm: "h-9 px-3.5 text-sm rounded-lg",
    md: "h-11 px-5 text-sm rounded-xl",
    lg: "h-13 px-7 text-base rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, Props>(
    (
        {
            variant = "primary",
            size = "md",
            loading,
            className,
            children,
            disabled,
            ...rest
        },
        ref,
    ) => (
        <button
            ref={ref}
            disabled={disabled || loading}
            className={cn(
                "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ring-focus disabled:opacity-50 disabled:cursor-not-allowed select-none",
                variants[variant],
                sizes[size],
                className,
            )}
            {...rest}
        >
            {loading && (
                <span className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
            )}
            {children}
        </button>
    ),
);
Button.displayName = "Button";
