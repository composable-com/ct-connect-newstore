import { jest, it, expect, describe, afterEach } from '@jest/globals';
import { deleteOrderCreateSubscription } from '../src/connector/actions';
import { run } from '../src/connector/pre-undeploy';

jest.mock('../src/connector/actions');

describe('run', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call deleteOrderCreateSubscription function', async () => {
    (deleteOrderCreateSubscription as jest.Mock).mockReturnValue({
      data: 'success',
    });

    await run();
    expect(deleteOrderCreateSubscription).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const errorMessage = 'Something went wrong';
    (deleteOrderCreateSubscription as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const stderrSpy = jest.spyOn(process.stderr, 'write');
    await run();

    expect(stderrSpy).toHaveBeenCalledWith(`Post-undeploy failed: ${errorMessage}`);
    expect(process.exitCode).toBe(1);
  });
});
