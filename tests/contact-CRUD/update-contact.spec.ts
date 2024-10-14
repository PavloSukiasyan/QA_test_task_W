import { baseFixture as test, expect } from '../main.fixture';

test.describe('Tests for update contact:', () => {
  const initialContactInfo = {
    first_name: 'Adolin',
    last_name: 'Kholin',
    twitter: 'CosmereNetwork',
    avatarURL: 'https://pbs.twimg.com/profile_images/1827448004900474880/y6cYT3lP_400x400.jpg',
    notes: 'test first variant',
  };

  const updatedContactInfo = {
    first_name: 'Adolin_edited',
    last_name: 'Kholin_E',
    twitter: 'BrandSanderson',
    avatarURL: 'https://pbs.twimg.com/profile_images/1351305906798125057/L0pX3438_400x400.jpg',
    notes: 'Test edited....',
  };

  test.beforeEach(async ({ testWebClient }) => {
    await test.step('Sign in with default user', async () => {
      await testWebClient.loginPage.signInWithDefaultUser();
    });
  });

  test('T3: Update contact and save', async ({ testWebClient }) => {
    await test.step('Fill form for new Contact and save', async () => {
      await testWebClient.newAndSearchFormComp.newButton.click();

      await testWebClient.contactDetailComp.fillContactInfoFormAndSave({
        firstName: initialContactInfo.first_name,
        lastName: initialContactInfo.last_name,
        twitter: initialContactInfo.twitter,
        avatarURL: initialContactInfo.avatarURL,
        notes: initialContactInfo.notes,
      });
    });

    // No need to verify the contact on first save, it's done in T2 test.

    await test.step('Edit contact information and save', async () => {
      await testWebClient.contactDetailComp.editButton.click();

      await testWebClient.contactDetailComp.fillContactInfoFormAndSave({
        firstName: updatedContactInfo.first_name,
        lastName: updatedContactInfo.last_name,
        twitter: updatedContactInfo.twitter,
        avatarURL: updatedContactInfo.avatarURL,
        notes: updatedContactInfo.notes,
      });
    });

    await test.step('Verify contact information on details is changed', async () => {
      await expect.soft(testWebClient.contactDetailComp.image).toHaveAttribute('src', updatedContactInfo.avatarURL);
      await expect
        .soft(testWebClient.contactDetailComp.contactFullName)
        .toContainText(`${updatedContactInfo.first_name} ${initialContactInfo.last_name}`);
      await expect.soft(testWebClient.contactDetailComp.favoriteButton).toBeVisible();

      await expect.soft(testWebClient.contactDetailComp.contactTwitter).toHaveText(updatedContactInfo.twitter);
      await expect.soft(testWebClient.contactDetailComp.contactNotes).toHaveText(updatedContactInfo.notes);

      await expect.soft(testWebClient.contactDetailComp.editButton).toBeVisible();
      await expect.soft(testWebClient.contactDetailComp.deleteButton).toBeVisible();
    });

    await test.step('Verify contact on side bar', async () => {
      await expect
        .soft(testWebClient.contactNavigationComp.contactListElement.nth(0))
        .toHaveText(`${updatedContactInfo.first_name} ${updatedContactInfo.last_name}`);
      expect
        .soft(
          await testWebClient.contactNavigationComp.getContactByFullName(
            `${updatedContactInfo.first_name} ${updatedContactInfo.last_name}`
          )
        )
        .toBeVisible();
    });
  });

  test('T4: Try Update contact and then cancel', async ({ testWebClient }) => {
    await test.step('Fill form for new Contact and save', async () => {
      await testWebClient.newAndSearchFormComp.newButton.click();

      await testWebClient.contactDetailComp.fillContactInfoFormAndSave({
        firstName: initialContactInfo.first_name,
        lastName: initialContactInfo.last_name,
        twitter: initialContactInfo.twitter,
        avatarURL: initialContactInfo.avatarURL,
        notes: initialContactInfo.notes,
      });
    });

    // No need to verify the contact on first save, it's done in T2 test.

    await test.step('Edit contact information and cancel', async () => {
      await testWebClient.contactDetailComp.editButton.click();

      await testWebClient.contactDetailComp.fillContactInfoForm({
        firstName: updatedContactInfo.first_name,
        lastName: updatedContactInfo.last_name,
        twitter: updatedContactInfo.twitter,
        avatarURL: updatedContactInfo.avatarURL,
        notes: updatedContactInfo.notes,
      });

      await testWebClient.contactDetailComp.cancelButton.click();
    });

    await test.step('Verify contact information on details is not changed', async () => {
      await expect.soft(testWebClient.contactDetailComp.image).toHaveAttribute('src', initialContactInfo.avatarURL);
      await expect
        .soft(testWebClient.contactDetailComp.contactFullName)
        .toContainText(`${initialContactInfo.first_name} ${initialContactInfo.last_name}`);
      await expect.soft(testWebClient.contactDetailComp.favoriteButton).toBeVisible();

      await expect.soft(testWebClient.contactDetailComp.contactTwitter).toHaveText(initialContactInfo.twitter);
      await expect.soft(testWebClient.contactDetailComp.contactNotes).toHaveText(initialContactInfo.notes);

      await expect.soft(testWebClient.contactDetailComp.editButton).toBeVisible();
      await expect.soft(testWebClient.contactDetailComp.deleteButton).toBeVisible();
    });

    await test.step('Verify contact on side bar', async () => {
      await expect
        .soft(testWebClient.contactNavigationComp.contactListElement.nth(0))
        .toHaveText(`${initialContactInfo.first_name} ${initialContactInfo.last_name}`);
      expect
        .soft(
          await testWebClient.contactNavigationComp.getContactByFullName(
            `${initialContactInfo.first_name} ${initialContactInfo.last_name}`
          )
        )
        .toBeVisible();
    });
  });
});
