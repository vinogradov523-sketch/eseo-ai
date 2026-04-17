import Link from 'next/link';

const footerLinks = {
  product: [
    { href: '/generator', label: 'Генератор карточек' },
    { href: '/analytics', label: 'Аналитика' },
    { href: '/reviews', label: 'Автоответы' },
    { href: '/pricing', label: 'Тарифы' },
  ],
  company: [
    { href: '/about', label: 'О нас' },
    { href: '/blog', label: 'Блог' },
    { href: '/contacts', label: 'Контакты' },
  ],
  legal: [
    { href: '/legal/privacy', label: 'Конфиденциальность' },
    { href: '/legal/terms', label: 'Условия' },
    { href: '/legal/offer', label: 'Оферта' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <span className="text-white font-black text-lg">E</span>
              </div>
              <span className="font-bold text-lg">ESEO</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-4">
              AI-платформа для селлеров WB и Ozon. Генерация карточек, аналитика, автоответы.
            </p>
            <p className="text-xs text-zinc-600">ИНН: XXXXXXXXXX</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-zinc-300">Продукт</h4>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              {footerLinks.product.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-zinc-300">Компания</h4>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-zinc-300">Документы</h4>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              {footerLinks.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} ESEO. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://t.me/eseo_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-white transition-colors text-xs"
            >
              Telegram
            </a>
            <a
              href="mailto:hello@eseo-ai.ru"
              className="text-zinc-600 hover:text-white transition-colors text-xs"
            >
              hello@eseo-ai.ru
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
