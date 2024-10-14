import { Page } from '@playwright/test';
import { LoginPage } from './login.page';

export type WebClientConfig = {
  url: string;
};

export class WebClient {
  private readonly baseUrl: string;
  public readonly loginPage: LoginPage;

  constructor(
    public readonly page: Page,
    config: WebClientConfig
  ) {
    this.baseUrl = config.url;
    this.loginPage = new LoginPage(page, config);
  }
}
