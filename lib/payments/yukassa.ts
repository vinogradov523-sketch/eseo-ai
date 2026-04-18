import { YooCheckout } from '@a2seven/yoo-checkout';

const checkout = new YooCheckout({
  shopId: process.env.YUKASSA_SHOP_ID!,
  secretKey: process.env.YUKASSA_SECRET_KEY!,
});

export interface CreatePaymentParams {
  userId: string;
  email: string;
  plan: 'pro' | 'enterprise';
  amount: number;
  returnUrl: string;
}

export async function createPayment({
  userId,
  email,
  plan,
  amount,
  returnUrl,
}: CreatePaymentParams) {
  const idempotenceKey = `${userId}-${Date.now()}`;

  const payment = await checkout.createPayment(
    {
      amount: {
        value: amount.toFixed(2),
        currency: 'RUB',
      },
      confirmation: {
        type: 'redirect',
        return_url: returnUrl,
      },
      capture: true,
      description: `ESEO — подписка ${plan === 'pro' ? 'Pro' : 'Enterprise'}`,
      metadata: {
        user_id: userId,
        plan,
      },
      receipt: {
        customer: {
          email,
        },
        items: [
          {
            description: `Подписка ESEO ${plan === 'pro' ? 'Pro' : 'Enterprise'}`,
            quantity: '1.00',
            amount: {
              value: amount.toFixed(2),
              currency: 'RUB',
            },
            vat_code: 1,
            payment_mode: 'full_payment',
            payment_subject: 'service',
          },
        ],
      },
    },
    idempotenceKey
  );

  return payment;
}

export async function getPayment(paymentId: string) {
  return checkout.getPayment(paymentId);
}

export async function createRefund(paymentId: string, amount: number) {
  const idempotenceKey = `refund-${paymentId}-${Date.now()}`;
  return checkout.createRefund(
    {
      payment_id: paymentId,
      amount: {
        value: amount.toFixed(2),
        currency: 'RUB',
      },
    },
    idempotenceKey
  );
}
