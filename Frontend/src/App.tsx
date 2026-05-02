import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BackgroundFx } from "./components/BackgroundFx";
import { useAuth } from "./lib/auth.store";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Triage from "./pages/Triage";
import Sessions from "./pages/Sessions";
import Facilities from "./pages/Facilities";

function Protected({ children }: { children: React.ReactNode }) {
    const { user, hydrated } = useAuth();
    if (!hydrated) {
        return (
            <div className="min-h-screen grid place-items-center">
                <div className="h-7 w-7 rounded-full border-2 border-mint-300 border-r-transparent animate-spin" />
            </div>
        );
    }
    if (!user) return <Navigate to="/login" replace />;
    return <>{children}</>;
}

const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
};

export default function App() {
    const hydrate = useAuth((s) => s.hydrate);
    const loc = useLocation();

    useEffect(() => {
        hydrate();
    }, [hydrate]);

    return (
        <>
            <BackgroundFx />
            <Navbar />
            <main className="pt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={loc.pathname}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        <Routes location={loc}>
                            <Route path="/" element={<Landing />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <Protected>
                                        <Dashboard />
                                    </Protected>
                                }
                            />
                            <Route
                                path="/triage"
                                element={
                                    <Protected>
                                        <Triage />
                                    </Protected>
                                }
                            />
                            <Route
                                path="/sessions"
                                element={
                                    <Protected>
                                        <Sessions />
                                    </Protected>
                                }
                            />
                            <Route
                                path="/facilities"
                                element={
                                    <Protected>
                                        <Facilities />
                                    </Protected>
                                }
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </Routes>
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </>
    );
}
