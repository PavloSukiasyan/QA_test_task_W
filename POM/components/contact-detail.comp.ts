import { BasePageComponent } from '../base/base.page-components';

export class ContactDetailComp extends BasePageComponent {
  public readonly base = this.page.locator('div#detail');

  // Fields
  public readonly firstNameInput = this.base.getByTestId('first');
  public readonly lastNameInput = this.base.getByTestId('last');
  public readonly twitterInput = this.base.getByTestId('twitter');
  public readonly avatarURLInput = this.base.getByTestId('avatar');
  public readonly notesInput = this.base.getByTestId('notes');

  // Buttons for create
  public readonly saveButton = this.base.getByTestId('save-contact');
  public readonly cancelButton = this.base.getByTestId('save-contact');

  // Saved contact information
  public readonly contactInfoSection = this.base.locator('#contact');

  public readonly image = this.contactInfoSection.locator('img');
  public readonly contactFullName = this.contactInfoSection.locator('h1');
  public readonly contactTwitter = this.contactInfoSection.locator('a');
  public readonly contactNotes = this.contactInfoSection.locator('p').nth(1);

  // Buttons for edit, delete and favorite
  public readonly favoriteButton = this.contactInfoSection.getByTestId('favorize-contact');
  public readonly editButton = this.contactInfoSection.getByTestId('edit-contact');
  public readonly deleteButton = this.contactInfoSection.getByTestId('delete-contact');
}
