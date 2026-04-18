import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('продают сами');
    await expect(page.getByRole('link', { name: /создать карточку/i })).toBeVisible();
  });

  test('should navigate to pricing', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href*="pricing"]');
    await expect(page).toHaveURL(/pricing/);
    await expect(page.locator('h2')).toContainText('цены');
  });

  test('should open mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.click('button[aria-label="Меню"]');
    await expect(page.getByText('Возможности')).toBeVisible();
  });

  test('should scroll to features section', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#features"]');
    await expect(page.locator('#features')).toBeInViewport();
  });

  test('should display all 6 feature cards', async ({ page }) => {
    await page.goto('/');
    const features = page.locator('#features').locator('[class*="rounded-[28px]"]');
    await expect(features).toHaveCount(6);
  });

  test('should display comparison table', async ({ page }) => {
    await page.goto('/');
    const table = page.locator('#compare table');
    await expect(table).toBeVisible();
  });

  test('should show mobile CTA after scroll', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    await expect(page.getByText('Запустить бесплатно').last()).toBeVisible();
  });
});

test.describe('Blog', () => {
  test('should list blog posts', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('h2')).toContainText('деньги');
    const posts = page.locator('a[href*="/blog/"]');
    expect(await posts.count()).toBeGreaterThanOrEqual(3);
  });
});

test.describe('Contact Form', () => {
  test('should display contact form', async ({ page }) => {
    await page.goto('/contacts');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });
});

test.describe('404 Page', () => {
  test('should show 404 for unknown routes', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await expect(page.locator('text=404')).toBeVisible();
  });
});

test.describe('SEO', () => {
  test('should have correct meta tags', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title).toContain('ESEO');

    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toContain('AI');

    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toContain('ESEO');
  });

  test('robots.txt should be accessible', async ({ page }) => {
    const res = await page.goto('/robots.txt');
    expect(res?.status()).toBe(200);
  });

  test('sitemap.xml should be accessible', async ({ page }) => {
    const res = await page.goto('/sitemap.xml');
    expect(res?.status()).toBe(200);
  });
});
