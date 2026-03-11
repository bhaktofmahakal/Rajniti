const API_PREFIX = "/api/v1"
const DEFAULT_API_ORIGIN = "http://localhost:8000"

export function getApiBaseUrl(): string {
    const configuredBaseUrl =
        process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_ORIGIN
    const normalizedBaseUrl = configuredBaseUrl.replace(/\/+$/, "")

    if (
        normalizedBaseUrl === API_PREFIX ||
        normalizedBaseUrl.endsWith(API_PREFIX)
    ) {
        return normalizedBaseUrl
    }

    return `${normalizedBaseUrl}${API_PREFIX}`
}

export function buildApiUrl(path: string): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`
    return `${getApiBaseUrl()}${normalizedPath}`
}
