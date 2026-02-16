import { buildURL } from '../utils';
import { GetPaymentsProps, PaymentResponse } from '../../../types/payment';
import { logger } from '../utils';

export async function getPayments({ searchParams }: GetPaymentsProps) {
  const url = buildURL(searchParams);
  logger.info('payments.fetch.started', { url, query: searchParams.toString() });

  try {
    const res = await fetch(url);

    if (!res.ok) {
      logger.warn('payments.fetch.failed', { status: res.status, url });
      return { data: null, error: { status: res.status, message: 'Error: Failed to fetch data' } };
    }

    const data: PaymentResponse = await res.json();

    logger.info('payments.fetch.succeeded', { count: data?.payments?.length });

    return { data, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    logger.error('payments.request.exception', { message, url });

    return { data: null, error: { message } };
  }
}
