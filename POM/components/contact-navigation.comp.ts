import { Locator } from '@playwright/test';
import { BasePageComponent } from '../base/base.page-components';

export class ContactNavigationComp extends BasePageComponent {
  public readonly base = this.page.locator('nav ul');

  public readonly contactListElement = this.base.locator('li');

  public async getContactByFullName(fullName: string): Promise<Locator> {
    return this.contactListElement.getByText(fullName);
  }
}
