/**
 * Helper to dynamically resolve asset URLs using Vite's import.meta.env.BASE_URL
 * Ensures compatibility for root deployments ('/') as well as subpath deployments (e.g. GitHub Pages '/repo-name/')
 */
export function getAssetUrl(path) {
  if (!path) return '';
  // If absolute HTTP/HTTPS URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${cleanBase}${cleanPath}`;
}
