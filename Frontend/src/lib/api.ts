import axios, { AxiosError, AxiosInstance } from "axios";

const BASE = import.meta.env.VITE_API_BASE || "/api/v1";

export const api: AxiosInstance = axios.create({
    baseURL: BASE,
    headers: { "content-type": "application/json" },
});

api.interceptors.request.use((cfg) => {
    const token = localStorage.getItem("vitalis_access");
    const deviceId = localStorage.getItem("vitalis_device");
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    if (deviceId) cfg.headers["x-device-id"] = deviceId;
    return cfg;
});

let refreshing: Promise<string | null> | null = null;

async function refreshAccess(): Promise<string | null> {
    const refresh = localStorage.getItem("vitalis_refresh");
    if (!refresh) return null;
    try {
        const r = await axios.post(`${BASE}/auth/refresh`, {
            refreshToken: refresh,
        });
        const access = r.data?.data?.tokens?.accessToken;
        const newRefresh = r.data?.data?.tokens?.refreshToken;
        if (access) localStorage.setItem("vitalis_access", access);
        if (newRefresh) localStorage.setItem("vitalis_refresh", newRefresh);
        return access ?? null;
    } catch {
        return null;
    }
}

api.interceptors.response.use(
    (r) => r,
    async (err: AxiosError) => {
        const original = err.config as any;
        if (err.response?.status === 401 && !original?._retry) {
            original._retry = true;
            refreshing ||= refreshAccess().finally(() => (refreshing = null));
            const token = await refreshing;
            if (token) {
                original.headers.Authorization = `Bearer ${token}`;
                return api(original);
            }
            localStorage.removeItem("vitalis_access");
            localStorage.removeItem("vitalis_refresh");
            window.location.assign("/login");
        }
        return Promise.reject(err);
    },
);

export type ApiEnvelope<T> = { success: boolean; message?: string; data: T };
export const unwrap = <T>(res: { data: ApiEnvelope<T> }) => res.data.data;

export function apiError(err: unknown): string {
    const e = err as AxiosError<{ message?: string }>;
    return e?.response?.data?.message || e?.message || "Something went wrong";
}
