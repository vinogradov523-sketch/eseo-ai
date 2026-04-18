import { createClient } from '@supabase/supabase-js';

// Клиент с полным доступом — использовать ТОЛЬКО на сервере!
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
