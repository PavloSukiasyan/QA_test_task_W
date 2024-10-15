import { baseFixture as test, expect } from './main.fixture';

test.describe('Tests for Sign Out:', () => {
  test('T9: Sign Out', async ({ testWebClient }) => {
    await test.step('Open login page', async () => {
      await testWebClient.loginPage.openLogin();
    });

    await test.step('Perform login', async () => {
      await testWebClient.loginPage.login('test', 'test');
    });

    await test.step('Perform sign out', async () => {
      await expect(testWebClient.footerComp.base).toBeVisible();
      await expect.soft(testWebClient.footerComp.signOutButton).toHaveText('Sign out');

      await testWebClient.footerComp.signOutButton.click();
    });

    await test.step('Verify sign out', async () => {
      await expect(testWebClient.footerComp.base).toBeHidden();
      await expect(testWebClient.footerComp.signOutButton).toBeHidden();
      await expect(testWebClient.loginPage.loginButton).toHaveText('Login');
    });
  });
});
