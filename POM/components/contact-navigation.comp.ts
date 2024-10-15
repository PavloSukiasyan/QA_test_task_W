import { Locator } from '@playwright/test';
import { BasePageComponent } from '../base/base.page-components';

export class ContactNavigationComp extends BasePageComponent {
  public readonly base = this.page.locator('nav');

  public readonly contactListElement = this.base.locator('li');
  public readonly noContactsLabel = this.base.locator('i', { hasText: 'No contacts' });

  public async getContactByFullName(fullName: string): Promise<Locator> {
    return this.contactListElement.getByText(fullName);
  }

  public async isContactFavorite(fullName: string): Promise<boolean> {
    const contact = await this.getContactByFullName(fullName);
    try {
      await contact.getByTestId('favorized').waitFor({ state: 'visible', timeout: 10 * 1000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}
