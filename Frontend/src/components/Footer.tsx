import { Activity, Github } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="mt-32 border-t border-white/[0.06]">
            <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 md:grid-cols-4">
                <div className="md:col-span-2">
                    <Link to="/" className="inline-flex items-center gap-2.5">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-mint-300 to-cyan-400">
                            <Activity
                                className="h-4 w-4 text-ink-950"
                                strokeWidth={2.6}
                            />
                        </span>
                        <span className="font-display text-lg font-semibold">
                            VITALIS<span className="text-mint-300">.</span>
                        </span>
                    </Link>
                    <p className="mt-4 max-w-sm text-sm text-zinc-400">
                        Privacy-first AI triage that lives on your device.
                        Backend stores only metadata — never your symptoms or
                        conversations.
                    </p>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                        Product
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-300">
                        <li>
                            <Link className="hover:text-white" to="/triage">
                                Triage
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-white" to="/facilities">
                                Facilities
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-white" to="/sessions">
                                Sessions
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                        Company
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-300">
                        <li>
                            <a href="#" className="hover:text-white">
                                Privacy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Security
                            </a>
                        </li>
                        <li>
                            <a
                                className="inline-flex items-center gap-1.5 hover:text-white"
                                href="#"
                            >
                                <Github className="h-3.5 w-3.5" /> GitHub
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/[0.06]">
                <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between text-xs text-zinc-500">
                    <span>
                        © {new Date().getFullYear()} Vitalis AI. All rights
                        reserved.
                    </span>
                    <span className="font-mono">
                        v0.1 · build {new Date().toISOString().slice(0, 10)}
                    </span>
                </div>
            </div>
        </footer>
    );
}
