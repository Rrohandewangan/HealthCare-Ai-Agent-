import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Loader2, Phone, Star, Navigation } from "lucide-react";
import { api, apiError, unwrap } from "@/lib/api";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type Facility = {
    id?: string;
    name: string;
    address?: string;
    rating?: number;
    distanceMeters?: number;
    isOpen?: boolean;
    phone?: string;
    location?: { lat: number; lng: number };
};

const TYPES = [
    { id: "hospital", label: "Hospital" },
    { id: "doctor", label: "Clinic" },
    { id: "pharmacy", label: "Pharmacy" },
] as const;

export default function Facilities() {
    const [type, setType] = useState<(typeof TYPES)[number]["id"]>("hospital");
    const [items, setItems] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
        null,
    );

    async function find() {
        setErr(null);
        setLoading(true);
        try {
            const pos = await new Promise<GeolocationPosition>((res, rej) =>
                navigator.geolocation.getCurrentPosition(res, rej, {
                    timeout: 10000,
                }),
            );
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            setCoords({ lat, lng });
            const data = await api
                .get("/facility/nearby", {
                    params: { lat, lng, type, radius: 5000 },
                })
                .then((r) => unwrap<{ items: Facility[] }>(r as any));
            setItems(data.items ?? []);
        } catch (e: any) {
            if (e?.code === 1)
                setErr("Location permission denied. Please allow access.");
            else setErr(apiError(e));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-7xl px-6 pb-24">
            <header className="pt-6 pb-8">
                <Badge tone="violet">
                    <MapPin className="h-3 w-3" /> Find care
                </Badge>
                <h1 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                    Care, near you.
                </h1>
                <p className="mt-2 text-zinc-400">
                    Hospitals, clinics, and pharmacies within 5km.
                </p>
            </header>

            <Card className="!p-5 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 rounded-xl bg-white/[0.04] p-1">
                    {TYPES.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setType(t.id)}
                            className={`px-4 py-2 text-sm rounded-lg transition ${
                                type === t.id
                                    ? "bg-white/[0.08] text-white"
                                    : "text-zinc-400 hover:text-white"
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
                <div className="flex-1" />
                <Button onClick={find} loading={loading}>
                    <Navigation className="h-4 w-4" /> Find nearby
                </Button>
            </Card>

            {err && (
                <div className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2.5 text-sm text-red-200">
                    {err}
                </div>
            )}

            {coords && (
                <p className="mt-4 text-xs text-zinc-500 font-mono">
                    @ {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
                </p>
            )}

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {loading ? (
                    [0, 1, 2, 3].map((i) => (
                        <Card key={i} className="!p-5 animate-pulse">
                            <div className="h-4 w-1/2 bg-white/[0.06] rounded mb-3" />
                            <div className="h-3 w-3/4 bg-white/[0.04] rounded mb-2" />
                            <div className="h-3 w-1/3 bg-white/[0.04] rounded" />
                        </Card>
                    ))
                ) : items.length === 0 ? (
                    <Card className="lg:col-span-2 text-center py-20">
                        <Loader2 className="h-8 w-8 mx-auto mb-3 text-zinc-600" />
                        <p className="text-zinc-400">
                            Tap{" "}
                            <span className="text-mint-300">Find nearby</span>{" "}
                            to discover care around you.
                        </p>
                    </Card>
                ) : (
                    items.map((f, i) => (
                        <motion.div
                            key={f.id ?? i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                        >
                            <Card className="group hover:border-white/[0.16] hover:bg-white/[0.06] transition">
                                <div className="flex items-start gap-4">
                                    <span className="h-12 w-12 rounded-xl bg-mint-300/10 grid place-items-center text-mint-300 ring-1 ring-mint-300/20">
                                        <MapPin className="h-5 w-5" />
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-display text-lg font-semibold truncate">
                                                {f.name}
                                            </h3>
                                            {f.isOpen !== undefined && (
                                                <Badge
                                                    tone={
                                                        f.isOpen
                                                            ? "mint"
                                                            : "rose"
                                                    }
                                                >
                                                    {f.isOpen
                                                        ? "Open"
                                                        : "Closed"}
                                                </Badge>
                                            )}
                                        </div>
                                        {f.address && (
                                            <p className="text-sm text-zinc-400 mt-0.5 truncate">
                                                {f.address}
                                            </p>
                                        )}
                                        <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
                                            {f.distanceMeters !== undefined && (
                                                <span>
                                                    {(
                                                        f.distanceMeters / 1000
                                                    ).toFixed(1)}{" "}
                                                    km
                                                </span>
                                            )}
                                            {f.rating !== undefined && (
                                                <span className="inline-flex items-center gap-1">
                                                    <Star className="h-3 w-3 text-amber-300" />
                                                    {f.rating.toFixed(1)}
                                                </span>
                                            )}
                                            {f.phone && (
                                                <a
                                                    href={`tel:${f.phone}`}
                                                    className="inline-flex items-center gap-1 hover:text-mint-300"
                                                >
                                                    <Phone className="h-3 w-3" />{" "}
                                                    {f.phone}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    {f.location && (
                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${f.location.lat},${f.location.lng}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs text-mint-300 hover:text-mint-400 inline-flex items-center gap-1 self-center"
                                        >
                                            Directions →
                                        </a>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
