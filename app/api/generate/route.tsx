/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { generateCard } from '@/lib/ai/generate-card';
import { supabaseAdmin } from '@/lib/db/supabase';

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();

    // Check limits
    if (user.plan === 'starter' && user.cards_used_this_month >= user.cards_limit) {
      return NextResponse.json(
        { error: 'Лимит карточек исчерпан. Перейдите на Pro для безлимитных генераций.' },
        { status: 403 }
      );
    }

    const { input, mode, marketplace } = await req.json();

    if (!input?.trim()) {
      return NextResponse.json({ error: 'Введите данные товара' }, { status: 400 });
    }

    // Generate via AI
    const result = await generateCard({ input, mode, marketplace });

    // Save to DB
    const { data: card } = await supabaseAdmin
      .from('cards')
      .insert({
        user_id: user.id,
        marketplace,
        input_type: mode,
        input_data: input,
        title: result.title,
        description: result.description,
        bullets: result.bullets,
        keywords: result.keywords,
        seo_score: result.seoScore,
        status: 'ready',
      })
      .select()
      .single();

    // Increment usage
    await supabaseAdmin
      .from('users')
      .update({ cards_used_this_month: user.cards_used_this_month + 1 })
      .eq('id', user.id);

    // Log activity
    await supabaseAdmin.from('activity_log').insert({
      user_id: user.id,
      action: 'card_generated',
      details: { card_id: card?.id, marketplace, seo_score: result.seoScore },
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Generate error:', error);
    return NextResponse.json(
      { error: error.message || 'Ошибка генерации' },
      { status: 500 }
    );
  }
}
