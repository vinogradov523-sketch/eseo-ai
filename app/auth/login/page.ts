'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-white font-black text-xl">E</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Вход в ESEO</h1>
          <p className="text-sm text-zinc-500">Рады видеть вас снова</p>
        </div>

        {/* Form */}
        <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-5">
          {/* Email */}
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full min-h-12 rounded-xl bg-white/5 border border-white/10 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/30 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">
              Пароль
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full min-h-12 rounded-xl bg-white/5 border border-white/10 pl-11 pr-11 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/30 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="text-right">
            <Link href="/auth/reset" className="text-xs text-orange-400 hover:underline">
              Забыли пароль?
            </Link>
          </div>

          {/* Submit */}
          <button className="w-full min-h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all touch-manipulation">
            Войти
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-xs text-zinc-600">или</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Social */}
          <button className="w-full min-h-12 rounded-xl border border-white/10 bg-white/5 text-sm font-medium flex items-center justify-center gap-3 hover:bg-white/10 transition-colors touch-manipulation">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.54 12.2c0-.73-.07-1.43-.19-2.1H12v3.97h5.36a4.58 4.58 0 01-1.99 3.01v2.5h3.22c1.89-1.74 2.98-4.3 2.98-7.38h-.03z" fill="#4285F4"/>
              <path d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.22-2.5c-.9.6-2.04.95-3.4.95-2.62 0-4.83-1.77-5.62-4.15H3.06v2.58A9.99 9.99 0 0012 22z" fill="#34A853"/>
              <path d="M6.38 13.88A6.02 6.02 0 016.05 12c0-.65.12-1.29.33-1.88V7.54H3.06A9.99 9.99 0 002 12c0 1.61.39 3.14 1.06 4.46l3.32-2.58z" fill="#FBBC05"/>
              <path d="M12 5.97c1.47 0 2.8.51 3.84 1.5l2.88-2.88C16.96 2.99 14.7 2 12 2 8.48 2 5.44 4.02 3.06 7.54l3.32 2.58C7.17 7.74 9.38 5.97 12 5.97z" fill="#EA4335"/>
            </svg>
            Войти через Google
          </button>
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-zinc-500 mt-6">
          Нет аккаунта?{' '}
          <Link href="/auth/register" className="text-orange-400 hover:underline font-medium">
            Создать бесплатно
          </Link>
        </p>

        {/* Back */}
        <div className="text-center mt-4">
          <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
