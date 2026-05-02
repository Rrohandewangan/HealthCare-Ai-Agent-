/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Sora", "'Space Grotesk'", "Inter", "sans-serif"],
                body: ["Poppins", "Inter", "sans-serif"],
                mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
            },
            colors: {
                ink: {
                    950: "#020617",
                    900: "#0F172A",
                    850: "#0d1320",
                    800: "#111827",
                    700: "#1f2937",
                },
                mint: {
                    300: "#5eead4",
                    400: "#2dd4bf",
                    500: "#14b8a6",
                },
                cyan: {
                    300: "#67e8f9",
                    400: "#00D9FF",
                    500: "#06b6d4",
                },
                neon: {
                    blue: "#2563EB",
                    cyan: "#00D9FF",
                    sky: "#38BDF8",
                    teal: "#14B8A6",
                },
            },
            backgroundImage: {
                "grid-fade":
                    "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,217,255,0.18), transparent 60%)",
                "gradient-mesh":
                    "radial-gradient(ellipse at 20% 50%, rgba(0,217,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(37,99,235,0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(20,184,166,0.10) 0%, transparent 50%)",
                "holo-gradient":
                    "linear-gradient(135deg, rgba(0,217,255,0.08) 0%, rgba(37,99,235,0.06) 50%, rgba(20,184,166,0.04) 100%)",
                noise: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
            },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(8px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "pulse-glow": {
                    "0%,100%": { boxShadow: "0 0 0 0 rgba(0,217,255,0.4)" },
                    "50%": { boxShadow: "0 0 0 18px rgba(0,217,255,0)" },
                },
                float: {
                    "0%,100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "float-slow": {
                    "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
                    "50%": { transform: "translateY(-12px) rotate(2deg)" },
                },
                "ecg-line": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                },
                "spin-slow": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                "spin-reverse": {
                    "0%": { transform: "rotate(360deg)" },
                    "100%": { transform: "rotate(0deg)" },
                },
                "glow-pulse": {
                    "0%,100%": { opacity: "0.4" },
                    "50%": { opacity: "1" },
                },
                "scan-line": {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100%)" },
                },
                "pulse-ring": {
                    "0%": { transform: "scale(0.8)", opacity: "1" },
                    "100%": { transform: "scale(2.4)", opacity: "0" },
                },
                "dna-rotate": {
                    "0%": { transform: "rotateY(0deg)" },
                    "100%": { transform: "rotateY(360deg)" },
                },
                "particle-drift": {
                    "0%,100%": { transform: "translate(0, 0)", opacity: "0.3" },
                    "25%": { transform: "translate(30px, -20px)", opacity: "0.8" },
                    "50%": { transform: "translate(-10px, -40px)", opacity: "0.5" },
                    "75%": { transform: "translate(-30px, -10px)", opacity: "0.7" },
                },
                "heartbeat": {
                    "0%,100%": { transform: "scale(1)" },
                    "14%": { transform: "scale(1.3)" },
                    "28%": { transform: "scale(1)" },
                    "42%": { transform: "scale(1.3)" },
                    "70%": { transform: "scale(1)" },
                },
                "counter-up": {
                    "0%": { transform: "translateY(100%)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
            animation: {
                "fade-up": "fade-up 0.6s ease-out both",
                shimmer: "shimmer 2.4s linear infinite",
                "pulse-glow": "pulse-glow 2.2s ease-out infinite",
                float: "float 6s ease-in-out infinite",
                "float-slow": "float-slow 8s ease-in-out infinite",
                "ecg-line": "ecg-line 3s linear infinite",
                "spin-slow": "spin-slow 20s linear infinite",
                "spin-reverse": "spin-reverse 25s linear infinite",
                "glow-pulse": "glow-pulse 2s ease-in-out infinite",
                "scan-line": "scan-line 4s linear infinite",
                "pulse-ring": "pulse-ring 2s ease-out infinite",
                "dna-rotate": "dna-rotate 12s linear infinite",
                "particle-drift": "particle-drift 8s ease-in-out infinite",
                heartbeat: "heartbeat 1.5s ease-in-out infinite",
                "counter-up": "counter-up 0.6s ease-out both",
            },
        },
    },
    plugins: [],
};
