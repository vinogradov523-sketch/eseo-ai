import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db/supabase';
import { generateCSV } from '@/lib/export/csv';

// Делаем роут полностью динамическим — чтобы он НЕ выполнялся во время сборки
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Защита: если переменные окружения не подгрузились — сразу ошибка
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ Supabase environment variables are missing during build or runtime');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    const user = await requireAuth();   // ← твоя функция авторизации

    const { data: cards, error } = await supabaseAdmin
      .from('cards')
      .select('title, description, marketplace, seo_score, keywords, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
    }

    const csv = generateCSV(cards || []);

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="eseo-cards-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}