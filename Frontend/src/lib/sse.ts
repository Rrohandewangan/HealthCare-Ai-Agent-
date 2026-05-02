/**
 * Stream a POST request and parse Server-Sent Events (`data: {...}\n\n`).
 * Calls `onEvent` for each parsed JSON frame. Throws on HTTP error.
 */
export async function streamPost<T = any>(
    url: string,
    body: unknown,
    onEvent: (ev: T) => void,
    signal?: AbortSignal,
): Promise<void> {
    const base = import.meta.env.VITE_API_BASE || "/api/v1";
    const token = localStorage.getItem("vitalis_access");
    const deviceId = localStorage.getItem("vitalis_device");

    const res = await fetch(`${base}${url}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            accept: "text/event-stream",
            ...(token && { authorization: `Bearer ${token}` }),
            ...(deviceId && { "x-device-id": deviceId }),
        },
        body: JSON.stringify(body),
        signal,
    });

    if (!res.ok || !res.body) {
        let msg = `HTTP ${res.status}`;
        try {
            const j = await res.json();
            msg = j?.message || msg;
        } catch {
            /* empty */
        }
        throw new Error(msg);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx;
        while ((idx = buffer.indexOf("\n\n")) !== -1) {
            const frame = buffer.slice(0, idx).trim();
            buffer = buffer.slice(idx + 2);
            if (!frame.startsWith("data:")) continue;
            const payload = frame.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
                onEvent(JSON.parse(payload) as T);
            } catch {
                /* ignore non-JSON keepalives */
            }
        }
    }
}
