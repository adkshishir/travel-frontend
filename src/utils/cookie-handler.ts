'use server';

import { cookies } from 'next/headers';
import { type RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

/**
 * Cookie options interface with commonly used properties
 */
export interface CookieSettings {
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Default cookie settings
 */
const DEFAULT_SETTINGS: CookieSettings = {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  path: '/',
  sameSite: 'lax',
};

/**
 * Get all cookies
 * @returns The cookies object
 */
export async function getCookies(): Promise<ReadonlyRequestCookies> {
  const cookieStore = await cookies();
  return cookieStore;
}

/**
 * Get a specific cookie value by key
 * @param key - The cookie key
 * @returns The cookie value or undefined if not found
 */
export async function getCookie(key: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
}

/**
 * Set a cookie with the given key and value
 * @param key - The cookie key
 * @param value - The cookie value
 * @param options - Optional cookie settings
 * @returns Object containing the key and value
 */
export async function setCookie(
  key: string,
  value: string,
  options?: CookieSettings
): Promise<{ key: string; value: string }> {
  const cookieStore = await cookies();
  const settings = { ...DEFAULT_SETTINGS, ...options };

  cookieStore.set(key, value, settings);

  return { key, value };
}

/**
 * Delete a specific cookie by key
 * @param key - The cookie key
 * @returns Object containing the deleted key
 */
export async function deleteCookie(key: string): Promise<{ key: string }> {
  const cookieStore = await cookies();
  cookieStore.delete(key);

  return { key };
}

/**
 * Delete all cookies
 * @returns Empty object
 */
export async function deleteAllCookies(): Promise<Record<string, never>> {
  const cookieStore = await cookies();

  // Get all cookies and delete each one
  for (const cookie of cookieStore.getAll()) {
    cookieStore.delete(cookie.name);
  }

  return {};
}

/**
 * Check if a cookie exists
 * @param key - The cookie key
 * @returns Boolean indicating if the cookie exists
 */
export async function hasCookie(key: string): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(key) !== undefined;
}

/**
 * Set a temporary cookie that expires after the specified seconds
 * @param key - The cookie key
 * @param value - The cookie value
 * @param seconds - Seconds until expiration
 * @returns Object containing the key and value
 */
export async function setTemporaryCookie(
  key: string,
  value: string,
  seconds: number
): Promise<{ key: string; value: string }> {
  return setCookie(key, value, { maxAge: seconds });
}

/**
 * Set a persistent cookie (1 year)
 * @param key - The cookie key
 * @param value - The cookie value
 * @returns Object containing the key and value
 */
export async function setPersistentCookie(
  key: string,
  value: string
): Promise<{ key: string; value: string }> {
  return setCookie(key, value, { maxAge: 60 * 60 * 24 * 365 }); // 1 year
}
