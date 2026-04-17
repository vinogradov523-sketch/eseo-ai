'use client';

import { useState } from 'react';
import { ArrowRight, Play, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🔥 фикс: убрали типы → добавили as any
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  } as any;

  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  } as any;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-xl font-black">
              E
            </div>
            <span className="text-2xl font-black">ESEO</span>
          </div>

          <div className="hidden md:flex gap-8 text-sm">
            <a href="#features">Возможности</a>
            <a href="#how">Как работает</a>
            <a href="#pricing">Цены</a>
          </div>

          <button className="hidden md:block px-6 py-3 bg-white text-black rounded-xl">
            Запустить
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center text-center px-6 pt-24">
        <div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            AI для маркетплейсов
          </h1>

          <p className="text-zinc-400 mb-10">
            Генерируй карточки для Wildberries и Ozon за 30 секунд
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-orange-500 rounded-xl flex items-center gap-2">
              Запустить <ArrowRight size={18} />
            </button>

            <button className="px-8 py-4 border border-white/30 rounded-xl flex items-center gap-2">
              <Play size={18} /> Демо
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Возможности</h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-3 gap-6"
          >
            {["Генерация карточек", "Аналитика", "Автоответы"].map((item, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="bg-zinc-900 p-6 rounded-xl"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Как работает</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-6">
          {["Загрузка", "Анализ", "Генерация", "Результат"].map((step, i) => (
            <div key={i}>{step}</div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 bg-zinc-950 text-center">
        <h2 className="text-3xl font-bold mb-10">Цены</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
          
          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3>Free</h3>
            <p>0 ₽</p>
          </div>

          <div className="bg-orange-500 p-6 rounded-xl text-black">
            <h3>Pro</h3>
            <p>29 000 ₽</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3>Enterprise</h3>
            <p>от 79 000 ₽</p>
          </div>

        </div>
      </section>

    </div>
  );
}