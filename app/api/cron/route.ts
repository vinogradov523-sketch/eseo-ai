import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db/supabase';

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Reset monthly card usage for all users
  const { error } = await supabaseAdmin
    .from('users')
    .update({ cards_used_this_month: 0 })
    .neq('id', '00000000-0000-0000-0000-000000000000'); // update all

  if (error) {
    console.error('Monthly reset error:', error);
    return NextResponse.json({ error: 'Reset failed' }, { status: 500 });
  }

  await supabaseAdmin.from('activity_log').insert({
    action: 'cron_monthly_reset',
    details: { timestamp: new Date().toISOString() },
  });

  return NextResponse.json({ success: true, message: 'Monthly card usage reset' });
}
