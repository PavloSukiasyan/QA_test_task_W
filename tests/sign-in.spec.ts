import { baseFixture as test, expect } from './main.fixture';

test.describe('Tests for Login:', () => {
  test('T1: Sign in', async ({ testWebClient }) => {
    await test.step('Open login page', async () => {
      await testWebClient.loginPage.openLogin();
      await expect.soft(testWebClient.loginPage.loginButton).toHaveText('Login');
    });

    await test.step('Perform login and check for success', async () => {
      await testWebClient.loginPage.login('test', 'test');

      await expect(testWebClient.loginPage.loginButton).toBeHidden();
      await expect(testWebClient.newAndSearchFormComp.newButton).toBeVisible();
      await expect(testWebClient.newAndSearchFormComp.searchInput).toBeVisible();
    });
  });
});
