import React, { RefObject, SetStateAction, Dispatch } from 'react';
import { CURRENCIES, PAYMENT_STATUSES } from '../constants';
import { FetchPaymentsFn } from '../pages/PaymentPage/utils';

export type Currency = (typeof CURRENCIES)[number] | undefined;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export interface Payment {
  id?: string;
  customerName?: string;
  amount?: number;
  customerAddress?: string;
  currency?: Currency;
  status: PaymentStatus;
  date?: string;
  description?: string;
}

export interface PaymentResponse {
  payments: Payment[];
  total: number;
  page: number;
  pageSize: number;
}

export interface UsePaymentHandlerStateProps {
  page: number;
  currency?: Currency;
  searchParams: PaymentParams;
}

export interface UsePaymentHandlerSetterProps {
  setPage: (page: number) => void;
  setCurrency: (currency?: Currency) => void;
  setSearchParams: (params: PaymentParams) => void;
  setIsFiltered: (val: boolean) => void;
  setIsPrevPageDisabled: (val: boolean) => void;
  setIsNextPageDisabled: (val: boolean) => void;
  setError: Dispatch<SetStateAction<GetPaymentsResponseError | null>>;
}

export interface UsePaymentHandlerProps {
  state: UsePaymentHandlerStateProps;
  setters: UsePaymentHandlerSetterProps;
  refs: {
    searchRef: RefObject<HTMLInputElement | null>;
  };
  services: {
    fetchPayments: FetchPaymentsFn;
  };
}

export interface PaymentPageViewStateProps {
  searchRef: React.RefObject<HTMLInputElement | null>;
  currency: Currency;
  isFiltered: boolean;
  page: number;
  isPrevPageDisabled: boolean;
  isNextPageDisabled: boolean;
}

export interface PaymentPageViewActionProps {
  handleCurrencyFilter: (currency: Currency) => Promise<void>;
  handleSearch: () => Promise<void>;
  handlePrevPage: () => Promise<void>;
  handleNextPage: () => Promise<void>;
  resetData: () => Promise<void>;
}

export interface PaymentPageViewProps {
  data: PaymentResponse;
  state: PaymentPageViewStateProps;
  actions: PaymentPageViewActionProps;
  error: GetPaymentsResponseError | null;
}

export interface PaymentParams {
  search?: string;
  currency?: Currency | undefined;
  page?: number;
  pageSize?: number;
}

export interface GetPaymentsProps {
  searchParams: PaymentParams;
}

export interface GetPaymentsResponseError {
  message: string;
  status?: number;
}

export interface GetPaymentsResponse<T> {
  data: T | null;
  error: GetPaymentsResponseError | null;
}
