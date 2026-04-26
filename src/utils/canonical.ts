const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://traveltreks.com';

export function getCanonicalUrl(path: string = ''): string {
  const base = SITE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function getSiteUrl(): string {
  return SITE_URL;
}

export default getCanonicalUrl;
