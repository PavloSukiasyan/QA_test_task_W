import { Page } from '@playwright/test';
import { BasePage } from './base/base.page';
import { WebClientConfig } from './index.page';

export class LoginPage extends BasePage {
  constructor(
    page: Page,
    private readonly config: WebClientConfig
  ) {
    super(page);
  }

  public async openLogin(): Promise<void> {
    await this.page.goto(`${this.config.url}/login`);
  }
}
