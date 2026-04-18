/* eslint-disable @typescript-eslint/no-explicit-any */
const WB_API_BASE = 'https://suppliers-api.wildberries.ru';
const WB_STATS_BASE = 'https://statistics-api.wildberries.ru';
const WB_CONTENT_BASE = 'https://content-api.wildberries.ru';

interface WbApiConfig {
  apiKey: string;
}

export class WildberriesAPI {
  private apiKey: string;

  constructor(config: WbApiConfig) {
    this.apiKey = config.apiKey;
  }

  private async request(baseUrl: string, path: string, options: RequestInit = {}) {
    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        Authorization: this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`WB API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  // ─── Получить информацию о товаре по артикулу ───
  async getProductByNmId(nmId: number) {
    return this.request(
      'https://card.wb.ru',
      `/cards/v2/detail?appType=1&curr=rub&nm=${nmId}`
    );
  }

  // ─── Поиск товаров по запросу ───
  async searchProducts(query: string, page = 1) {
    const res = await fetch(
      `https://search.wb.ru/exactmatch/ru/common/v5/search?` +
      `appType=1&curr=rub&dest=-1257786&page=${page}&query=${encodeURIComponent(query)}&resultset=catalog&sort=popular&spp=30`
    );
    return res.json();
  }

  // ─── Получить отзывы ───
  async getReviews(imtId: number) {
    const res = await fetch(
      `https://feedbacks1.wb.ru/feedbacks/v1/${imtId}`
    );
    return res.json();
  }

  // ─── Создать/обновить карточку товара (для авторизованных селлеров) ───
  async createCard(cardData: any) {
    return this.request(WB_CONTENT_BASE, '/content/v2/cards/upload', {
      method: 'POST',
      body: JSON.stringify([cardData]),
    });
  }

  async updateCard(cardData: any) {
    return this.request(WB_CONTENT_BASE, '/content/v2/cards/update', {
      method: 'POST',
      body: JSON.stringify([cardData]),
    });
  }

  // ─── Статистика продаж ───
  async getSalesStats(dateFrom: string) {
    return this.request(WB_STATS_BASE, `/api/v1/supplier/sales?dateFrom=${dateFrom}`);
  }

  // ─── Получить список карточек продавца ───
  async getSellerCards(limit = 100, cursor = '') {
    return this.request(WB_CONTENT_BASE, '/content/v2/get/cards/list', {
      method: 'POST',
      body: JSON.stringify({
        settings: {
          cursor: { limit, updatedAt: cursor || undefined },
          filter: { withPhoto: -1 },
        },
      }),
    });
  }

  // ─── Ответить на отзыв ───
  async replyToFeedback(feedbackId: string, text: string) {
    return this.request(WB_API_BASE, '/api/v1/feedbacks', {
      method: 'PATCH',
      body: JSON.stringify({ id: feedbackId, text }),
    });
  }
}
