import { BasePageComponent } from '../base/base.page-components';

export class NewAndSearchFormComp extends BasePageComponent {
  public readonly base = this.page.locator('div#sidebar').nth(0);

  public readonly searchInput = this.base.getByRole('searchbox');
  public readonly newButton = this.base.getByTestId('new-contact');
}
