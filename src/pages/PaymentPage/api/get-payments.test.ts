import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPayments } from './get-payments';
import { logger } from '../utils';

vi.mock('../utils', () => ({
  buildURL: vi.fn(() => 'https://this-is-a-dummy-api-url/payments'),
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('getPayments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('should return data on successful fetch', async () => {
    const fakeData = { payments: [{ id: '1', status: 'PAID' }], total: 1, page: 1, pageSize: 5 };
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => fakeData,
    });

    const result = await getPayments({ searchParams: { page: 1, pageSize: 5 } });

    expect(result).toEqual({ data: fakeData, error: null });
    expect(logger.info).toHaveBeenCalled();
  });

  it('should return error when fetch response is not ok', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: false, status: 500 });

    const result = await getPayments({ searchParams: { page: 1, pageSize: 5 } });

    expect(result.error).toEqual({ status: 500, message: 'Error: Failed to fetch data' });
    expect(logger.warn).toHaveBeenCalled();
  });

  it('returns error when fetch throws exception', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));

    const result = await getPayments({ searchParams: { page: 1, pageSize: 5 } });

    expect(result.error).toEqual({ message: 'Network error' });
    expect(logger.error).toHaveBeenCalled();
  });
});
