import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/db/supabase';
import { generateCSV } from '@/lib/export/csv';

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();

    const { data: cards } = await supabaseAdmin
      .from('cards')
      .select('title, description, marketplace, seo_score, keywords, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    const csv = generateCSV(cards || []);

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="eseo-cards-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
