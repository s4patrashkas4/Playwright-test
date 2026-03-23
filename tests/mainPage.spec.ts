import { test, expect, Locator, Page } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  }
}

const elements: Elements[] = [
  {
    name: 'Playwrite Logo link',
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    }
  },
  {
    name: 'API link',
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    }
  },
  {
    name: 'Node.js link',
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    text: 'Node.js',
  },
  {
    name: 'Community link',
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
    text: 'Community',
    attribute: {
      type: 'href',
      value: '/community/welcome',
    }
  },
  {
    name: 'GitHub link',
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' })
  },
  {
    name: 'Discord icon',
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' })
  },
  {
    name: 'LightMode icon',
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Switch between dark and light' })
  },
  {
    name: 'Search icon',
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' })
  },
  
];


test.describe('Tests main paig', () => {
  test.beforeEach(async ({ page })=> {
    await page.goto('https://playwright.dev/');
  });

  test('Check navigation elements view', async ({ page }) => {
    elements.forEach(({ name, locator }) => {
      test.step(`Check Visible ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      })
    })
  });

  test('Check name navigation elements', async ({ page }) => {
    elements.forEach(({name, locator, text}) => {
      if (text) {
        test.step(`Check element name ${name}`, async () => {
          await expect.soft(locator(page)).toContainText(text)
        })
      }
    })
  });

  test('Check elements href navigation', async ({ page }) => {
    elements.forEach(({name, locator, attribute, }) => {
      if (attribute) {
        test.step(`Check element href attribute ${name}`, async () => {
          await expect.soft(locator(page)).toHaveAttribute(attribute.type, attribute.value)
        })
      }
    })
  });

  test('Check theme select', async ({ page }) => {
    await page.getByLabel('Switch between dark and light').click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await page.getByLabel('Switch between dark and light').click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  });

  test('Check heading text', async ({ page }) => {
    await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
    await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
  });

  test('Check Get Started Btn', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/docs/intro');
  });
})

