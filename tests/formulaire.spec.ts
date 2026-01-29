import { test, expect } from './fixtures';
import testdata from '../dataset/category.json';

test('RemplirFormulaire', { tag: '@golm_dev', annotation: { type: 'test' } }, async ({ pageCool }) => {
  await pageCool.goto();
  await pageCool.firstName.fill(testdata.poulet.pouletroti);
  await pageCool.lastName.fill(testdata.boeuf.boeufbourguignon);
  await pageCool.fillSubject();
});