import { CURRENCIES, PAYMENT_STATUSES } from "../constants";

export type Currency = typeof CURRENCIES[number];
export type PaymentStatus = typeof PAYMENT_STATUSES[number];

export interface Payment {
    id?: string
    customerName?: string
    amount?: number
    customerAddress?: string
    currency?: Currency
    status?: PaymentStatus
    date?: string
    description?: string
}

export interface PaymentPageViewProps {
    data: Payment[];
}

export interface GetPaymentsParams {
    search?: string
    currency?: Currency;
    page?: number
    pageSize?: number
}

export interface GetPaymentsProps {
    params: GetPaymentsParams
}

export interface GetPaymentsResponse<T> {
    data: T | null;
    error: { message: string; status?: number } | null;
}

export interface PaymentData {
    payments: Payment[]
}