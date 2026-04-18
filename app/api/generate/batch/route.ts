import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { generateCard } from '@/lib/ai/generate-card';
import { supabaseAdmin } from '@/lib/db/supabase';

export const maxDuration = 300; // 5 min for batch

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();

    if (user.plan === 'starter') {
      return NextResponse.json(
        { error: 'Массовая обработка доступна на Pro+' },
        { status: 403 }
      );
    }

    const { items, marketplace } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Список товаров пуст' }, { status: 400 });
    }

    if (items.length > 100) {
      return NextResponse.json({ error: 'Максимум 100 товаров за раз' }, { status: 400 });
    }

    const results: Array<{ index: number } & Awaited<ReturnType<typeof generateCard>>> = [];
    const errors: Array<{ index: number; error: string }> = [];

    // Process in chunks of 5 (parallel within chunk)
    const chunkSize = 5;
    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = items.slice(i, i + chunkSize);

      const chunkResults = await Promise.allSettled(
        chunk.map(async (item: { input: string; mode: string }, index: number) => {
          const result = await generateCard({
            input: item.input,
            mode: (item.mode || 'text') as 'url' | 'text' | 'photo',
            marketplace,
          });

          // Save to DB
          await supabaseAdmin.from('cards').insert({
            user_id: user.id,
            marketplace,
            input_type: item.mode || 'text',
            input_data: item.input,
            title: result.title,
            description: result.description,
            bullets: result.bullets,
            keywords: result.keywords,
            seo_score: result.seoScore,
            status: 'ready',
          });

          return { index: i + index, ...result };
        })
      );

      for (const r of chunkResults) {
        if (r.status === 'fulfilled') {
          results.push(r.value);
        } else {
          errors.push({ index: i, error: r.reason?.message });
        }
      }
    }

    // Update usage count
    await supabaseAdmin
      .from('users')
      .update({
        cards_used_this_month: user.cards_used_this_month + results.length,
      })
      .eq('id', user.id);

    return NextResponse.json({
      total: items.length,
      success: results.length,
      failed: errors.length,
      results,
      errors,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
