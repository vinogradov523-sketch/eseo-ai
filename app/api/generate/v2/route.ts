import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { runCardCrewAI } from '@/lib/ai/agents/crew';
import { supabaseAdmin } from '@/lib/db/supabase';
import { withRateLimit } from '@/lib/api-helpers';

export const maxDuration = 60; // Allow 60s for multi-agent

export const POST = withRateLimit(
  async (req: NextRequest) => {
    const user = await requireAuth();

    if (user.plan === 'starter') {
      return NextResponse.json(
        { error: 'Multi-agent генерация доступна только на Pro и Enterprise тарифах.' },
        { status: 403 }
      );
    }

    const { input, mode, marketplace } = await req.json();

    if (!input?.trim()) {
      return NextResponse.json({ error: 'Введите данные' }, { status: 400 });
    }

    const result = await runCardCrewAI({ input, mode, marketplace });

    // Save to DB
    await supabaseAdmin.from('cards').insert({
      user_id: user.id,
      marketplace,
      input_type: mode,
      input_data: input,
      title: result.content.title,
      description: result.content.description,
      bullets: result.content.bullets,
      keywords: result.strategy.secondaryKeywords,
      seo_score: result.qa.seoScore,
      rich_content: {
        blocks: result.content.richContentBlocks,
        visuals: result.visuals,
        research: result.research,
        strategy: result.strategy,
        qa: result.qa,
      },
      status: 'ready',
    });

    await supabaseAdmin
      .from('users')
      .update({ cards_used_this_month: user.cards_used_this_month + 1 })
      .eq('id', user.id);

    return NextResponse.json(result);
  },
  { windowMs: 60_000, maxRequests: 5 }
);
