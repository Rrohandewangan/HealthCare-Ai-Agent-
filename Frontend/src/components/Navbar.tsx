import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Activity, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth.store";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const NAV_AUTHED = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/triage", label: "Triage" },
    { to: "/sessions", label: "Sessions" },
    { to: "/facilities", label: "Facilities" },
];

export function Navbar() {
    const { user, logout } = useAuth();
    const nav = useNavigate();
    const loc = useLocation();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => setOpen(false), [loc.pathname]);

    const links = user ? NAV_AUTHED : [];

    return (
        <header
            className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-300",
                scrolled ? "py-2" : "py-4",
            )}
        >
            <div
                className={cn(
                    "mx-auto max-w-7xl px-4 sm:px-6",
                    scrolled && "transition-all",
                )}
            >
                <div
                    className={cn(
                        "flex items-center justify-between rounded-2xl px-4 sm:px-5 h-14",
                        scrolled
                            ? "bg-ink-950/70 border border-white/[0.08] backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]"
                            : "bg-transparent",
                    )}
                >
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-mint-300 to-cyan-400">
                            <Activity
                                className="h-4 w-4 text-ink-950"
                                strokeWidth={2.6}
                            />
                            <span className="absolute inset-0 rounded-lg ring-2 ring-mint-300/30 group-hover:ring-mint-300/60 transition" />
                        </span>
                        <span className="font-display text-lg font-semibold tracking-tight">
                            VITALIS<span className="text-mint-300">.</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {links.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                className={({ isActive }) =>
                                    cn(
                                        "px-3.5 py-2 rounded-lg text-sm transition-colors",
                                        isActive
                                            ? "text-white bg-white/[0.06]"
                                            : "text-zinc-400 hover:text-white hover:bg-white/[0.04]",
                                    )
                                }
                            >
                                {l.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-2">
                        {user ? (
                            <>
                                <span className="text-xs text-zinc-400 mr-1 hidden lg:inline">
                                    {user.email}
                                </span>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={async () => {
                                        await logout();
                                        nav("/");
                                    }}
                                >
                                    <LogOut className="h-4 w-4" /> Sign out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => nav("/login")}
                                >
                                    Sign in
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => nav("/register")}
                                >
                                    Get started
                                </Button>
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden h-10 w-10 inline-flex items-center justify-center rounded-lg hover:bg-white/[0.06]"
                        onClick={() => setOpen((o) => !o)}
                        aria-label="Menu"
                    >
                        {open ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="md:hidden mx-4 sm:mx-6 mt-2 rounded-2xl glass p-3"
                    >
                        {(user
                            ? NAV_AUTHED
                            : [
                                  { to: "/login", label: "Sign in" },
                                  { to: "/register", label: "Get started" },
                              ]
                        ).map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                className={({ isActive }) =>
                                    cn(
                                        "block px-3 py-3 rounded-lg text-sm",
                                        isActive
                                            ? "text-white bg-white/[0.06]"
                                            : "text-zinc-300 hover:bg-white/[0.04]",
                                    )
                                }
                            >
                                {l.label}
                            </NavLink>
                        ))}
                        {user && (
                            <button
                                onClick={async () => {
                                    await logout();
                                    nav("/");
                                }}
                                className="w-full text-left px-3 py-3 rounded-lg text-sm text-zinc-300 hover:bg-white/[0.04]"
                            >
                                Sign out
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
