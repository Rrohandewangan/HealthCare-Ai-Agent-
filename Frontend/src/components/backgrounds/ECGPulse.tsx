import { motion } from "framer-motion";

export function ECGPulse({ className = "" }: { className?: string }) {
    return (
        <div
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
            aria-hidden
        >
            <svg
                className="absolute bottom-1/3 left-0 w-full h-24 opacity-30"
                viewBox="0 0 1200 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="ecg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="30%" stopColor="#00D9FF" />
                        <stop offset="50%" stopColor="#2563EB" />
                        <stop offset="70%" stopColor="#00D9FF" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <filter id="ecg-glow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                <motion.path
                    d="M0,50 L200,50 L220,50 L240,20 L260,80 L280,10 L300,90 L320,50 L340,50 L500,50 L520,50 L540,20 L560,80 L580,10 L600,90 L620,50 L640,50 L800,50 L820,50 L840,20 L860,80 L880,10 L900,90 L920,50 L940,50 L1200,50"
                    fill="none"
                    stroke="url(#ecg-grad)"
                    strokeWidth="2"
                    filter="url(#ecg-glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </svg>

            {/* Secondary ECG line */}
            <svg
                className="absolute top-2/3 left-0 w-full h-16 opacity-15"
                viewBox="0 0 1200 100"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M0,50 L300,50 L320,50 L340,30 L360,70 L380,20 L400,80 L420,50 L600,50 L620,50 L640,30 L660,70 L680,20 L700,80 L720,50 L900,50 L920,50 L940,30 L960,70 L980,20 L1000,80 L1020,50 L1200,50"
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1.5,
                    }}
                />
            </svg>
        </div>
    );
}
