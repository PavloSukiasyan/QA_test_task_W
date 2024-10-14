import { BasePageComponent } from '../base/base.page-components';

export class NewAndSearchFormComp extends BasePageComponent {
  public base = this.page.locator('div#sidebar').nth(0);

  public searchInput = this.base.getByRole('searchbox');
  public newButton = this.base.getByTestId('new-contact');
}
