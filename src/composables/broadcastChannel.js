

function _timeout(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

export async function ensureSingleTab({ timeout = 500 } = {}) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    if (typeof BroadcastChannel !== 'undefined') {
        try {
            const channel = new BroadcastChannel('cdi_single_tab_channel');
            let otherPresent = false;

            channel.onmessage = (ev) => {
                const msg = ev.data || {};
                if (msg.type === 'tab-check' && msg.id !== id) {
                    channel.postMessage({ type: 'tab-here', id });
                }
                if (msg.type === 'tab-here' && msg.id !== id) {
                    otherPresent = true;
                }
            };

            channel.postMessage({ type: 'tab-check', id });

            const waited = new Promise((res) => {
                const check = () => res(otherPresent);
                setTimeout(check, timeout);
            });

            const res = await waited;

            if (res) {
                channel.close();
                return false;
            }
            window.addEventListener('beforeunload', () => {
                try {
                    channel.postMessage({ type: 'tab-closed', id });
                } catch (e) {
                }
                channel.close();
            });

            return true;
        } catch (e) {
            console.warn('BroadcastChannel failed, falling back to localStorage', e);
        }
    }

    try {
        const KEY = 'cdi_single_tab_leader';
        const now = Date.now();
        const payload = { id, ts: now };
        localStorage.setItem(KEY, JSON.stringify(payload));

        let otherPresent = false;

        function storageHandler(ev) {
            if (!ev.key) return;
            if (ev.key !== KEY) return;
            try {
                const val = JSON.parse(ev.newValue);
                if (val && val.id && val.id !== id) {
                    otherPresent = true;
                }
            } catch (e) {
            }
        }

        window.addEventListener('storage', storageHandler);

        await _timeout(timeout);

        try {
            const current = JSON.parse(localStorage.getItem(KEY) || 'null');
            if (current && current.id && current.id !== id) otherPresent = true;
        } catch (e) {
        }

        if (otherPresent) {
            window.removeEventListener('storage', storageHandler);
            return false;
        }

        const heartbeat = setInterval(() => {
            try {
                localStorage.setItem(KEY, JSON.stringify({ id, ts: Date.now() }));
            } catch (e) {
            }
        }, 1000);

        window.addEventListener('beforeunload', () => {
            clearInterval(heartbeat);
            try {
                const cur = JSON.parse(localStorage.getItem(KEY) || 'null');
                if (cur && cur.id === id) localStorage.removeItem(KEY);
            } catch (e) {
            }
        });

        return true;
    } catch (e) {
        console.warn('single-tab fallback failed, allowing tab', e);
        return true;
    }
}

export default function useBroadcastChannel() {
    return {
        ensureSingleTab,
    };
}