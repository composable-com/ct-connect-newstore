import { afterEach, describe, expect, jest, test } from '@jest/globals';
import nock from 'nock';
import request from 'supertest';
import app from '../src/app';
import { createApiRoot } from '../src/client/create.client';
import {
  COMMERCETOOLS_STOCK_MOCK,
  NEW_STORE_STOCK_MOCK,
  NEW_STORE_TOKEN_RESPONSE_MOCK,
  mockEnvironmentVariables,
} from './mocks';
const OLD_ENV = process.env;

jest.mock('../src/client/create.client');

nock('https://test.newstore.net').post('/v0/token').reply(200, NEW_STORE_TOKEN_RESPONSE_MOCK);

nock('https://test.newstore.net')
  .get(/\/_\/v0\/hq\/stocked_products/)
  .reply(200, NEW_STORE_STOCK_MOCK);

describe('POST /job', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  test('Should run the job and return 200 with results', async () => {
    mockEnvironmentVariables();

    (createApiRoot as jest.Mock).mockReturnValue({
      inventory: jest.fn(() => ({
        get: jest.fn(() => ({
          execute: () => ({
            body: COMMERCETOOLS_STOCK_MOCK,
          }),
        })),
        post: jest.fn(() => ({
          execute: () => ({
            body: COMMERCETOOLS_STOCK_MOCK,
          }),
        })),
        withId: jest.fn(() => ({
          post: jest.fn(() => ({
            execute: jest.fn(() => ({ body: {} })),
          })),
        })),
      })),
      productProjections: jest.fn(() => ({
        search: jest.fn(() => ({
          get: jest.fn(() => ({
            execute: () => ({
              body: {
                results: [
                  {
                    sku: 'test2',
                  },
                ],
              },
            }),
          })),
        })),
      })),
    });

    const response = await request(app).post('/job').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.updated.length).toBe(1);
    expect(response.body.created.length).toBe(1);
    expect(response.body.error.length).toBe(0);
  });

  test('Should return 500 when missing env variables', async () => {
    const response = await request(app).post('/job').send();
    expect(response.statusCode).toBe(500);
  });
});
