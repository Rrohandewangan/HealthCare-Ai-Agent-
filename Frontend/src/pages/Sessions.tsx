import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Filter, Search, Trash2, Heart, Clock, Brain, AlertCircle } from "lucide-react";
import { api, unwrap } from "@/lib/api";
import { Badge } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { timeAgo } from "@/lib/utils";
import { NeuralNetwork, ParticleField } from "@/components/backgrounds";

type Severity = "INFO" | "ROUTINE" | "URGENT" | "EMERGENCY";
type Session = {
    id: string;
    severity?: Severity;
    lastActiveAt?: string;
    metadata?: { msgCount?: number; locale?: string; modelVersion?: string };
};

const FILTERS: (Severity | "ALL")[] = [
    "ALL",
    "INFO",
    "ROUTINE",
    "URGENT",
    "EMERGENCY",
];

const severityConfig: Record<string, { icon: any; color: string; glow: string }> = {
    EMERGENCY: { icon: AlertCircle, color: "#f87171", glow: "rgba(248,113,113,0.15)" },
    URGENT: { icon: Clock, color: "#fbbf24", glow: "rgba(251,191,36,0.15)" },
    ROUTINE: { icon: Heart, color: "#00D9FF", glow: "rgba(0,217,255,0.15)" },
    INFO: { icon: Brain, color: "#14B8A6", glow: "rgba(20,184,166,0.15)" },
};

export default function Sessions() {
    const navigate = useNavigate();
    const [items, setItems] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState("");
    const [filter, setFilter] = useState<Severity | "ALL">("ALL");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleDelete(id: string, e: React.MouseEvent) {
        e.stopPropagation();
        if (!window.confirm("Delete this session and its history?")) return;
        setDeletingId(id);
        try {
            await api.delete(`/sessions/${id}`);
            setItems((prev) => prev.filter((s) => s.id !== id));
        } catch {
            // ignore; could surface a toast
        } finally {
            setDeletingId(null);
        }
    }

    useEffect(() => {
        api.get("/sessions", { params: { limit: 50 } })
            .then((r) =>
                setItems(unwrap<{ items: Session[] }>(r as any).items ?? []),
            )
            .catch(() => setItems([]))
            .finally(() => setLoading(false));
    }, []);

    const filtered = items.filter((s) => {
        if (filter !== "ALL" && s.severity !== filter) return false;
        if (q && !s.id.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="relative mx-auto max-w-7xl px-6 pb-24 overflow-hidden">
            {/* ═══ Neural Network Background ═══ */}
            <NeuralNetwork className="!fixed opacity-30" />
            <ParticleField count={20} color="rgba(37,99,235,0.3)" className="!fixed" />

            <header className="relative z-10 pt-6 pb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                        Consultation <span className="gradient-text">History</span>
                    </h1>
                    <p className="mt-2 text-zinc-400 font-body">
                        Metadata only. Actual content lives encrypted on your
                        devices.
                    </p>
                </div>
                <Link to="/triage">
                    <Button className="neon-glow">New triage</Button>
                </Link>
            </header>

            {/* Filters */}
            <div className="relative z-10 glass-card !rounded-xl !p-4 mb-6">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <Input
                            placeholder="Search by session id…"
                            icon={<Search className="h-4 w-4" />}
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-1 rounded-xl bg-white/[0.04] p-1 border border-white/[0.06]">
                        <Filter className="h-4 w-4 text-zinc-500 ml-2" />
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 text-xs rounded-lg transition font-medium ${
                                    filter === f
                                        ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
                                        : "text-zinc-400 hover:text-white"
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══ 3D Floating Glass Cards ═══ */}
            {loading ? (
                <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="glass-card !p-5 animate-pulse">
                            <div className="h-3 w-24 bg-white/[0.06] rounded mb-3" />
                            <div className="h-3 w-2/3 bg-white/[0.06] rounded mb-2" />
                            <div className="h-3 w-1/2 bg-white/[0.04] rounded" />
                        </div>
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="relative z-10 glass-card text-center py-16">
                    <motion.div
                        className="mx-auto mb-4 w-16 h-16 rounded-full bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Brain className="h-7 w-7 text-neon-cyan" />
                    </motion.div>
                    <p className="text-zinc-400 font-body">No sessions match.</p>
                    <Link
                        to="/triage"
                        className="mt-4 inline-flex items-center gap-1.5 text-neon-cyan hover:text-neon-sky text-sm transition"
                    >
                        Start a new triage{" "}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            ) : (
                <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((s, i) => {
                        const tone =
                            s.severity === "EMERGENCY"
                                ? "rose"
                                : s.severity === "URGENT"
                                  ? "amber"
                                  : s.severity === "ROUTINE"
                                    ? "mint"
                                    : "default";
                        const config = severityConfig[s.severity || "INFO"];
                        const SevIcon = config?.icon || Brain;

                        return (
                            <GlassCard
                                key={s.id}
                                delay={Math.min(i * 0.03, 0.2)}
                                glowColor={config?.glow || "rgba(0,217,255,0.15)"}
                                className="cursor-pointer"
                                onClick={() => navigate(`/triage?session=${s.id}`)}
                            >
                                {/* Card header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="h-8 w-8 rounded-lg flex items-center justify-center"
                                            style={{
                                                background: `${config?.color}15`,
                                                border: `1px solid ${config?.color}30`,
                                            }}
                                        >
                                            <SevIcon
                                                className="h-4 w-4"
                                                style={{ color: config?.color }}
                                            />
                                        </span>
                                        <span className="font-mono text-xs text-zinc-500">
                                            {s.id.slice(0, 8)}…
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {s.severity && (
                                            <Badge tone={tone as any}>
                                                {s.severity}
                                            </Badge>
                                        )}
                                        <button
                                            type="button"
                                            onClick={(e) =>
                                                handleDelete(s.id, e)
                                            }
                                            disabled={deletingId === s.id}
                                            aria-label="Delete session"
                                            className="rounded-md p-1.5 text-zinc-500 hover:bg-white/[0.08] hover:text-rose-300 transition disabled:opacity-50"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Card body */}
                                <p className="font-display text-lg font-semibold">
                                    {s.metadata?.msgCount ?? 0} messages
                                </p>

                                {/* Risk score bar */}
                                <div className="mt-3 w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{
                                            background: `linear-gradient(to right, ${config?.color}60, ${config?.color})`,
                                        }}
                                        initial={{ width: 0 }}
                                        whileInView={{
                                            width: `${s.severity === "EMERGENCY" ? 90 : s.severity === "URGENT" ? 72 : s.severity === "ROUTINE" ? 45 : 25}%`,
                                        }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: i * 0.05 }}
                                    />
                                </div>

                                {/* Footer */}
                                <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {timeAgo(s.lastActiveAt)}
                                    </span>
                                    <span className="font-mono">
                                        {s.metadata?.modelVersion ?? "—"}
                                    </span>
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
