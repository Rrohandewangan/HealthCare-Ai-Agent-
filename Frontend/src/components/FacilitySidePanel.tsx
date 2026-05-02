import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Loader2, Phone, ExternalLink } from "lucide-react";
import { api, unwrap } from "@/lib/api";
import { Badge } from "@/components/ui/Card";

export type Facility = {
    id?: string;
    name: string;
    address?: string;
    phone?: string;
    isOpen?: boolean;
    distanceMeters?: number;
    location?: { lat: number; lng: number };
    types?: string[];
};

type Severity = "INFO" | "ROUTINE" | "URGENT" | "EMERGENCY";

type Props = {
    open: boolean;
    onClose: () => void;
    coords: { lat: number; lng: number } | null;
    symptoms: string;
    severity: Severity;
};

/**
 * Map free-text symptoms → an OSM amenity bucket.
 * (Pharmacy for mild med-related; clinic for routine; hospital for urgent/emergency.)
 */
function pickType(symptoms: string, severity: Severity): string {
    const s = symptoms.toLowerCase();
    if (severity === "EMERGENCY") return "hospital";
    if (severity === "URGENT") return "hospital";
    if (/medicat|prescrip|refill|pharmac|pill|tablet/.test(s))
        return "pharmacy";
    if (severity === "ROUTINE") return "clinic";
    return "hospital";
}

function summarizeSymptoms(s: string): string {
    const t = s.trim().replace(/\s+/g, " ");
    return t.length > 60 ? t.slice(0, 57) + "…" : t;
}

export function FacilitySidePanel({
    open,
    onClose,
    coords,
    symptoms,
    severity,
}: Props) {
    const [loading, setLoading] = useState(false);
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;
        if (!coords) {
            setErr(
                "Location unavailable. Enable location to find nearby care.",
            );
            return;
        }
        const ctrl = new AbortController();
        setLoading(true);
        setErr(null);
        setFacilities([]);

        const type = pickType(symptoms, severity);
        const radius = severity === "EMERGENCY" ? 8000 : 5000;

        api.get("/facility/nearby", {
            params: {
                lat: coords.lat,
                lng: coords.lng,
                type,
                radius,
            },
            signal: ctrl.signal,
        })
            .then((r) => {
                const items =
                    unwrap<{ items: Facility[] }>(r as any).items ?? [];
                setFacilities(items);
            })
            .catch((e) => {
                if (e?.name === "CanceledError") return;
                setErr(e?.response?.data?.message || "Search failed");
            })
            .finally(() => setLoading(false));

        return () => ctrl.abort();
    }, [open, coords, symptoms, severity]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    />
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 28,
                            stiffness: 260,
                        }}
                        className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-white/[0.08] bg-ink-950/95 backdrop-blur-xl"
                    >
                        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.06] bg-ink-950/90 px-6 py-4 backdrop-blur">
                            <div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-mint-300" />
                                    <h2 className="font-display text-lg font-semibold">
                                        Nearby care
                                    </h2>
                                </div>
                                <p className="mt-0.5 text-xs text-zinc-400">
                                    For: {summarizeSymptoms(symptoms)}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-lg p-2 text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </header>

                        <div className="p-6 space-y-3">
                            {loading && (
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <Loader2 className="h-4 w-4 animate-spin text-mint-300" />
                                    Searching OpenStreetMap for{" "}
                                    {pickType(symptoms, severity)} near you…
                                </div>
                            )}

                            {err && (
                                <div className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2.5 text-sm text-rose-200">
                                    {err}
                                </div>
                            )}

                            {!loading && !err && facilities.length === 0 && (
                                <p className="text-sm text-zinc-500">
                                    No facilities found within range. Try
                                    expanding your search.
                                </p>
                            )}

                            {facilities.map((f, i) => (
                                <motion.div
                                    key={f.id ?? i}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: Math.min(i * 0.04, 0.3),
                                    }}
                                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 hover:border-white/[0.16] hover:bg-white/[0.06] transition"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-medium text-zinc-100 truncate">
                                                {f.name}
                                            </h3>
                                            {f.address && (
                                                <p className="mt-1 text-xs text-zinc-400 line-clamp-2">
                                                    {f.address}
                                                </p>
                                            )}
                                        </div>
                                        {f.isOpen !== undefined && (
                                            <Badge
                                                tone={
                                                    f.isOpen ? "mint" : "rose"
                                                }
                                            >
                                                {f.isOpen ? "Open" : "Closed"}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                                        {f.distanceMeters !== undefined && (
                                            <span className="inline-flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {(
                                                    f.distanceMeters / 1000
                                                ).toFixed(2)}{" "}
                                                km
                                            </span>
                                        )}
                                        {f.phone && (
                                            <a
                                                href={`tel:${f.phone}`}
                                                className="inline-flex items-center gap-1 text-mint-300 hover:text-mint-400"
                                            >
                                                <Phone className="h-3 w-3" />
                                                {f.phone}
                                            </a>
                                        )}
                                    </div>

                                    <a
                                        href={
                                            f.location
                                                ? `https://www.google.com/maps/dir/?api=1&destination=${f.location.lat},${f.location.lng}`
                                                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.name + (f.address ? " " + f.address : ""))}`
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-mint-300 hover:text-mint-400"
                                    >
                                        Get directions
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                </motion.div>
                            ))}

                            <p className="pt-4 text-[11px] text-zinc-600">
                                Data © OpenStreetMap contributors. Coverage and
                                opening hours may be incomplete.
                            </p>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
