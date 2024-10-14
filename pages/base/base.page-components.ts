import type { Locator, Page } from '@playwright/test';

export abstract class BasePageComponent {
  public abstract base: Locator;

  constructor(protected readonly page: Page) {}
}
