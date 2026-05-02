import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User, ArrowRight, Activity, Check, Shield, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth.store";
import { apiError } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { HologramBackground } from "@/components/backgrounds";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const PERKS = [
    { icon: Shield, text: "Free during beta" },
    { icon: Lock, text: "End-to-end encrypted sync" },
    { icon: Fingerprint, text: "No prompt or chat retention" },
];

export default function Register() {
    const { register, login, loading } = useAuth();
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPw] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const parallax = useMouseParallax(0.01);

    return (
        <div className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2">
            {/* ═══ FORM SIDE ═══ */}
            <div className="relative flex items-center justify-center p-6 sm:p-12 order-2 lg:order-1 overflow-hidden">
                {/* Subtle background effects */}
                <div className="absolute inset-0 holo-grid opacity-10" />
                <motion.div
                    className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl"
                    style={{
                        background: "radial-gradient(circle, rgba(0,217,255,0.08), transparent 70%)",
                        x: parallax.x,
                        y: parallax.y,
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full max-w-md z-10"
                >
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                        Create your <span className="gradient-text">account</span>
                    </h1>
                    <p className="mt-2 text-zinc-400 font-body">
                        Two minutes to set up. Zero PHI stored on our servers.
                    </p>

                    <form
                        className="mt-10 space-y-4"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setErr(null);
                            try {
                                await register(email, password, name);
                                await login(email, password);
                                nav("/dashboard");
                            } catch (e) {
                                setErr(apiError(e));
                            }
                        }}
                    >
                        <Input
                            label="Name"
                            placeholder="Jane Doe"
                            icon={<User className="h-4 w-4" />}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            type="email"
                            label="Email"
                            placeholder="you@example.com"
                            icon={<Mail className="h-4 w-4" />}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            label="Password"
                            placeholder="At least 12 characters"
                            icon={<Lock className="h-4 w-4" />}
                            required
                            minLength={12}
                            value={password}
                            onChange={(e) => setPw(e.target.value)}
                            hint="Use a mix of letters, numbers, and symbols."
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
                            Create account <ArrowRight className="h-4 w-4" />
                        </Button>
                    </form>

                    <p className="mt-8 text-sm text-zinc-500">
                        Already have one?{" "}
                        <Link
                            to="/login"
                            className="text-neon-cyan hover:text-neon-sky transition"
                        >
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* ═══ HOLOGRAM SIDE ═══ */}
            <div className="relative hidden lg:flex flex-col justify-between p-12 border-l border-white/[0.06] order-1 lg:order-2 overflow-hidden">
                {/* AI Healthcare Hologram Background */}
                <HologramBackground />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-ink-950/50 via-transparent to-neon-cyan/5" />
                <motion.div
                    className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full blur-3xl"
                    style={{ background: "radial-gradient(circle, rgba(0,217,255,0.1), transparent 60%)" }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Logo */}
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

                {/* Perks */}
                <div className="relative z-10 max-w-md">
                    <p className="text-xs uppercase tracking-wider text-neon-cyan mb-6 font-display">
                        What you get
                    </p>
                    <ul className="space-y-5">
                        {PERKS.map((p, i) => (
                            <motion.li
                                key={p.text}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.15 }}
                                className="flex items-start gap-3 text-zinc-200"
                            >
                                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                                    <p.icon className="h-4 w-4" />
                                </span>
                                <div>
                                    <span className="font-medium">{p.text}</span>
                                    <div className="mt-1 h-px w-full bg-gradient-to-r from-neon-cyan/20 to-transparent" />
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Footer */}
                <div className="relative z-10 text-xs text-zinc-600 font-mono">
                    By signing up, you agree to our Terms & Privacy Policy.
                </div>
            </div>
        </div>
    );
}
