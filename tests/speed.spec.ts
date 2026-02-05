import { test, expect } from '@playwright/test';

test('Form Loading Speed', { tag: '@speed', annotation: { type: 'performance' } }, async ({ page }) => {
  const startTime = Date.now();
  await page.goto('https://demoqa.com/automation-practice-form');
  const loadTime = Date.now() - startTime;
  
  console.log(`Page load time: ${loadTime}ms`);
  expect(loadTime).toBeLessThan(5000);
  
  // Verify form is loaded
  await expect(page.locator('text=Student Registration Form')).toBeVisible();
});

test('Form Field Fill Speed', { tag: '@speed', annotation: { type: 'performance' } }, async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  
  const startTime = Date.now();
  
  // Fill first name
  await page.locator('#firstName').fill('John');
  
  // Fill last name
  await page.locator('#lastName').fill('Doe');
  
  // Fill email
  await page.locator('#userEmail').fill('john.doe@example.com');
  
  // Select gender
  await page.locator('label[for="male"]').click();
  
  // Fill mobile number
  await page.locator('#userNumber').fill('9876543210');
  
  const fillTime = Date.now() - startTime;
  console.log(`Form fill time: ${fillTime}ms`);
  expect(fillTime).toBeLessThan(2000);
});

test('Form Submission Speed', { tag: '@speed', annotation: { type: 'performance' } }, async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  
  // Fill required fields
  await page.locator('#firstName').fill('Jane');
  await page.locator('#lastName').fill('Smith');
  await page.locator('#userEmail').fill('jane.smith@example.com');
  await page.locator('label[for="female"]').click();
  await page.locator('#userNumber').fill('9876543211');
  
  const startTime = Date.now();
  
  // Submit form
  await page.locator('button:has-text("Submit")').click();
  
  const submitTime = Date.now() - startTime;
  console.log(`Form submission time: ${submitTime}ms`);
  
  // Verify success
  await expect(page.locator('text=Thanks for submitting the form')).toBeVisible();
});
