import { PaymentParams, PaymentResponse } from '../../../types/payment';
import { updatePaginateButtons } from './updatePaginateButtons';

export type FetchPaymentsFn = (params: PaymentParams) => Promise<PaymentResponse | null>;

export interface PaginateProps {
  page: number;
  operation: number;
  searchParams: PaymentParams;
  fetchPayments: FetchPaymentsFn;
  setPage: (page: number) => void;
  setSearchParams: (params: PaymentParams) => void;
  setIsPrevPageDisabled: (disabled: boolean) => void;
  setIsNextPageDisabled: (disabled: boolean) => void;
}

export const paginate = async ({
  page,
  operation,
  searchParams,
  fetchPayments,
  setPage,
  setSearchParams,
  setIsPrevPageDisabled,
  setIsNextPageDisabled,
}: PaginateProps) => {
  const newPage = Math.max(1, page + operation);
  setPage(newPage);

  const newParams = { ...searchParams, page: newPage };
  setSearchParams(newParams);

  if (newPage !== page) {
    const res = await fetchPayments(newParams);

    updatePaginateButtons(newPage, res, setIsPrevPageDisabled, setIsNextPageDisabled);
  }
};
