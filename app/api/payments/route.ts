import { NextRequest, NextResponse } from 'next/server';

// ЮKassa webhook handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, event, object } = body;

    console.log('ЮKassa webhook:', type, event);

    switch (event) {
      case 'payment.succeeded': {
        const paymentId = object.id;
        const amount = object.amount.value;
        const userId = object.metadata?.user_id;

        // TODO: Update user subscription in DB
        // await db.user.update({
        //   where: { id: userId },
        //   data: { plan: 'pro', planExpiresAt: addMonths(new Date(), 1) },
        // });

        console.log(`Payment succeeded: ${paymentId}, amount: ${amount}, user: ${userId}`);
        break;
      }

      case 'payment.canceled': {
        const paymentId = object.id;
        console.log(`Payment canceled: ${paymentId}`);
        break;
      }

      case 'refund.succeeded': {
        const refundId = object.id;
        const paymentId = object.payment_id;

        // TODO: Downgrade user plan
        console.log(`Refund succeeded: ${refundId} for payment ${paymentId}`);
        break;
      }

      default:
        console.log(`Unhandled event: ${event}`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('ЮKassa webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
