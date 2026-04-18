import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db/supabase';

export async function POST(req: NextRequest) {
  try {
    // Verify webhook signature (production)
    // const signature = req.headers.get('x-yookassa-signature');

    const body = await req.json();
    const { event, object } = body;

    switch (event) {
      case 'payment.succeeded': {
        const userId = object.metadata?.user_id;
        const plan = object.metadata?.plan;

        if (!userId || !plan) break;

        const periodEnd = new Date();
        periodEnd.setMonth(periodEnd.getMonth() + 1);

        // Update user plan
        await supabaseAdmin
          .from('users')
          .update({
            plan,
            plan_expires_at: periodEnd.toISOString(),
            cards_limit: plan === 'pro' ? 999999 : 999999,
            cards_used_this_month: 0,
          })
          .eq('id', userId);

        // Save payment record
        await supabaseAdmin.from('payments').insert({
          user_id: userId,
          yukassa_payment_id: object.id,
          amount: parseFloat(object.amount.value),
          currency: object.amount.currency,
          status: 'succeeded',
          plan,
          period_start: new Date().toISOString(),
          period_end: periodEnd.toISOString(),
          metadata: object.metadata,
        });

        // Log activity
        await supabaseAdmin.from('activity_log').insert({
          user_id: userId,
          action: 'payment_succeeded',
          details: { payment_id: object.id, plan, amount: object.amount.value },
        });

        break;
      }

      case 'payment.canceled': {
        await supabaseAdmin.from('payments').insert({
          user_id: object.metadata?.user_id,
          yukassa_payment_id: object.id,
          amount: parseFloat(object.amount.value),
          status: 'canceled',
          plan: object.metadata?.plan || 'unknown',
        });
        break;
      }

      case 'refund.succeeded': {
        const { data: payment } = await supabaseAdmin
          .from('payments')
          .select('user_id')
          .eq('yukassa_payment_id', object.payment_id)
          .single();

        if (payment) {
          await supabaseAdmin
            .from('users')
            .update({ plan: 'starter', cards_limit: 5 })
            .eq('id', payment.user_id);

          await supabaseAdmin
            .from('payments')
            .update({ status: 'refunded' })
            .eq('yukassa_payment_id', object.payment_id);
        }
        break;
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
