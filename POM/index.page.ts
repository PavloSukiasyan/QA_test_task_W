import { Page } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { NewAndSearchFormComp } from './components/new-and-search-form.comp';
import { ContactDetailComp } from './components/contact-detail.comp';
import { ContactNavigationComp } from './components/contact-navigation.comp';
import { FooterComp } from './components/footer.comp';

export type WebClientConfig = {
  url: string;
};

export class WebClient {
  private readonly baseUrl: string;
  public readonly loginPage: LoginPage;
  public readonly newAndSearchFormComp: NewAndSearchFormComp;
  public readonly contactDetailComp: ContactDetailComp;
  public readonly contactNavigationComp: ContactNavigationComp;
  public readonly footerComp: FooterComp;

  constructor(
    public readonly page: Page,
    config: WebClientConfig
  ) {
    this.baseUrl = config.url;
    this.loginPage = new LoginPage(page, config);
    this.newAndSearchFormComp = new NewAndSearchFormComp(page);
    this.contactDetailComp = new ContactDetailComp(page);
    this.contactNavigationComp = new ContactNavigationComp(page);
    this.footerComp = new FooterComp(page);
  }

  public async acceptDialog(): Promise<void> {
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
  }
}
