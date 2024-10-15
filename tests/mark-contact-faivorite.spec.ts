import { baseFixture as test, expect } from './main.fixture';

test.describe('Tests for favorite contact:', () => {
  const firstContactInfo = {
    first_name: 'Navani',
    last_name: 'Kholin',
    twitter: 'CosmereNetwork',
    avatarURL: 'https://pbs.twimg.com/profile_images/1827448004900474880/y6cYT3lP_400x400.jpg',
    notes: "Gavilar's widow, former queen, Dalinar's wife",
  };

  const secondContactInfo = {
    first_name: 'Jasnah',
    last_name: firstContactInfo.last_name,
    twitter: 'BrandSanderson',
    avatarURL: 'https://pbs.twimg.com/profile_images/1351305906798125057/L0pX3438_400x400.jpg',
    notes: 'Daughter of Gavilar and Navani, Queen of Alethkar',
  };

  test.beforeEach(async ({ testWebClient }) => {
    await test.step('Sign in with default user', async () => {
      await testWebClient.loginPage.signInWithDefaultUser();
    });

    await test.step('Create first contact', async () => {
      await testWebClient.newAndSearchFormComp.newButton.click();
      await testWebClient.contactDetailComp.fillContactInfoFormAndSave({
        firstName: firstContactInfo.first_name,
        lastName: firstContactInfo.last_name,
        twitter: firstContactInfo.twitter,
        avatarURL: firstContactInfo.avatarURL,
        notes: firstContactInfo.notes,
      });
    });

    await test.step('Create second contact', async () => {
      await testWebClient.newAndSearchFormComp.newButton.click();
      await testWebClient.contactDetailComp.fillContactInfoFormAndSave({
        firstName: secondContactInfo.first_name,
        lastName: secondContactInfo.last_name,
        twitter: secondContactInfo.twitter,
        avatarURL: secondContactInfo.avatarURL,
        notes: secondContactInfo.notes,
      });
    });

    await test.step(`Verify there is two contacts`, async () => {
      await expect(testWebClient.contactNavigationComp.contactListElement).toHaveCount(2);

      expect(
        await testWebClient.contactNavigationComp.getContactByFullName(
          `${firstContactInfo.first_name} ${firstContactInfo.last_name}`
        )
      ).toBeVisible();
      expect(
        await testWebClient.contactNavigationComp.getContactByFullName(
          `${secondContactInfo.first_name} ${secondContactInfo.last_name}`
        )
      ).toBeVisible();
    });
  });

  test('T10: Mark contact as favorite', async ({ testWebClient, page }) => {
    await test.step(`Select contact ${firstContactInfo.first_name}`, async () => {
      await (
        await testWebClient.contactNavigationComp.getContactByFullName(
          `${firstContactInfo.first_name} ${firstContactInfo.last_name}`
        )
      ).click();
      await expect(
        await testWebClient.contactNavigationComp.getContactByFullName(
          `${firstContactInfo.first_name} ${firstContactInfo.last_name}`
        )
      ).toHaveAttribute('class', 'active');
    });

    await test.step('Click on favorite button for contact and verify change', async () => {
      await expect(testWebClient.contactDetailComp.favoriteButton).toHaveAttribute('aria-label', 'Add to favorites');
      await testWebClient.contactDetailComp.favoriteButton.click();
      await expect(testWebClient.contactDetailComp.favoriteButton).toHaveAttribute(
        'aria-label',
        'Remove from favorites'
      );
    });

    await test.step('Verify change on contact list', async () => {
      expect(
        await testWebClient.contactNavigationComp.isContactFavorite(
          `${firstContactInfo.first_name} ${firstContactInfo.last_name}`
        )
      ).toBeTruthy();
    });

    await test.step('Verify other contact is not affected', async () => {
      // Has no favorite button enabled on contact list
      expect(
        await testWebClient.contactNavigationComp.isContactFavorite(
          `${secondContactInfo.first_name} ${secondContactInfo.last_name}`
        )
      ).toBeFalsy();

      await (
        await testWebClient.contactNavigationComp.getContactByFullName(
          `${secondContactInfo.first_name} ${secondContactInfo.last_name}`
        )
      ).click();
      await expect(
        await testWebClient.contactNavigationComp.getContactByFullName(
          `${secondContactInfo.first_name} ${secondContactInfo.last_name}`
        )
      ).toHaveAttribute('class', 'active');

      // Has no favorite button enabled on contact details
      await expect(testWebClient.contactDetailComp.favoriteButton).toHaveAttribute('aria-label', 'Add to favorites');
    });
  });
});
