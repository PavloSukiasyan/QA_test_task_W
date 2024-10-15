import { BasePageComponent } from '../base/base.page-components';

export class FooterComp extends BasePageComponent {
  public readonly base = this.page.locator('footer', { hasText: 'WEINMANN QA Task' });
  public readonly signOutButton = this.base.getByTestId('signout');
}
