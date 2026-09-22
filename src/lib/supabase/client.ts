"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getWebsiteSupabaseEnv } from "./env";

export function createWebsiteSupabaseClient() {
  const { url, anonKey } = getWebsiteSupabaseEnv();
  return createBrowserClient(url, anonKey);
}
