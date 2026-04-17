'use client';

import { useState } from 'react';
import { ArrowRight, Play, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Вариант анимации для stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-2xl font-black">E</div>
            <span className="text-3xl font-black tracking-tighter">ESEO</span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            <a href="#features" className="hover:text-orange-400 transition-colors">Возможности</a>
            <a href="#how" className="hover:text-orange-400 transition-colors">Как работает</a>
            <a href="#cases" className="hover:text-orange-400 transition-colors">Кейсы</a>
            <a href="#pricing" className="hover:text-orange-400 transition-colors">Цены</a>
          </div>

          <button className="hidden md:block px-8 py-3.5 bg-white text-black font-semibold rounded-2xl hover:bg-orange-500 hover:text-white transition-all">
            Запустить бесплатно →
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Мобильное меню */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="md:hidden overflow-hidden bg-black/95 border-t border-white/10"
        >
          <div className="flex flex-col items-center gap-8 py-10 text-lg">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-400">Возможности</a>
            <a href="#how" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-400">Как работает</a>
            <a href="#cases" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-400">Кейсы</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-400">Цены</a>

            <button 
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 w-[90%] py-4 bg-white text-black font-semibold rounded-2xl text-lg"
            >
              Запустить бесплатно →
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center relative pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_35%,rgba(249,115,22,0.20),transparent_60%)] animate-[fog_65s_linear_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_60%,rgba(249,115,22,0.14),transparent_70%)] animate-[fog_85s_linear_infinite_reverse]" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10 inline-flex items-center gap-3 px-8 py-3.5 bg-zinc-900/80 border border-orange-500/30 rounded-full text-orange-400 text-sm"
          >
            <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></span>
            САЙТ В РАЗРАБОТКЕ — MVP СКОРО
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-6"
          >
            AI, который делает<br />селлеров на WB и Ozon
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="text-[4.5rem] md:text-[7.5rem] lg:text-[8.2rem] font-black tracking-[-0.05em] text-orange-500 leading-none mb-12"
          >
            непобедимыми
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-16"
          >
            Генерирует мощные карточки товаров, анализирует конкурентов<br className="hidden md:block" />
            и помогает расти продажам автоматически.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-20">
            <motion.button 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => alert('Генератор пока в разработке. Скоро будет доступен!')}
              className="px-14 py-7 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-3xl transition-all flex items-center gap-3"
            >
              Запустить генератор карточек <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={() => alert('Демо видео скоро будет добавлено')}
              className="px-12 py-7 border border-white/40 hover:bg-white/10 text-lg rounded-3xl transition-all flex items-center gap-3"
            >
              <Play className="w-5 h-5" /> Смотреть демо
            </motion.button>
          </div>

          <p className="text-zinc-400 text-base">
            5 карточек бесплатно • Без карты • Моментальный доступ
          </p>
        </div>
      </section>

      {/* Возможности с stagger */}
      <section id="features" className="py-24 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16">Возможности</h2>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: "📝", title: "Генератор карточек", desc: "Загрузи фото или ссылку — получи SEO-заголовки, описание, инфографику и видео-обложку за 30 секунд." },
              { icon: "📊", title: "Аналитика конкурентов", desc: "Автоматически отслеживает цены, остатки и позиции конкурентов. Даёт рекомендации по ценам и акциям." },
              { icon: "💬", title: "Автоответы на отзывы", desc: "Отвечает покупателям 24/7, превращает негатив в продажи и защищает репутацию магазина." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                whileHover={{ y: -12 }}
                className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 hover:border-orange-500 transition-all"
              >
                <div className="text-orange-500 text-6xl mb-6">{item.icon}</div>
                <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                <p className="text-zinc-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Как работает */}
      <section id="how" className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16">Как это работает</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[1,2,3,4].map((num, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-6xl mb-6">{num}️⃣</div>
                <h3 className="font-semibold mb-3">
                  {num === 1 && "Загружаете товар"}
                  {num === 2 && "AI анализирует"}
                  {num === 3 && "Генерирует контент"}
                  {num === 4 && "Получаете результат"}
                </h3>
                <p className="text-zinc-400 text-sm">
                  {num === 1 && "Фото или ссылку с поставщика"}
                  {num === 2 && "Изучает рынок и конкурентов"}
                  {num === 3 && "Карточку, описание, визуалы"}
                  {num === 4 && "Готово к загрузке в WB/Ozon"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Кейсы с stagger */}
      <section id="cases" className="py-24 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-16">Кейсы</h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              { percent: "↑ 87%", title: "Магазин одежды", desc: "CTR вырос на 87%, продажи — на 62% за первый месяц." },
              { percent: "↓ 71%", title: "Электроника", desc: "Автоответы снизили негативные отзывы на 71% и увеличили повторные покупки." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 hover:border-orange-500 transition-all"
              >
                <div className="text-6xl text-orange-500 mb-6">{item.percent}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-zinc-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Цены с stagger */}
      <section id="pricing" className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16">Цены</h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Free */}
            <motion.div variants={cardVariants} className="bg-zinc-900 p-10 rounded-3xl border border-zinc-700">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-5xl font-black mb-8">0 ₽</p>
              <ul className="space-y-4 text-zinc-400 mb-10">
                <li>✓ 5 карточек в месяц</li>
                <li>✓ Базовая генерация</li>
              </ul>
              <button className="w-full py-4 border border-white/30 rounded-2xl">Начать бесплатно</button>
            </motion.div>

            {/* Pro */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-orange-600 p-10 rounded-3xl border border-orange-500 scale-105 relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-700 text-white text-xs px-5 py-1 rounded-full">РЕКОМЕНДУЕМ</div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-5xl font-black mb-8">29 000 ₽<span className="text-base">/мес</span></p>
              <ul className="space-y-4 text-white mb-10">
                <li>✓ Безлимитные генерации</li>
                <li>✓ Аналитика конкурентов</li>
                <li>✓ Автоответы на отзывы</li>
              </ul>
              <button className="w-full py-4 bg-white text-black rounded-2xl font-semibold">Выбрать Pro</button>
            </motion.div>

            {/* Enterprise */}
            <motion.div variants={cardVariants} className="bg-zinc-900 p-10 rounded-3xl border border-zinc-700">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-5xl font-black mb-8">от 79 000 ₽</p>
              <ul className="space-y-4 text-zinc-400 mb-10">
                <li>✓ Всё из Pro</li>
                <li>✓ White Label</li>
                <li>✓ Интеграция с 1С</li>
              </ul>
              <button className="w-full py-4 border border-white/30 rounded-2xl">Связаться с нами</button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}