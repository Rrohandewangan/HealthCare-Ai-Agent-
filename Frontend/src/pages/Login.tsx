import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth.store";
import { apiError } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ECGPulse, ParticleField } from "@/components/backgrounds";
import { useMouseParallax } from "@/hooks/useMouseParallax";

export default function Login() {
    const { login, loading } = useAuth();
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPw] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const parallax = useMouseParallax(0.01);

    return (
        <div className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2">
            {/* ═══ LEFT PANEL ═══ */}
            <div className="relative hidden lg:flex flex-col justify-between p-12 border-r border-white/[0.06] overflow-hidden">
                {/* Background effects */}
                <ECGPulse className="opacity-15" />
                <ParticleField count={20} color="rgba(0,217,255,0.3)" />
                <div className="absolute inset-0 holo-grid opacity-10" />

                <motion.div
                    className="absolute -top-20 -left-20 h-96 w-96 rounded-full blur-3xl"
                    style={{
                        background: "radial-gradient(circle, rgba(0,217,255,0.1), transparent 60%)",
                        x: parallax.x,
                        y: parallax.y,
                    }}
                />

                <div className="relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2.5">
                        <motion.span
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-blue neon-glow"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Activity
                                className="h-5 w-5 text-ink-950"
                                strokeWidth={2.6}
                            />
                        </motion.span>
                        <span className="font-display text-xl font-bold">
                            VITALIS<span className="text-neon-cyan">.</span>
                        </span>
                    </Link>
                </div>

                <div className="relative z-10 max-w-md">
                    <p className="font-display text-3xl leading-snug text-balance">
                        "VITALIS triaged my chest pain at 2am — turned out to be
                        reflux, not the heart attack I feared. Saved me a{" "}
                        <span className="text-neon-cyan">$4,000</span> ER bill."
                    </p>
                    <p className="mt-6 text-sm text-zinc-500 font-body">
                        — Maya R., beta user
                    </p>
                </div>

                <div className="relative z-10 text-xs text-zinc-600 font-mono">
                    v0.1 · privacy-first triage
                </div>
            </div>

            {/* ═══ FORM SIDE ═══ */}
            <div className="relative flex items-center justify-center p-6 sm:p-12 overflow-hidden">
                <div className="absolute inset-0 holo-grid opacity-5" />
                <motion.div
                    className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl"
                    style={{
                        background: "radial-gradient(circle, rgba(37,99,235,0.08), transparent 70%)",
                        x: parallax.x * -1,
                        y: parallax.y * -1,
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full max-w-md z-10"
                >
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                        Welcome <span className="gradient-text">back</span>
                    </h1>
                    <p className="mt-2 text-zinc-400 font-body">
                        Sign in to continue your sessions.
                    </p>

                    <form
                        className="mt-10 space-y-4"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setErr(null);
                            try {
                                await login(email, password);
                                nav("/dashboard");
                            } catch (e) {
                                setErr(apiError(e));
                            }
                        }}
                    >
                        <Input
                            type="email"
                            label="Email"
                            placeholder="you@example.com"
                            icon={<Mail className="h-4 w-4" />}
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            icon={<Lock className="h-4 w-4" />}
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPw(e.target.value)}
                        />
                        {err && (
                            <div className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2.5 text-sm text-red-200">
                                {err}
                            </div>
                        )}
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full neon-glow"
                            loading={loading}
                        >
                            Sign in <ArrowRight className="h-4 w-4" />
                        </Button>
                    </form>

                    <p className="mt-8 text-sm text-zinc-500">
                        New here?{" "}
                        <Link
                            to="/register"
                            className="text-neon-cyan hover:text-neon-sky transition"
                        >
                            Create an account
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
