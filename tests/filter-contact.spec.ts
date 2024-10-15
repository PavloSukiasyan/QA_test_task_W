import { baseFixture as test, expect } from './main.fixture';

test.describe('Tests for filter contact:', () => {
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

  const thirdContactInfo = {
    first_name: 'Shallan',
    last_name: 'Davar',
    notes: 'Daughter of the recently deceased Brightlord Lin Davar of Jah Keved.',
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

    await test.step('Create third contact', async () => {
      await testWebClient.newAndSearchFormComp.newButton.click();
      await testWebClient.contactDetailComp.fillContactInfoFormAndSave({
        firstName: thirdContactInfo.first_name,
        lastName: thirdContactInfo.last_name,
        notes: thirdContactInfo.notes,
      });
    });

    await test.step(`Verify there is three contacts`, async () => {
      await expect(testWebClient.contactNavigationComp.contactListElement).toHaveCount(3);

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
      expect(
        await testWebClient.contactNavigationComp.getContactByFullName(
          `${thirdContactInfo.first_name} ${thirdContactInfo.last_name}`
        )
      ).toBeVisible();
    });
  });

  test('T6: Filter one contact', async ({ testWebClient }) => {
    await test.step(`Filter out ${firstContactInfo.first_name}`, async () => {
      await testWebClient.newAndSearchFormComp.performSearch(`${firstContactInfo.first_name}`);
    });

    await test.step('Verify contact is filtered', async () => {
      await expect(testWebClient.contactNavigationComp.contactListElement).toHaveCount(1);
      await expect(testWebClient.contactNavigationComp.contactListElement.nth(0)).toHaveText(
        `${firstContactInfo.first_name} ${firstContactInfo.last_name}`
      );
      expect(
        await testWebClient.contactNavigationComp.getContactByFullName(
          `${firstContactInfo.first_name} ${firstContactInfo.last_name}`
        )
      ).toBeVisible();
    });
  });

  test('T7: Filter two contacts with the same last name', async ({ testWebClient }) => {
    await test.step(`Filter out two contacts ${firstContactInfo.last_name}`, async () => {
      await testWebClient.newAndSearchFormComp.performSearch(`${firstContactInfo.last_name}`);
    });

    await test.step('Verify contact is filtered', async () => {
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

  test('T8: Try filter contact that does not exist', async ({ testWebClient }) => {
    await test.step(`Filter out contacts that does not exist`, async () => {
      await testWebClient.newAndSearchFormComp.performSearch('Kaladin');
    });

    await test.step('Verify contact is not found', async () => {
      await expect(testWebClient.contactNavigationComp.contactListElement).toHaveCount(0);

      expect(testWebClient.contactNavigationComp.noContactsLabel).toBeVisible();
    });
  });
});
