import { baseFixture as test } from './main.fixture';

test('T1: Sign in', async ({ testWebClient }) => {
  await testWebClient.loginPage.openLogin();
});
