import { type Page, test as base } from '@playwright/test';
import { WebClient } from '../POM/index.page';
import { getConfig, TestConfig } from '../utils/config';

type WebFixtures = {
  appPage: Page;
  testWebClient: WebClient;
};

type OtherFixtures = {
  testConfig: TestConfig;
};

export const baseFixture = base.extend<WebFixtures & OtherFixtures>({
  appPage: async ({ page }, use) => {
    await use(page);
  },

  testWebClient: async ({ page }, use) => {
    const webConfig = getConfig();
    const webClient = new WebClient(page, webConfig.config);
    await webClient.loginPage.openLogin();
    await use(webClient);
  },
});

export { expect } from '@playwright/test';
