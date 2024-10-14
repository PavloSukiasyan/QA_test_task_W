import { baseFixture as test, expect } from '../main.fixture';

test.describe('Tests for create contact:', () => {
  const first_name = 'Dalinar';
  const last_name = 'Kholin';
  const twitter = 'CosmereNetwork';
  const avatarURL = 'https://pbs.twimg.com/profile_images/1827448004900474880/y6cYT3lP_400x400.jpg';
  const notes = 'test!';

  test.only('T2: Create contact', async ({ testWebClient }) => {
    await test.step('Sign in with default user', async () => {
      await testWebClient.loginPage.signInWithDefaultUser();
    });

    await test.step('Fill form for new Contact and save', async () => {
      await testWebClient.newAndSearchFormComp.newButton.click();

      await testWebClient.contactDetailComp.firstNameInput.fill(first_name);
      await testWebClient.contactDetailComp.lastNameInput.fill(last_name);
      await testWebClient.contactDetailComp.twitterInput.fill(twitter);
      await testWebClient.contactDetailComp.avatarURLInput.fill(avatarURL);
      await testWebClient.contactDetailComp.notesInput.fill(notes);

      await testWebClient.contactDetailComp.saveButton.click();
    });

    await test.step('Verify contact information on details', async () => {
      await expect.soft(testWebClient.contactDetailComp.image).toHaveAttribute('src', avatarURL);
      await expect.soft(testWebClient.contactDetailComp.contactFullName).toContainText(`${first_name} ${last_name}`);
      await expect.soft(testWebClient.contactDetailComp.favoriteButton).toBeVisible();

      await expect.soft(testWebClient.contactDetailComp.contactTwitter).toHaveText(twitter);
      await expect.soft(testWebClient.contactDetailComp.contactNotes).toHaveText(notes);

      await expect.soft(testWebClient.contactDetailComp.editButton).toBeVisible();
      await expect.soft(testWebClient.contactDetailComp.deleteButton).toBeVisible();
    });

    await test.step('Verify contact on side bar', async () => {
      await expect
        .soft(testWebClient.contactNavigationComp.contactListElement.nth(0))
        .toHaveText(`${first_name} ${last_name}`);
      expect
        .soft(await testWebClient.contactNavigationComp.getContactByFullName(`${first_name} ${last_name}`))
        .toBeVisible();
    });
  });
});
