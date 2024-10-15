import { baseFixture as test, expect } from '../main.fixture';

test.describe('Tests for delete contact:', () => {
  const first_name = 'Gavilar';
  const last_name = 'Kholin';

  test('T5: Delete contact', async ({ testWebClient }) => {
    await test.step('Sign in with default user', async () => {
      await testWebClient.loginPage.signInWithDefaultUser();
    });

    await test.step('Fill form for new Contact and save', async () => {
      await testWebClient.newAndSearchFormComp.newButton.click();

      await testWebClient.contactDetailComp.fillContactInfoFormAndSave({
        firstName: first_name,
        lastName: last_name,
      });
    });

    await test.step('Verify contact information on details', async () => {
      await expect.soft(testWebClient.contactDetailComp.contactFullName).toContainText(`${first_name} ${last_name}`);
      await expect.soft(testWebClient.contactDetailComp.favoriteButton).toBeVisible();

      await expect.soft(testWebClient.contactDetailComp.deleteButton).toBeVisible();
    });

    await test.step('Verify contact on side bar, to be sure it can be deleted', async () => {
      await expect
        .soft(testWebClient.contactNavigationComp.contactListElement.nth(0))
        .toHaveText(`${first_name} ${last_name}`);
      expect
        .soft(await testWebClient.contactNavigationComp.getContactByFullName(`${first_name} ${last_name}`))
        .toBeVisible();
    });

    await test.step('Click on delete button and accept', async () => {
      // We need to first wait for dialog event in order to accept the dialog
      await testWebClient.acceptDialog();
      await testWebClient.contactDetailComp.deleteButton.click();
    });

    await test.step('Verify contact is deleted and not shown in contact details', async () => {
      await expect.soft(testWebClient.contactDetailComp.emptyContactInfoSection).toHaveText('Please select a contact');
    });

    await test.step('Verify contact is deleted in side bar', async () => {
      await expect.soft(testWebClient.contactNavigationComp.contactListElement.nth(0)).toBeHidden();
      expect
        .soft(await testWebClient.contactNavigationComp.getContactByFullName(`${first_name} ${last_name}`))
        .toBeHidden();
    });
  });
});
