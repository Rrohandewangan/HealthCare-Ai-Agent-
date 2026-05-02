import { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, Props>(
    ({ label, hint, error, icon, className, ...rest }, ref) => {
        const id = useId();
        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2"
                    >
                        {label}
                    </label>
                )}
                <div
                    className={cn(
                        "group relative flex items-center gap-3 h-12 rounded-xl px-4",
                        "bg-white/[0.04] border border-white/[0.08] backdrop-blur",
                        "transition-colors focus-within:border-mint-300/50 focus-within:bg-white/[0.06]",
                        error &&
                            "border-red-400/60 focus-within:border-red-400",
                    )}
                >
                    {icon && (
                        <span className="text-zinc-500 group-focus-within:text-mint-300">
                            {icon}
                        </span>
                    )}
                    <input
                        id={id}
                        ref={ref}
                        className={cn(
                            "flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none",
                            className,
                        )}
                        {...rest}
                    />
                </div>
                {(hint || error) && (
                    <p
                        className={cn(
                            "mt-1.5 text-xs",
                            error ? "text-red-400" : "text-zinc-500",
                        )}
                    >
                        {error || hint}
                    </p>
                )}
            </div>
        );
    },
);
Input.displayName = "Input";
