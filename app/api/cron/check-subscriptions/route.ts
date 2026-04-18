export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db/supabase';
import { sendPaymentSuccessEmail } from '@/lib/email/resend';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Find expired subscriptions
  const { data: expiredUsers } = await supabaseAdmin
    .from('users')
    .select('id, email, name, plan')
    .neq('plan', 'starter')
    .lt('plan_expires_at', new Date().toISOString());

  if (expiredUsers?.length) {
    for (const user of expiredUsers) {
      // Downgrade to starter
      await supabaseAdmin
        .from('users')
        .update({
          plan: 'starter',
          cards_limit: 5,
        })
        .eq('id', user.id);

      // TODO: Send expiration email
      console.log(`Subscription expired for user ${user.email}`);
    }
  }

  return NextResponse.json({
    success: true,
    expired: expiredUsers?.length || 0,
  });
}
