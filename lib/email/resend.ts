import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: 'ESEO <noreply@eseo-ai.ru>',
    to: email,
    subject: 'Добро пожаловать в ESEO! 🚀',
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: white; padding: 40px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #f97316, #ef4444); display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 24px; color: white;">E</div>
        </div>
        <h1 style="font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 16px;">
          Добро пожаловать, ${name}! 👋
        </h1>
        <p style="color: #a1a1aa; text-align: center; line-height: 1.6; margin-bottom: 32px;">
          Вы на шаг ближе к карточкам, которые продают сами. У вас 5 бесплатных генераций — начните прямо сейчас.
        </p>
        <div style="text-align: center; margin-bottom: 32px;">
          <a href="https://eseo-ai.ru/generator" style="display: inline-block; padding: 14px 32px; background: linear-gradient(90deg, #f97316, #ef4444); color: white; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 14px;">
            Создать первую карточку →
          </a>
        </div>
        <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px; color: #52525b; font-size: 12px; text-align: center;">
          ESEO — AI для маркетплейсов<br/>
          <a href="https://eseo-ai.ru" style="color: #f97316;">eseo-ai.ru</a>
        </div>
      </div>
    `,
  });
}

export async function sendPaymentSuccessEmail(email: string, plan: string) {
  await resend.emails.send({
    from: 'ESEO <noreply@eseo-ai.ru>',
    to: email,
    subject: `Подписка ${plan} активирована! ✅`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: white; padding: 40px; border-radius: 16px;">
        <h1 style="font-size: 24px; font-weight: 800; text-align: center;">Подписка ${plan} активирована! 🎉</h1>
        <p style="color: #a1a1aa; text-align: center; line-height: 1.6;">
          Теперь вам доступны все возможности тарифа ${plan}. Безлимитные генерации, аналитика, автоответы — всё готово к работе.
        </p>
        <div style="text-align: center; margin-top: 24px;">
          <a href="https://eseo-ai.ru/dashboard" style="display: inline-block; padding: 14px 32px; background: linear-gradient(90deg, #f97316, #ef4444); color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">
            Перейти в Dashboard →
          </a>
        </div>
      </div>
    `,
  });
}

export async function sendContactNotification(name: string, email: string, message: string) {
  await resend.emails.send({
    from: 'ESEO <noreply@eseo-ai.ru>',
    to: 'hello@eseo-ai.ru',
    subject: `📬 Новое сообщение от ${name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Новое сообщение с сайта</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong></p>
        <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${message}</p>
      </div>
    `,
  });
}
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return resend.emails.send({
    from: 'ESEO <noreply@eseo-ai.ru>',
    to,
    subject,
    html,
  });
}