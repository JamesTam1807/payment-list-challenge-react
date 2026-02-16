import { useEffect, useRef, useState } from 'react';
import { PaymentParams, PaymentResponse, Currency, GetPaymentsResponseError } from '../../../types/payment';
import { getPayments } from '../api/get-payments';
import { usePaymentHandlers } from './use-payment-handlers';
import { DEFAULT_PAGE_SIZE } from '../../../constants';

export const usePaymentPage = () => {
  const [data, setData] = useState<PaymentResponse>({
    payments: [],
    total: 0,
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const [currency, setCurrency] = useState<Currency>(undefined);
  const [error, setError] = useState<GetPaymentsResponseError | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [isPrevPageDisabled, setIsPrevPageDisabled] = useState<boolean>(true);
  const [isNextPageDisabled, setIsNextPageDisabled] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<PaymentParams>({
    page,
    pageSize: 5,
  });
  const actions = usePaymentHandlers({
    state: { page, currency, searchParams },
    refs: { searchRef },
    services: { fetchPayments },
    setters: {
      setPage,
      setCurrency,
      setSearchParams,
      setIsFiltered,
      setIsPrevPageDisabled,
      setIsNextPageDisabled,
      setError,
    },
  });

  async function fetchPayments(params?: PaymentParams): Promise<PaymentResponse | null> {
    const currentParams: PaymentParams = params ?? searchParams;

    const res = await getPayments({ searchParams: currentParams });

    if (res.error) {
      setError(res.error);
      return null;
    }

    setData(res.data);
    return res.data;
  }

  useEffect(() => {
    fetchPayments();
  }, []);

  return {
    data,
    state: {
      searchRef,
      currency,
      isFiltered,
      page,
      isPrevPageDisabled,
      isNextPageDisabled,
    },
    actions,
    error,
  };
};
