import { test, expect } from './fixtures';
import testdata from '../dataset/category.json';

test('RemplirFormulaire', { tag: '@golm_dev', annotation: { type: 'test' } }, async ({ page, pageCool }) => {
  await page.goto(process.env.URL!);
  await pageCool.firstName.fill(testdata.poulet.pouletroti);
  await pageCool.lastName.fill(testdata.boeuf.boeufbourguignon);
  await pageCool.fillSubject();
});