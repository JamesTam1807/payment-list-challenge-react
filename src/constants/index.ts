export const API_URL = "/api/payments";

export const CURRENCIES = [
  "USD", "EUR", "GBP", "AUD", "CAD", "ZAR", "JPY", "CZK"
] as const;


export const PAYMENT_STATUSES = [
  "completed", "pending", "failed", "refunded"
] as const;
