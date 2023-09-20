import { jest, it, expect, describe, afterEach } from '@jest/globals';
import { createOrderCreateSubscription } from '../src/connector/actions';
import { run } from '../src/connector/post-deploy';

jest.mock('../src/connector/actions');

describe('run', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call createOrderCreateSubscription function', async () => {
    (createOrderCreateSubscription as jest.Mock).mockReturnValue({
      data: 'success',
    });

    await run();
    expect(createOrderCreateSubscription).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const errorMessage = 'Something went wrong';
    (createOrderCreateSubscription as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const stderrSpy = jest.spyOn(process.stderr, 'write');
    await run();

    expect(stderrSpy).toHaveBeenCalledWith(`Post-deploy failed: ${errorMessage}`);
    expect(process.exitCode).toBe(1);
  });
});
