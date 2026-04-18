import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/db/supabase';
import { WildberriesAPI } from '@/lib/marketplace/wb';
import { OzonAPI } from '@/lib/marketplace/ozon';

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { marketplace, apiKey, clientId } = await req.json();

    // Validate key by making a test request
    if (marketplace === 'wb') {
      const wb = new WildberriesAPI({ apiKey });
      await wb.getSellerCards(1); // Test call
    } else if (marketplace === 'ozon') {
      if (!clientId) {
        return NextResponse.json({ error: 'Client ID обязателен для Ozon' }, { status: 400 });
      }
      const ozon = new OzonAPI({ clientId, apiKey });
      await ozon.getProductList(1, 1); // Test call
    }

    // Save encrypted key to DB
    await supabaseAdmin.from('marketplace_connections').upsert({
      user_id: user.id,
      marketplace,
      api_key_encrypted: apiKey, // TODO: encrypt with pgcrypto
      client_id: clientId || null,
      is_active: true,
      connected_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Не удалось подключить: ${error.message}` },
      { status: 400 }
    );
  }
}
