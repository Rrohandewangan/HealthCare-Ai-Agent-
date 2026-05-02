import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Activity,
    ArrowUpRight,
    HeartPulse,
    MapPin,
    ShieldCheck,
    Sparkles,
    Brain,
    Globe,
    Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth.store";
import { api, unwrap } from "@/lib/api";
import { Badge } from "@/components/ui/Card";
import { GlassCard } from "@/components/ui/GlassCard";
import { timeAgo } from "@/lib/utils";
import { NeuralNetwork, ECGPulse, ParticleField } from "@/components/backgrounds";

type Session = {
    id: string;
    severity?: "INFO" | "ROUTINE" | "URGENT" | "EMERGENCY";
    lastActiveAt?: string;
    metadata?: { msgCount?: number; locale?: string; modelVersion?: string };
};

export default function Dashboard() {
    const { user } = useAuth();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/sessions", { params: { limit: 5 } })
            .then((r) =>
                setSessions(unwrap<{ items: Session[] }>(r as any).items ?? []),
            )
            .catch(() => setSessions([]))
            .finally(() => setLoading(false));
    }, []);

    const stats = [
        {
            icon: HeartPulse,
            label: "Total sessions",
            value: sessions.length || "—",
            color: "#00D9FF",
            glow: "rgba(0,217,255,0.15)",
        },
        {
            icon: ShieldCheck,
            label: "Linked devices",
            value: "1",
            color: "#2563EB",
            glow: "rgba(37,99,235,0.15)",
        },
        {
            icon: Sparkles,
            label: "Plan",
            value: "Beta",
            color: "#14B8A6",
            glow: "rgba(20,184,166,0.15)",
        },
    ];

    return (
        <div className="relative mx-auto max-w-7xl px-6 pb-24 overflow-hidden">
            {/* ═══ Neural Network + ECG Background ═══ */}
            <NeuralNetwork className="!fixed opacity-20" />
            <ECGPulse className="!fixed opacity-10" />
            <ParticleField count={15} color="rgba(0,217,255,0.2)" className="!fixed" />

            <header className="relative z-10 pt-6 pb-10">
                <p className="text-sm text-zinc-400 font-body">
                    Welcome back
                    {user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
                </p>
                <h1 className="mt-1 font-display text-3xl sm:text-4xl font-bold tracking-tight">
                    How are you <span className="gradient-text">feeling today?</span>
                </h1>
            </header>

            {/* ═══ Stats ═══ */}
            <div className="relative z-10 grid gap-4 sm:grid-cols-3">
                {stats.map((s, i) => (
                    <GlassCard key={s.label} delay={i * 0.08} glowColor={s.glow}>
                        <div className="flex items-center justify-between">
                            <span
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                                style={{
                                    background: `${s.color}15`,
                                    border: `1px solid ${s.color}25`,
                                }}
                            >
                                <s.icon className="h-5 w-5" style={{ color: s.color }} />
                            </span>
                            <span className="text-xs font-medium text-zinc-500">{s.label}</span>
                        </div>
                        <p className="mt-5 font-display text-3xl font-bold">
                            {s.value}
                        </p>
                    </GlassCard>
                ))}
            </div>

            {/* ═══ Action Cards ═══ */}
            <div className="relative z-10 mt-6 grid gap-4 lg:grid-cols-3">
                <ActionCard
                    to="/triage"
                    icon={Activity}
                    title="Start AI triage"
                    body="Describe your symptoms — get a structured assessment in seconds."
                    color="#00D9FF"
                />
                <ActionCard
                    to="/facilities"
                    icon={MapPin}
                    title="Find nearby care"
                    body="Locate hospitals, clinics, and pharmacies around you."
                    color="#2563EB"
                />
                <ActionCard
                    to="/sessions"
                    icon={HeartPulse}
                    title="Review past sessions"
                    body="Browse your previous triages and outcomes."
                    color="#14B8A6"
                />
            </div>

            {/* ═══ Recent Sessions ═══ */}
            <section className="relative z-10 mt-10">
                <div className="flex items-end justify-between mb-4">
                    <h2 className="font-display text-xl font-bold">
                        Recent sessions
                    </h2>
                    <Link
                        to="/sessions"
                        className="text-xs text-neon-cyan hover:text-neon-sky inline-flex items-center gap-1 transition"
                    >
                        View all <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                <div className="glass-card !p-0 overflow-hidden neon-glow">
                    {loading ? (
                        <SkeletonRows />
                    ) : sessions.length === 0 ? (
                        <div className="p-12 text-center">
                            <motion.div
                                className="mx-auto mb-4 w-14 h-14 rounded-full bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Brain className="h-6 w-6 text-neon-cyan" />
                            </motion.div>
                            <p className="text-zinc-400 font-body">No sessions yet.</p>
                            <Link
                                to="/triage"
                                className="mt-4 inline-flex items-center gap-2 text-neon-cyan hover:text-neon-sky transition"
                            >
                                Start your first triage{" "}
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                    ) : (
                        <ul className="divide-y divide-white/[0.06]">
                            {sessions.map((s) => (
                                <SessionRow key={s.id} s={s} />
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </div>
    );
}

function ActionCard({
    to,
    icon: Icon,
    title,
    body,
    color,
}: {
    to: string;
    icon: any;
    title: string;
    body: string;
    color: string;
}) {
    return (
        <Link to={to} className="group">
            <GlassCard glowColor={`${color}20`}>
                <div
                    className="absolute -top-20 -right-10 h-44 w-44 rounded-full blur-3xl opacity-40"
                    style={{
                        background: `radial-gradient(circle, ${color}30, transparent 70%)`,
                    }}
                />
                <Icon className="relative h-6 w-6" style={{ color }} />
                <h3 className="relative mt-5 font-display text-lg font-semibold">
                    {title}
                </h3>
                <p className="relative mt-2 text-sm text-zinc-400 font-body">{body}</p>
                <ArrowUpRight className="absolute top-6 right-6 h-4 w-4 text-zinc-500 group-hover:text-neon-cyan transition" />
            </GlassCard>
        </Link>
    );
}

function SessionRow({ s }: { s: Session }) {
    const tone =
        s.severity === "EMERGENCY"
            ? "rose"
            : s.severity === "URGENT"
              ? "amber"
              : s.severity === "ROUTINE"
                ? "mint"
                : "default";
    return (
        <li className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition">
            <span className="font-mono text-xs text-zinc-500 w-20 truncate">
                {s.id.slice(0, 8)}…
            </span>
            <div className="flex-1 min-w-0">
                <p className="text-sm">
                    {s.metadata?.msgCount ?? 0} messages ·{" "}
                    {s.metadata?.locale ?? "en"}
                </p>
                <p className="text-xs text-zinc-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {timeAgo(s.lastActiveAt)} ·{" "}
                    <span className="font-mono">
                        {s.metadata?.modelVersion ?? "—"}
                    </span>
                </p>
            </div>
            {s.severity && <Badge tone={tone}>{s.severity}</Badge>}
        </li>
    );
}

function SkeletonRows() {
    return (
        <ul className="divide-y divide-white/[0.06]">
            {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex items-center gap-4 px-6 py-4">
                    <div className="h-3 w-16 rounded bg-white/[0.06]" />
                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/2 rounded bg-white/[0.06]" />
                        <div className="h-2.5 w-1/3 rounded bg-white/[0.04]" />
                    </div>
                    <div className="h-6 w-16 rounded-full bg-white/[0.06]" />
                </li>
            ))}
        </ul>
    );
}
