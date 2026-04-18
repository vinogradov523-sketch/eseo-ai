export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { createPayment } from '@/lib/payments/yukassa';

const PRICES = {
  pro: 29000,
  enterprise: 79000,
};

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { plan } = await req.json();

    if (!plan || !PRICES[plan as keyof typeof PRICES]) {
      return NextResponse.json({ error: 'Неверный план' }, { status: 400 });
    }

    const payment = await createPayment({
      userId: user.id,
      email: user.email,
      plan: plan as 'pro' | 'enterprise',
      amount: PRICES[plan as keyof typeof PRICES],
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?payment=success`,
    });

    return NextResponse.json({
      paymentUrl: payment.confirmation.confirmation_url,
      paymentId: payment.id,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json({ error: 'Ошибка создания платежа' }, { status: 500 });
  }
}
