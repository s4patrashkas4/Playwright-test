import { test, expect } from '../fixtures/mainPaige'
import { MainPage } from '../models/MainPage';

test.describe('Tests main paig', () => {

  test('Check navigation elements view', async ({ mainPage }) => {
    await mainPage.checkElementsVisability();
  });

  test('Check name navigation elements', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test('Check elements href navigation', async ({ mainPage }) => {
    await mainPage.checkHrefAttribute();
  });

  test('Check theme select', async ({ mainPage }) => {
    await test.step('Click on icon change light mode', async () => {
      await mainPage.clickSwitchLightModeIcon();
    })
    await test.step('Chech change attribute', async () => {
      await mainPage.checkDataThemeAttributeValue();
    })
  });

  test('Check Style Light mode', async ({ mainPage }) => {
    await test.step('Step light mode', async () => {
      await mainPage.setLightMode();
    })
    await test.step('Check with light attribute', async () => {
      await mainPage.checkLayoutWithLightMode();
    })
  })

  test('Check Style Dark mode', async ({ mainPage }) => {
    await test.step('Step dark mode', async () => {
      await mainPage.setDarkMode();
    })
    test.setTimeout(140_000);
    await test.step('Check with dark attribute', async () => {
      await mainPage.checkLayoutWithDarkMode();
    })
  })
})

