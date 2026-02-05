import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../env/.env.local') });

test.describe('authentication tests', () => {
  let authToken: string;
test('Login with valid credentials', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/auth/login', {
    data: {
      username: 'emilys',
        password: 'emilyspass',
    },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('accessToken');
    expect(responseBody).toHaveProperty('refreshToken');
    expect(responseBody).toHaveProperty('email');
    authToken = responseBody.accessToken;
    console.log('Access Token:', authToken);
    });
test('Access protected resource with valid token', async ({ request }) => {
  const loginresponse = await request.post('https://dummyjson.com/auth/login', {
    data: {
      username: 'emilys',
      password: 'emilyspass',
    },
  });
  expect(loginresponse.status()).toBe(200);
  const loginTokenBody = await loginresponse.json();
  const token = loginTokenBody.accessToken;

  // Access protected resource avec le token d'authentification
  const response = await request.get('https://dummyjson.com/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },

  });
  expect(response.status()).toBe(200);

  const user = await response.json();
  expect(user.id).toBeDefined();
  expect(user.username).toBe('emilys');
});
test('test environnement variables', async ({ request }) => {
  const response = await request.post('https://dummyjson.com/auth/login', {
    data: {
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD,
    },
  });
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('accessToken');
  console.log('Access Token from env:', responseBody.accessToken);
});
});