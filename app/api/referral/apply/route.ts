import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/db/supabase';

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Код не указан' }, { status: 400 });
    }

    // Find referrer
    const { data: referrer } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('referral_code', code.toUpperCase())
      .single();

    if (!referrer) {
      return NextResponse.json({ error: 'Недействительный код' }, { status: 404 });
    }

    if (referrer.id === user.id) {
      return NextResponse.json({ error: 'Нельзя использовать свой код' }, { status: 400 });
    }

    // Check if already referred
    if (user.referred_by) {
      return NextResponse.json({ error: 'Реферальный код уже применён' }, { status: 400 });
    }

    // Apply referral
    await supabaseAdmin
      .from('users')
      .update({ referred_by: referrer.id })
      .eq('id', user.id);

    // Grant bonus: +3 cards to both
    await supabaseAdmin.rpc('increment_cards', { user_id: referrer.id, amount: 3 });
    await supabaseAdmin.rpc('increment_cards', { user_id: user.id, amount: 3 });

    // Track
    await supabaseAdmin.from('referrals').insert({
      referrer_id: referrer.id,
      referred_id: user.id,
      bonus_granted: true,
    });

    return NextResponse.json({ success: true, bonus: 3 });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}
