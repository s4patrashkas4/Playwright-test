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
  {
    name: 'Playwright enables reliable',
    locator: (page: Page): Locator => page.getByRole('heading', { name: 'Playwright enables reliable' }),
    text: 'Playwright enables reliable end-to-end testing for modern web apps.',
  },
  {
    name: 'Check Get Started Btn',
    locator: (page: Page):Locator => page.getByRole('link', { name: 'Get started' }),
    text: 'Get started',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    }
  }
];

const themeMods = ['light', 'dark']

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

  themeMods.forEach((value) => {
    test(`Check style active ${value} mod`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme', value);
      }, value);
      await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
    })
  })
})

