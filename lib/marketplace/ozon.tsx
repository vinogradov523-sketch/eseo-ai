const OZON_API_BASE = 'https://api-seller.ozon.ru';

interface OzonApiConfig {
  clientId: string;
  apiKey: string;
}

export class OzonAPI {
  private clientId: string;
  private apiKey: string;

  constructor(config: OzonApiConfig) {
    this.clientId = config.clientId;
    this.apiKey = config.apiKey;
  }

  private async request(path: string, body: any = {}) {
    const res = await fetch(`${OZON_API_BASE}${path}`, {
      method: 'POST',
      headers: {
        'Client-Id': this.clientId,
        'Api-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Ozon API error: ${res.status} — ${error}`);
    }

    return res.json();
  }

  // ─── Получить список товаров ───
  async getProductList(page = 1, pageSize = 100) {
    return this.request('/v2/product/list', {
      filter: {},
      page,
      page_size: pageSize,
    });
  }

  // ─── Получить информацию о товаре ───
  async getProductInfo(productId: number) {
    return this.request('/v2/product/info', {
      product_id: productId,
    });
  }

  // ─── Создать товар ───
  async createProduct(productData: any) {
    return this.request('/v2/product/import', {
      items: [productData],
    });
  }

  // ─── Обновить описание и характеристики ───
  async updateProductDescription(productId: number, data: {
    description?: string;
    name?: string;
    attributes?: any[];
  }) {
    return this.request('/v1/product/update', {
      product_id: productId,
      ...data,
    });
  }

  // ─── Получить отзывы ───
  async getReviews(page = 1, pageSize = 50) {
    return this.request('/v1/review/list', {
      page,
      page_size: pageSize,
      sort_dir: 'desc',
    });
  }

  // ─── Ответить на отзыв ───
  async replyToReview(reviewId: number, text: string) {
    return this.request('/v1/review/comment/create', {
      review_id: reviewId,
      text,
    });
  }

  // ─── Аналитика ───
  async getAnalytics(dateFrom: string, dateTo: string, metrics: string[]) {
    return this.request('/v1/analytics/data', {
      date_from: dateFrom,
      date_to: dateTo,
      metrics,
      dimension: ['sku'],
      filters: [],
      sort: [{ key: 'revenue', order: 'DESC' }],
      limit: 100,
      offset: 0,
    });
  }

  // ─── Позиции в поиске ───
  async getSearchPosition(query: string, productId: number) {
    // Ozon не предоставляет прямой API для позиций,
    // используем парсинг или сторонний сервис
    // Это placeholder для будущей интеграции
    return { query, productId, position: null };
  }
}
