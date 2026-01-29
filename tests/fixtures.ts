import { test as base } from '@playwright/test';
import { PageCool } from './formtest';

type Fixtures = {
  pageCool: PageCool;
};

export const test = base.extend<Fixtures>({
  pageCool: async ({ page }, use) => {
    await use(new PageCool(page));
  },
});

const expect = base.expect;

export { expect };
