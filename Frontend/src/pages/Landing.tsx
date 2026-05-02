import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowRight,
    ShieldCheck,
    Sparkles,
    Cpu,
    MapPin,
    Lock,
    Activity,
    Smartphone,
    WifiOff,
    Zap,
    Heart,
    Brain,
    Stethoscope,
    Pill,
    Thermometer,
    Eye,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";
import { GlassCard } from "@/components/ui/GlassCard";
import { ParticleField, ECGPulse, DNAHelix } from "@/components/backgrounds";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const features = [
    {
        icon: Sparkles,
        title: "GPT-grade triage",
        body: "Structured, schema-validated responses from Azure AI Foundry — every field guaranteed.",
    },
    {
        icon: Lock,
        title: "Zero-knowledge backend",
        body: "We store only metadata. Your symptoms and AI replies live on your devices, end-to-end encrypted.",
    },
    {
        icon: WifiOff,
        title: "Works offline",
        body: "On-device cache + WebRTC sync mean your last sessions are always one tap away — even at 30,000 ft.",
    },
    {
        icon: MapPin,
        title: "Nearest care, instantly",
        body: "Hospital, clinic, or pharmacy — geolocated and ranked, with cached responses for snappy UX.",
    },
    {
        icon: Smartphone,
        title: "Multi-device sync",
        body: "Pair your phone, tablet, and watch. SAS-relayed envelopes; backend never sees the payload.",
    },
    {
        icon: Cpu,
        title: "Built for scale",
        body: "Modular monolith, optimistic concurrency, and rate-limited APIs ready for production traffic.",
    },
];

const floatingCards = [
    { icon: Heart, label: "Heart Rate", value: "72 BPM", color: "#00D9FF", x: -180, y: -80 },
    { icon: Thermometer, label: "Temperature", value: "98.6°F", color: "#2563EB", x: 200, y: -60 },
    { icon: Brain, label: "AI Analysis", value: "Active", color: "#14B8A6", x: -200, y: 80 },
    { icon: Eye, label: "Vision Check", value: "20/20", color: "#38BDF8", x: 210, y: 100 },
    { icon: Pill, label: "Medications", value: "2 Active", color: "#00D9FF", x: -120, y: 180 },
    { icon: Stethoscope, label: "Last Check", value: "2h ago", color: "#2563EB", x: 140, y: 190 },
];

export default function Landing() {
    const parallax = useMouseParallax(0.02);

    return (
        <div>
            {/* ═══ HERO SECTION ═══ */}
            <section className="relative min-h-screen overflow-hidden">
                {/* Background layers */}
                <ParticleField count={50} />
                <ECGPulse />

                {/* Holographic grid */}
                <div className="absolute inset-0 holo-grid opacity-20" />

                <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 relative z-10">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Badge tone="mint" className="px-3 py-1.5 neon-glow">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inset-0 rounded-full bg-neon-cyan animate-ping opacity-75" />
                                    <span className="relative h-2 w-2 rounded-full bg-neon-cyan" />
                                </span>
                                Now powered by GPT-4.1 on Azure AI Foundry
                            </Badge>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05, duration: 0.6 }}
                            className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-balance"
                        >
                            Your symptoms,{" "}
                            <span className="gradient-text-hero neon-text">
                                decoded in seconds.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12, duration: 0.6 }}
                            className="mt-6 max-w-2xl text-lg text-zinc-400 text-balance font-body"
                        >
                            VITALIS is an AI triage companion that runs across
                            your devices — private by design, fast by default,
                            and trained to know when to say{" "}
                            <span className="text-white font-medium">
                                "see a doctor now."
                            </span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="mt-10 flex flex-wrap items-center justify-center gap-3"
                        >
                            <Button size="lg" className="neon-glow">
                                <Link to="/register" className="contents">
                                    Start free triage{" "}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="secondary">
                                <Link to="/login" className="contents">
                                    View demo
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Animated health stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35, duration: 0.8 }}
                            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-zinc-500"
                        >
                            <span className="inline-flex items-center gap-1.5">
                                <ShieldCheck className="h-3.5 w-3.5 text-neon-cyan" />{" "}
                                HIPAA-style controls
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Lock className="h-3.5 w-3.5 text-neon-cyan" />{" "}
                                End-to-end encrypted sync
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Zap className="h-3.5 w-3.5 text-neon-cyan" />{" "}
                                &lt; 800ms p50 latency
                            </span>
                        </motion.div>
                    </div>

                    {/* ═══ 3D AVATAR SECTION WITH FLOATING CARDS ═══ */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative mx-auto mt-20 max-w-3xl h-[400px] flex items-center justify-center"
                    >
                        {/* Hologram AI avatar */}
                        <motion.div
                            className="relative z-10"
                            style={{ x: parallax.x * -2, y: parallax.y * -2 }}
                        >
                            {/* Outer glow ring */}
                            <motion.div
                                className="absolute -inset-16 rounded-full"
                                style={{
                                    background: "radial-gradient(circle, rgba(0,217,255,0.08) 0%, transparent 70%)",
                                }}
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />

                            {/* Rotating rings */}
                            <motion.div
                                className="absolute -inset-12 rounded-full border border-neon-cyan/20"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute -inset-20 rounded-full border border-neon-blue/10"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Heartbeat animation */}
                            <motion.div
                                className="relative w-32 h-32 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 flex items-center justify-center neon-glow-strong backdrop-blur-xl border border-neon-cyan/30"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Activity className="h-14 w-14 text-neon-cyan" strokeWidth={1.5} />

                                {/* Heartbeat pulse rings */}
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute inset-0 rounded-full border border-neon-cyan/30"
                                        animate={{
                                            scale: [1, 2.5],
                                            opacity: [0.4, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            delay: i * 0.7,
                                            repeat: Infinity,
                                            ease: "easeOut",
                                        }}
                                    />
                                ))}
                            </motion.div>

                            {/* Voice wave animation */}
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-1">
                                {Array.from({ length: 7 }, (_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 rounded-full bg-neon-cyan/60"
                                        animate={{
                                            height: [4, 12 + Math.random() * 16, 4],
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            delay: i * 0.1,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Floating medical cards around the avatar */}
                        {floatingCards.map((card, i) => (
                            <motion.div
                                key={card.label}
                                className="absolute glass-card !rounded-xl !p-3 w-[140px] cursor-default"
                                style={{
                                    left: `calc(50% + ${card.x}px)`,
                                    top: `calc(50% + ${card.y}px)`,
                                    x: parallax.x * (i % 2 === 0 ? 1 : -1),
                                    y: parallax.y * (i % 2 === 0 ? 1 : -1),
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 200 }}
                                whileHover={{ scale: 1.1, zIndex: 20 }}
                            >
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{
                                        duration: 3 + i * 0.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <card.icon
                                            className="h-3.5 w-3.5"
                                            style={{ color: card.color }}
                                        />
                                        <span className="text-[10px] text-zinc-500 font-mono">
                                            {card.label}
                                        </span>
                                    </div>
                                    <p
                                        className="text-sm font-display font-semibold"
                                        style={{ color: card.color }}
                                    >
                                        {card.value}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}

                        {/* Floating symptom checker button */}
                        <motion.div
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                        >
                            <Link to="/triage">
                                <motion.button
                                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/30 text-neon-cyan text-sm font-medium backdrop-blur-xl neon-glow"
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,217,255,0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ y: { duration: 2, repeat: Infinity } }}
                                >
                                    <Sparkles className="h-4 w-4" />
                                    AI Symptom Checker
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* ═══ HERO CHAT CARD ═══ */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        className="relative mx-auto mt-24 max-w-5xl"
                    >
                        <div className="absolute -inset-x-6 -top-6 -bottom-6 rounded-[2rem] bg-gradient-to-tr from-neon-cyan/20 via-neon-blue/10 to-neon-teal/10 blur-2xl" />
                        <div className="relative rounded-3xl glass-strong p-2 shadow-2xl neon-glow">
                            <div className="rounded-[1.4rem] bg-ink-950/80 border border-white/[0.06] overflow-hidden">
                                <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
                                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/70" />
                                    <span className="ml-3 text-xs text-zinc-500 font-mono">
                                        triage.vitalis.app
                                    </span>
                                </div>
                                <div className="grid md:grid-cols-[1fr_320px]">
                                    <div className="p-6 space-y-4">
                                        <ChatBubble who="you">
                                            I've had a sharp pain in my lower
                                            right abdomen for ~6 hours, getting
                                            worse. Mild fever.
                                        </ChatBubble>
                                        <ChatBubble who="ai" typing>
                                            Analyzing… checking against 14
                                            differential diagnoses.
                                        </ChatBubble>
                                        <ChatBubble who="ai">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Badge tone="rose">
                                                        URGENT
                                                    </Badge>
                                                    <span className="text-xs text-zinc-400">
                                                        Confidence 0.82
                                                    </span>
                                                </div>
                                                <p className="text-sm">
                                                    These symptoms are
                                                    consistent with possible
                                                    appendicitis.{" "}
                                                    <strong>
                                                        Please go to an ER
                                                        within 1 hour.
                                                    </strong>
                                                </p>
                                            </div>
                                        </ChatBubble>
                                    </div>
                                    <aside className="border-t md:border-t-0 md:border-l border-white/[0.06] p-6 bg-white/[0.02]">
                                        <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
                                            Nearest care
                                        </p>
                                        {[
                                            {
                                                n: "St. Mary's ER",
                                                d: "0.8 mi · Open 24h",
                                            },
                                            {
                                                n: "Mercy Urgent Care",
                                                d: "1.2 mi · Open until 11pm",
                                            },
                                            {
                                                n: "Riverside Hospital",
                                                d: "2.4 mi · Open 24h",
                                            },
                                        ].map((f) => (
                                            <div
                                                key={f.n}
                                                className="group flex items-center gap-3 -mx-2 px-2 py-2.5 rounded-lg hover:bg-white/[0.04] cursor-pointer"
                                            >
                                                <span className="h-9 w-9 rounded-lg bg-neon-cyan/10 grid place-items-center text-neon-cyan">
                                                    <MapPin className="h-4 w-4" />
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">
                                                        {f.n}
                                                    </p>
                                                    <p className="text-xs text-zinc-500 truncate">
                                                        {f.d}
                                                    </p>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-neon-cyan transition" />
                                            </div>
                                        ))}
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ MARQUEE ═══ */}
            <section className="border-y border-white/[0.04] bg-white/[0.01]">
                <div className="mx-auto max-w-7xl overflow-hidden">
                    <div className="flex gap-16 py-6 animate-[shimmer_30s_linear_infinite] whitespace-nowrap text-sm text-zinc-500">
                        {[
                            "Azure AI Foundry",
                            "MongoDB Atlas",
                            "Google Maps Platform",
                            "WebRTC",
                            "Azure Blob Storage",
                            "Application Insights",
                            "Microsoft Entra ID",
                        ]
                            .concat([
                                "Azure AI Foundry",
                                "MongoDB Atlas",
                                "Google Maps Platform",
                                "WebRTC",
                                "Azure Blob Storage",
                            ])
                            .map((b, i) => (
                                <span
                                    key={i}
                                    className="font-display tracking-wide"
                                >
                                    {b}
                                </span>
                            ))}
                    </div>
                </div>
            </section>

            {/* ═══ FEATURES ═══ */}
            <section className="relative mx-auto max-w-7xl px-6 py-24 overflow-hidden">
                <DNAHelix className="opacity-20" />

                <div className="relative z-10 max-w-2xl">
                    <Badge tone="mint">Why VITALIS</Badge>
                    <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight text-balance">
                        Engineered like an OS.
                        <br />
                        <span className="gradient-text">
                            Designed like a friend.
                        </span>
                    </h2>
                </div>

                <div className="relative z-10 mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((f, i) => (
                        <GlassCard key={f.title} delay={i * 0.05}>
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-neon-cyan/10 text-neon-cyan ring-1 ring-neon-cyan/20 group-hover:bg-neon-cyan/15 transition">
                                <f.icon className="h-5 w-5" />
                            </span>
                            <h3 className="mt-5 font-display text-lg font-semibold">
                                {f.title}
                            </h3>
                            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                                {f.body}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* ═══ ARCHITECTURE ═══ */}
            <section className="relative mx-auto max-w-7xl px-6 py-24 overflow-hidden">
                <ParticleField count={20} color="rgba(37, 99, 235, 0.3)" />

                <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
                    <div>
                        <Badge tone="violet">Architecture</Badge>
                        <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-balance">
                            Privacy isn't a feature.
                            <br />
                            <span className="gradient-text">It's the foundation.</span>
                        </h2>
                        <p className="mt-5 text-zinc-400 leading-relaxed font-body">
                            Your symptoms are processed at the edge. The backend
                            brokers AI calls and signs short-lived blob URLs —
                            but never persists prompts, completions, or raw
                            chats. Sync envelopes are client-encrypted before
                            they ever touch our infrastructure.
                        </p>
                        <ul className="mt-8 space-y-3 text-sm">
                            {[
                                "JWT (15min) + opaque rotating refresh w/ reuse-detection",
                                "SHA-256 token hashing at rest, TTL-purged",
                                "AsyncLocalStorage correlation IDs across every log",
                                "PHI-key redaction in Winston before disk",
                            ].map((s) => (
                                <li
                                    key={s}
                                    className="flex items-start gap-3 text-zinc-300"
                                >
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-neon-cyan/10 to-neon-blue/10 blur-2xl" />
                        <div className="relative rounded-2xl glass-strong p-6 font-mono text-xs leading-relaxed neon-glow">
                            <p className="text-zinc-500">
                                # sample triage envelope
                            </p>
                            <pre className="mt-3 text-zinc-300 whitespace-pre-wrap">{`{
  "sessionId": "8c2…",
  "severity": "URGENT",
  "confidence": 0.82,
  "summaryHash": "sha256:…",
  "modelVersion": "gpt-4.1-mini",
  "advice": [
    "Go to ER within 1h",
    "Do not eat or drink"
  ]
}`}</pre>
                            <p className="mt-4 text-zinc-500">
                                # what we DON'T store
                            </p>
                            <p className="mt-1 text-rose-400">
                                prompt · ai_response · chat_history
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="mx-auto max-w-7xl px-6 pb-24">
                <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-16 text-center neon-glow">
                    <div className="absolute inset-0 bg-grid-fade" />
                    <ECGPulse className="opacity-20" />
                    <Activity
                        className="relative mx-auto h-10 w-10 text-neon-cyan"
                        strokeWidth={2.4}
                    />
                    <h2 className="relative mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance">
                        Health questions don't keep office hours.
                    </h2>
                    <p className="relative mt-4 text-zinc-400 max-w-xl mx-auto font-body">
                        Get an AI triage in under a minute. Free while in beta.
                    </p>
                    <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Button size="lg" className="neon-glow">
                            <Link to="/register" className="contents">
                                Create your account{" "}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline">
                            <Link to="/login" className="contents">
                                Sign in
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ChatBubble({
    who,
    children,
    typing,
}: {
    who: "you" | "ai";
    children: React.ReactNode;
    typing?: boolean;
}) {
    const isUser = who === "you";
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    isUser
                        ? "bg-gradient-to-r from-neon-cyan to-neon-blue text-ink-950 rounded-br-sm font-medium"
                        : "bg-white/[0.05] border border-white/[0.08] rounded-bl-sm text-zinc-200"
                }`}
            >
                {typing ? (
                    <span className="inline-flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-bounce [animation-delay:120ms]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-bounce [animation-delay:240ms]" />
                        <span className="ml-2">{children}</span>
                    </span>
                ) : (
                    children
                )}
            </div>
        </div>
    );
}
