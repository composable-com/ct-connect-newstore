import { afterEach, describe, expect, jest, test } from '@jest/globals';
import nock from 'nock';
import request from 'supertest';
import app from '../src/app';
import { createApiRoot } from '../src/client/create.client';
import { COMMERCETOOLS_STOCK_MOCK, NEW_STORE_STOCK_MOCK, NEW_STORE_TOKEN_RESPONSE_MOCK } from './mocks';

jest.mock('../src/client/create.client');

nock('https://test.newstore.net').post('/v0/token').reply(200, NEW_STORE_TOKEN_RESPONSE_MOCK).persist();

nock('https://test.newstore.net')
  .get(/\/_\/v0\/hq\/stocked_products/)
  .reply(200, NEW_STORE_STOCK_MOCK)
  .persist();

describe('POST /job', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();
  });

  test('Should run the job and return 200 with results', async () => {
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

  test('Should return 500 when getting an unknown error fetching commercetools inventory', async () => {
    (createApiRoot as jest.Mock).mockReturnValue({
      inventory: jest.fn(() => ({
        get: jest.fn(() => ({
          execute: () => {
            throw new Error('mocked error');
          },
        })),
      })),
    });

    const response = await request(app).post('/job').send();
    expect(response.statusCode).toBe(500);
  });
});
