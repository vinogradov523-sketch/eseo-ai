export function generateCSV(cards: any[]): string {
  const headers = ['Заголовок', 'Описание', 'Маркетплейс', 'SEO Score', 'Ключевые слова', 'Дата'];
  const rows = cards.map((card) => [
    `"${(card.title || '').replace(/"/g, '""')}"`,
    `"${(card.description || '').replace(/"/g, '""').slice(0, 500)}"`,
    card.marketplace?.toUpperCase() || '',
    card.seo_score || 0,
    `"${(card.keywords || []).join(', ')}"`,
    card.created_at ? new Date(card.created_at).toLocaleDateString('ru-RU') : '',
  ]);

  return [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
}
