import { createClient } from "@supabase/supabase-js";

import { getWebsiteSupabaseEnv } from "./env";

/**
 * Server-only Supabase client using the public anon key.
 * No service-role. No session persistence.
 */
export function createWebsiteSupabaseServerClient() {
  const { url, anonKey } = getWebsiteSupabaseEnv();
  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
