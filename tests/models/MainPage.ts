import test, { Page, Locator, expect } from "@playwright/test";

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  }
}

export class MainPage {
    readonly page: Page;
    readonly elements: Elements[];

    constructor(page: Page){
        this.page = page
        this.elements = [
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
    }
    async openMainPage() {
        await this.page.goto('https://playwright.dev/')
    }
    async checkElementsVisability() {
        for (const { locator, name} of this.elements) {
            await test.step(`Check Visible ${name}`, async () => {
                await expect.soft(locator(this.page)).toBeVisible();
            });
        }
    };
    async checkElementsText() {
        for (const { locator, name, text} of this.elements) {
            if (text) {
                await test.step(`Check element name ${name}`, async () => {
                    await expect.soft(locator(this.page)).toContainText(text)
                })
            }
        }
    };
    async checkHrefAttribute() {
        for (const { locator, name, attribute} of this.elements) {
            if (attribute) {
                await test.step(`Check element href attribute ${name}`, async () => {
                    await expect.soft(locator(this.page)).toHaveAttribute(attribute.type, attribute.value)
                })
            }
        }
    };
    async clickSwitchLightModeIcon() {
        await this.page.getByLabel('Switch between dark and light').click();
    };
    async checkDataThemeAttributeValue() {
        await expect.soft(this.page.locator('html')).toHaveAttribute('data-theme', 'light')
    };
    async setLightMode() {
        await this.page.evaluate(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'light');
      });
    };
    async setDarkMode() {
        await this.page.evaluate(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'dark');
      });
    };
    async checkLayoutWithLightMode() {
        await expect(this.page).toHaveScreenshot(`pageWithLightMode.png`);
    };
    async checkLayoutWithDarkMode() {
        await expect(this.page).toHaveScreenshot(`pageWithDarkMode.png`);
    };
}