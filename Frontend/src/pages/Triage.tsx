import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Sparkles,
    AlertTriangle,
    ShieldCheck,
    MapPin,
} from "lucide-react";
import { api, apiError, unwrap } from "@/lib/api";
import { streamPost } from "@/lib/sse";
import { Button } from "@/components/ui/Button";
import { Card, Badge } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { FacilitySidePanel } from "@/components/FacilitySidePanel";
import { DNAHelix, ECGPulse, ParticleField } from "@/components/backgrounds";

type Severity = "INFO" | "ROUTINE" | "URGENT" | "EMERGENCY";

type TriageResult = {
    severity: Severity;
    confidence: number;
    summary: string;
    advice: string[];
    redFlags?: string[];
    modelVersion?: string;
};

type Msg =
    | { who: "user"; text: string; id: string }
    | { who: "ai"; result: TriageResult; id: string }
    | { who: "ai-stream"; partial: string; raw: string; id: string };

type StreamEvent =
    | { type: "delta"; text: string; partialSummary: string }
    | { type: "final"; result: TriageResult & { facilities?: unknown[] } }
    | { type: "error"; message: string };

const SUGGESTIONS = [
    "Sharp pain in lower right abdomen for 6 hours, mild fever",
    "Severe headache with neck stiffness and sensitivity to light",
    "Shortness of breath when climbing stairs, swollen ankles",
    "Persistent cough for 3 weeks, occasional blood in sputum",
];

function genId() {
    return crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function Triage() {
    const [searchParams] = useSearchParams();
    const [sessionId] = useState(() => searchParams.get("session") || genId());
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Msg[]>([]);
    const [pending, setPending] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
        null,
    );
    const [panelOpen, setPanelOpen] = useState(false);
    const [panelContext, setPanelContext] = useState<{
        symptoms: string;
        severity: Severity;
    } | null>(null);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, pending]);

    useEffect(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (pos) =>
                setCoords({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                }),
            () => {},
            { timeout: 8000, maximumAge: 5 * 60_000 },
        );
    }, []);

    // Hydrate transcript when resuming an existing session via ?session=<id>
    useEffect(() => {
        const resumeId = searchParams.get("session");
        if (!resumeId) return;
        let cancelled = false;
        (async () => {
            try {
                const r = await api.get(`/sessions/${resumeId}/messages`, {
                    params: { limit: 100 },
                });
                if (cancelled) return;
                const items =
                    unwrap<{
                        items: Array<{
                            id: string;
                            role: "user" | "assistant";
                            text: string;
                            payload?: {
                                severity?: "mild" | "moderate" | "critical";
                                confidence?: number;
                                recommendations?: string[];
                                redFlags?: string[];
                                language?: string;
                            };
                            createdAt?: string;
                        }>;
                    }>(r as any).items ?? [];
                const SEV: Record<string, Severity> = {
                    mild: "ROUTINE",
                    moderate: "URGENT",
                    critical: "EMERGENCY",
                };
                const hydrated: Msg[] = items.map((it) => {
                    if (it.role === "user") {
                        return {
                            who: "user",
                            text: it.text,
                            id: it.id || genId(),
                        };
                    }
                    const sev = it.payload?.severity
                        ? SEV[it.payload.severity] || "INFO"
                        : "INFO";
                    const result: TriageResult = {
                        severity: sev,
                        confidence: it.payload?.confidence ?? 0,
                        summary: it.text,
                        advice: it.payload?.recommendations ?? [],
                        redFlags: it.payload?.redFlags ?? [],
                    };
                    return { who: "ai", result, id: it.id || genId() };
                });
                setMessages(hydrated);
            } catch (e) {
                // Silent: missing/empty session is fine, user starts fresh.
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [searchParams]);

    async function submit(text: string) {
        setErr(null);
        if (!text.trim() || pending) return;
        const trimmed = text.trim();
        const streamId = genId();

        setMessages((m) => [
            ...m,
            { who: "user", text: trimmed, id: genId() },
            { who: "ai-stream", partial: "", raw: "", id: streamId },
        ]);
        setInput("");
        setPending(true);

        try {
            await streamPost<StreamEvent>(
                "/ai/triage/stream",
                {
                    sessionId,
                    symptoms: trimmed,
                    locale: "en",
                    ...(coords && { lat: coords.lat, lng: coords.lng }),
                },
                (ev) => {
                    if (ev.type === "delta") {
                        setMessages((m) =>
                            m.map((msg) =>
                                msg.id === streamId && msg.who === "ai-stream"
                                    ? {
                                          ...msg,
                                          raw: msg.raw + ev.text,
                                          partial: ev.partialSummary,
                                      }
                                    : msg,
                            ),
                        );
                    } else if (ev.type === "final") {
                        const result: TriageResult = {
                            severity: ev.result.severity,
                            confidence: ev.result.confidence,
                            summary: ev.result.summary,
                            advice: ev.result.advice ?? [],
                            redFlags: ev.result.redFlags ?? [],
                            modelVersion: ev.result.modelVersion,
                        };
                        setMessages((m) =>
                            m.map((msg) =>
                                msg.id === streamId
                                    ? { who: "ai", result, id: streamId }
                                    : msg,
                            ),
                        );
                        if (
                            result.severity === "URGENT" ||
                            result.severity === "EMERGENCY"
                        ) {
                            setPanelContext({
                                symptoms: trimmed,
                                severity: result.severity,
                            });
                            setPanelOpen(true);
                        }
                    } else if (ev.type === "error") {
                        throw new Error(ev.message);
                    }
                },
            );
        } catch (e) {
            setErr(apiError(e) || (e as Error)?.message || "Stream failed");
            setMessages((m) => m.filter((msg) => msg.id !== streamId));
        } finally {
            setPending(false);
        }
    }

    function openPanelFor(symptoms: string, severity: Severity) {
        setPanelContext({ symptoms, severity });
        setPanelOpen(true);
    }

    return (
        <div className="relative mx-auto max-w-5xl px-6 pb-24 overflow-hidden">
            {/* ═══ DNA Helix Background ═══ */}
            <DNAHelix className="opacity-25 !fixed" />
            <ECGPulse className="opacity-15 !fixed" />
            <ParticleField count={15} color="rgba(0,217,255,0.3)" className="!fixed" />

            <header className="relative z-10 pt-6 pb-8">
                <Badge tone="mint" className="neon-glow">
                    <Sparkles className="h-3 w-3" /> Triage
                </Badge>
                <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
                    What's going on <span className="gradient-text">today?</span>
                </h1>
                <p className="mt-2 text-zinc-400 font-body">
                    Be specific — duration, intensity, and any related symptoms
                    help us help you.
                </p>
            </header>

            <Card className="relative z-10 !p-0 overflow-hidden neon-glow">
                {/* Chat area with subtle background */}
                <div className="relative h-[60vh] min-h-[440px] overflow-y-auto p-6 space-y-4">
                    {/* Subtle grid */}
                    <div className="absolute inset-0 holo-grid opacity-5 pointer-events-none" />

                    {messages.length === 0 && (
                        <div className="relative h-full grid place-items-center">
                            <div className="max-w-md text-center">
                                {/* AI orb */}
                                <motion.div
                                    className="mx-auto mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 flex items-center justify-center border border-neon-cyan/20"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Sparkles className="h-7 w-7 text-neon-cyan" />
                                </motion.div>
                                <p className="text-sm text-zinc-500 mb-4 font-body">
                                    Try one of these:
                                </p>
                                <div className="grid gap-2">
                                    {SUGGESTIONS.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => submit(s)}
                                            className="text-left text-sm rounded-xl glass-card !rounded-lg !p-3 hover:border-neon-cyan/30 transition-all"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <AnimatePresence initial={false}>
                        {messages.map((m) => {
                            if (m.who === "user")
                                return <UserMessage key={m.id} text={m.text} />;
                            if (m.who === "ai-stream")
                                return (
                                    <StreamingMessage
                                        key={m.id}
                                        partial={m.partial}
                                    />
                                );
                            return (
                                <AiMessage
                                    key={m.id}
                                    r={m.result}
                                    onFindCare={() =>
                                        openPanelFor(
                                            getLastUserText(messages, m.id) ??
                                                "",
                                            m.result.severity,
                                        )
                                    }
                                />
                            );
                        })}
                    </AnimatePresence>

                    <div ref={endRef} />
                </div>

                {err && (
                    <div className="mx-6 mb-4 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2.5 text-sm text-red-200">
                        {err}
                    </div>
                )}

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit(input);
                    }}
                    className="border-t border-white/[0.06] p-4 flex items-end gap-3 bg-ink-950/50 backdrop-blur-xl"
                >
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                submit(input);
                            }
                        }}
                        placeholder="Describe your symptoms…"
                        rows={1}
                        className="flex-1 max-h-40 resize-none rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm placeholder:text-zinc-500 focus:outline-none focus:border-neon-cyan/50 transition font-body"
                    />
                    <Button
                        type="submit"
                        loading={pending}
                        disabled={!input.trim() || pending}
                        className="neon-glow"
                    >
                        <Send className="h-4 w-4" /> Send
                    </Button>
                </form>
            </Card>

            <p className="relative z-10 mt-6 text-xs text-zinc-500 flex items-start gap-2 font-body">
                <ShieldCheck className="h-3.5 w-3.5 mt-0.5 text-neon-cyan shrink-0" />
                VITALIS is for educational triage and is not a substitute for
                professional medical advice. In emergencies, call your local
                emergency number.
            </p>

            <FacilitySidePanel
                open={panelOpen}
                onClose={() => setPanelOpen(false)}
                coords={coords}
                symptoms={panelContext?.symptoms ?? ""}
                severity={panelContext?.severity ?? "ROUTINE"}
            />
        </div>
    );
}

function getLastUserText(messages: Msg[], aiId: string): string | undefined {
    const idx = messages.findIndex((m) => m.id === aiId);
    for (let i = idx - 1; i >= 0; i--) {
        if (messages[i].who === "user")
            return (messages[i] as { text: string }).text;
    }
    return undefined;
}

function UserMessage({ text }: { text: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
        >
            <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-gradient-to-r from-neon-cyan to-neon-blue text-ink-950 px-4 py-3 text-sm font-medium">
                {text}
            </div>
        </motion.div>
    );
}

function StreamingMessage({ partial }: { partial: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
        >
            <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl px-5 py-4 text-sm">
                <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500">
                    <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-bounce [animation-delay:120ms]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-bounce [animation-delay:240ms]" />
                    </span>
                    Analyzing…
                </div>
                {partial ? (
                    <p className="text-zinc-100 leading-relaxed whitespace-pre-wrap">
                        {partial}
                        <span className="ml-0.5 inline-block h-4 w-[2px] -mb-0.5 bg-neon-cyan animate-pulse" />
                    </p>
                ) : (
                    <p className="text-zinc-500 italic">Reading symptoms…</p>
                )}
            </div>
        </motion.div>
    );
}

function AiMessage({
    r,
    onFindCare,
}: {
    r: TriageResult;
    onFindCare: () => void;
}) {
    const tone =
        r.severity === "EMERGENCY"
            ? "rose"
            : r.severity === "URGENT"
              ? "amber"
              : r.severity === "ROUTINE"
                ? "mint"
                : "default";
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
        >
            <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl px-5 py-4 text-sm space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={tone}>{r.severity}</Badge>
                    <span className="text-xs text-zinc-500">
                        Confidence {(r.confidence * 100).toFixed(0)}%
                    </span>
                    {r.modelVersion && (
                        <span className="text-xs text-zinc-600 font-mono">
                            {r.modelVersion}
                        </span>
                    )}
                </div>
                <p className="text-zinc-100 leading-relaxed">{r.summary}</p>

                {r.advice?.length > 0 && (
                    <div>
                        <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                            Recommended steps
                        </p>
                        <ul className="space-y-1.5 text-zinc-200">
                            {r.advice.map((a, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neon-cyan shrink-0" />
                                    {a}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {r.redFlags && r.redFlags.length > 0 && (
                    <div
                        className={cn(
                            "rounded-lg border px-3 py-2.5",
                            "border-rose-400/30 bg-rose-400/10",
                        )}
                    >
                        <p className="text-xs uppercase tracking-wider text-rose-300 mb-1.5 inline-flex items-center gap-1.5">
                            <AlertTriangle className="h-3 w-3" /> Seek care
                            immediately if
                        </p>
                        <ul className="space-y-1 text-rose-100 text-xs">
                            {r.redFlags.map((f, i) => (
                                <li key={i}>• {f}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    onClick={onFindCare}
                    className="inline-flex items-center gap-2 rounded-lg border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-2 text-sm font-medium text-cyan-200 hover:bg-neon-cyan/20 transition"
                >
                    <MapPin className="h-4 w-4" /> Find nearby care
                </button>
            </div>
        </motion.div>
    );
}
