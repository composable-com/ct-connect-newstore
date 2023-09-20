import { afterEach, describe, expect, jest, test } from '@jest/globals';
import nock from 'nock';
import request from 'supertest';
import app from '../src/app';
import { createApiRoot } from '../src/client/create.client';
import { COMMERCETOOLS_ORDER_MOCK, NEW_STORE_TOKEN_RESPONSE_MOCK, mockEnvironmentVariables } from './mocks';
const OLD_ENV = process.env;

jest.mock('../src/client/create.client');

nock('https://test.newstore.net').post('/v0/token').reply(200, NEW_STORE_TOKEN_RESPONSE_MOCK);

nock('https://test.newstore.net').post('/v0/d/fulfill_order').reply(200, { id: 1 });

describe('POST /event', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  test('Should run the event and return 200', async () => {
    mockEnvironmentVariables();

    (createApiRoot as jest.Mock).mockReturnValue({
      orders: jest.fn(() => ({
        withId: jest.fn(() => ({
          get: jest.fn(() => ({
            execute: jest.fn(() =>
              Promise.resolve({
                body: COMMERCETOOLS_ORDER_MOCK,
              })
            ),
          })),
        })),
      })),
    });

    const response = await request(app)
      .post('/event')
      .send({
        message: {
          data: btoa(
            JSON.stringify({
              data: {
                type: 'OrderCreated',
                resource: { id: 'orderId' },
              },
            })
          ),
        },
      });
    expect(response.statusCode).toBe(200);
  });

  test('Should return 400 when missing body.message', async () => {
    const response = await request(app).post('/event').send({});
    expect(response.statusCode).toBe(400);
  });

  test('Should return 204 when its not an OrderCreated message type', async () => {
    const response = await request(app)
      .post('/event')
      .send({
        message: {
          data: btoa(
            JSON.stringify({
              data: {
                type: 'NotOrderCreated',
              },
            })
          ),
        },
      });
    expect(response.statusCode).toBe(204);
  });

  test('Should return 400 when orderId is not present', async () => {
    const response = await request(app)
      .post('/event')
      .send({
        message: {
          data: btoa(
            JSON.stringify({
              data: {
                type: 'OrderCreated',
                resource: { id: undefined },
              },
            })
          ),
        },
      });
    expect(response.statusCode).toBe(400);
  });
});
