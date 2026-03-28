const DEFAULT_API_BASE_URL = 'http://localhost:8080';
function resolveApiBaseUrl() {
    if (typeof window === 'undefined') {
        return DEFAULT_API_BASE_URL;
    }
    const configuredBaseUrl = window.__APP_CONFIG__?.apiBaseUrl?.trim();
    if (!configuredBaseUrl) {
        return DEFAULT_API_BASE_URL;
    }
    return configuredBaseUrl.replace(/\/+$/, '');
}
export const API_BASE_URL = resolveApiBaseUrl();
export const API_ENDPOINTS = {
    auth: {
        login: `${API_BASE_URL}/api/auth/login`,
        register: `${API_BASE_URL}/api/auth/register`,
        me: `${API_BASE_URL}/api/auth/me`,
    },
};
