/** Prefixes site-relative paths ("/assets/x.pdf") with the deploy base, e.g. "/CV/assets/x.pdf". */
export function asset(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
}
