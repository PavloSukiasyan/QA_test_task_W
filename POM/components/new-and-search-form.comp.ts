import { BasePageComponent } from '../base/base.page-components';

export class NewAndSearchFormComp extends BasePageComponent {
  public readonly base = this.page.locator('div#sidebar').nth(0);

  public readonly searchInput = this.base.getByRole('searchbox');
  public readonly spinner = this.base.locator('#search-spinner');

  public readonly newButton = this.base.getByTestId('new-contact');

  public async performSearch(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.spinner.waitFor({ state: 'visible' });
    await this.spinner.waitFor({ state: 'hidden' });
  }
}
