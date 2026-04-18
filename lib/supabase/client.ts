'use client';

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('❌ NEXT_PUBLIC_SUPABASE_URL is missing in environment variables');
  }
  if (!supabaseAnonKey) {
    throw new Error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing in environment variables');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}