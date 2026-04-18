import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('❌ NEXT_PUBLIC_SUPABASE_URL is missing in environment variables');
}
if (!supabaseKey) {
  throw new Error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing in environment variables');
}
if (!supabaseServiceKey) {
  throw new Error('❌ SUPABASE_SERVICE_ROLE_KEY is missing in environment variables');
}

// Client-side (ограниченный доступ)
export const supabase = createClient(supabaseUrl, supabaseKey);

// Server-side (полный доступ)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);