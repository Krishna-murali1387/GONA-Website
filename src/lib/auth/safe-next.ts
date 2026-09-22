/** Safe relative redirect paths only — blocks open redirects. */
export function safeAuthNextPath(
  value: string | null | undefined,
  fallback = "/business/cable/register",
): string {
  if (!value) return fallback;

  let path = value;
  try {
    path = decodeURIComponent(value);
  } catch {
    return fallback;
  }

  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("/\\")) {
    return fallback;
  }
  if (path.includes("://") || path.includes("\\") || path.includes("@")) {
    return fallback;
  }
  // Keep users in Cable registration / product flow after email confirm.
  if (
    path === "/business/cable/register" ||
    path.startsWith("/business/cable/register?") ||
    path === "/business/cable" ||
    path.startsWith("/business/cable?")
  ) {
    return path.split("#")[0] || fallback;
  }
  return fallback;
}
