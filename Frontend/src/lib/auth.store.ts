import { create } from "zustand";
import { api, unwrap } from "./api";

export type User = { id: string; email: string; name?: string };

type AuthState = {
    user: User | null;
    loading: boolean;
    hydrated: boolean;
    hydrate: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
    user: null,
    loading: false,
    hydrated: false,

    hydrate: async () => {
        const access = localStorage.getItem("vitalis_access");
        if (!access) return set({ hydrated: true });
        try {
            const res = await api.get("/auth/me");
            const me = unwrap<User>(res as any);
            set({ user: me, hydrated: true });
        } catch {
            set({ hydrated: true });
        }
    },

    login: async (email, password) => {
        set({ loading: true });
        try {
            const res = await api.post("/auth/login", {
                email,
                password,
                device: {
                    platform: "web",
                    publicKey:
                        localStorage.getItem("vitalis_pubkey") || "web-stub",
                },
            });
            const data = unwrap<{
                tokens: { accessToken: string; refreshToken: string };
                device?: { id: string; platform: string };
                user: User;
            }>(res as any);
            localStorage.setItem("vitalis_access", data.tokens.accessToken);
            localStorage.setItem("vitalis_refresh", data.tokens.refreshToken);
            if (data.device?.id)
                localStorage.setItem("vitalis_device", data.device.id);
            set({ user: data.user });
        } finally {
            set({ loading: false });
        }
    },

    register: async (email, password, name) => {
        set({ loading: true });
        try {
            await api.post("/auth/register", { email, password, name });
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        try {
            await api.post("/auth/logout", {
                refreshToken: localStorage.getItem("vitalis_refresh"),
            });
        } catch {
            /* ignore */
        }
        localStorage.removeItem("vitalis_access");
        localStorage.removeItem("vitalis_refresh");
        localStorage.removeItem("vitalis_device");
        set({ user: null });
    },
}));
