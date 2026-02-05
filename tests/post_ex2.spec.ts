import { test, expect } from '@playwright/test';

test('Créer un post via POST /posts', async ({ request }) => {
	const payload = {
		title: 'Mon premier test',
		body: 'Contenu du test',
		userId: 1,
	};

	const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
		data: payload,
	});

	expect(response.status()).toBe(201);
	const createdUser = await response.json();
  expect(createdUser.id).toBeDefined();
  expect(createdUser.userId).toBe(payload.userId);
  expect(createdUser.title).toBe(payload.title);
  expect(createdUser.body).toBe(payload.body);

});

