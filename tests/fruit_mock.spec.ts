import { test, expect } from '@playwright/test';

test("mocks a fruit and doesn't call api", async ({ page }) => {
	// Mock the api call before navigating
	await page.route('**/api/v1/fruits', async route => {
		const json = [{ name: 'Strawberry', id: 21 }];
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify(json),
		});
	});

	// Go to the page
	await page.goto('https://demo.playwright.dev/api-mocking');

	// Assert that the Strawberry fruit is visible
	await expect(page.getByText('Strawberry')).toBeVisible();
});

test('gets the json from api and adds a new fruit', async ({ page }) => {
	// Intercept the API, fetch original response, modify body and fulfill
	await page.route('**/api/v1/fruits', async route => {
		const response = await route.fetch();
		const json = await response.json();
		json.push({ name: 'Loquat', id: 100 });
		await route.fulfill({
			status: response.status(),
			headers: response.headers(),
			contentType: 'application/json',
			body: JSON.stringify(json),
		});
	});

	// Go to the page
	await page.goto('https://demo.playwright.dev/api-mocking');

	// Assert that the new fruit is visible
	await expect(page.getByText('Loquat', { exact: true })).toBeVisible();
});