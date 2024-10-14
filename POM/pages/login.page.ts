import { Page } from '@playwright/test';
import { BasePage } from '../base/base.page';
import { WebClientConfig } from '../index.page';

export class LoginPage extends BasePage {
  public readonly userNameInput = this.page.getByTestId('username');
  public readonly passwordInput = this.page.getByTestId('password');
  public readonly loginButton = this.page.getByTestId('signin');

  constructor(
    page: Page,
    private readonly config: WebClientConfig
  ) {
    super(page);
  }

  public async openLogin(): Promise<void> {
    await this.page.goto(`${this.config.url}/login`);
  }

  public async login(username: string, password: string): Promise<void> {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  public async signInWithDefaultUser(): Promise<void> {
    await this.openLogin();
    await this.login('test', 'test');
  }
}
