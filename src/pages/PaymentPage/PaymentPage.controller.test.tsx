import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PaymentPageController } from './PaymentPage.controller';
import { usePaymentPage } from './hooks/use-payment-page';
import { PaymentPageView } from './PaymentPage.view';
import { PaymentPageViewProps } from '../../types/payment';

vi.mock('./hooks/use-payment-page');
vi.mock('./PaymentPage.view', () => ({
  PaymentPageView: vi.fn(() => <div data-testid="payment-view" />),
}));

describe('PaymentPageController', () => {
  const mockedUsePaymentPage = vi.mocked(usePaymentPage);
  const mockedPaymentPageView = vi.mocked(PaymentPageView);

  const mockHookReturn: PaymentPageViewProps = {
    data: {
      payments: [
        {
          id: '1',
          customerName: 'Alice',
          amount: 100,
          status: 'completed',
          currency: 'USD',
          date: '2026-02-16',
        },
      ],
      total: 1,
      page: 1,
      pageSize: 5,
    },
    state: {
      searchRef: { current: null },
      currency: 'USD',
      isFiltered: false,
      page: 1,
      isPrevPageDisabled: true,
      isNextPageDisabled: false,
    },
    actions: {
      handleCurrencyFilter: vi.fn(),
      handleSearch: vi.fn(),
      handlePrevPage: vi.fn(),
      handleNextPage: vi.fn(),
      resetData: vi.fn(),
    },
    error: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUsePaymentPage.mockReturnValue(mockHookReturn);
  });

  it('should call the usePaymentPage hook', () => {
    render(<PaymentPageController />);
    expect(mockedUsePaymentPage).toHaveBeenCalledTimes(1);
  });

  it('should render the PaymentPageView', () => {
    render(<PaymentPageController />);
    expect(screen.getByTestId('payment-view')).not.toBeNull();
  });

  it('should pass the correct props to PaymentPageView', () => {
    render(<PaymentPageController />);

    expect(mockedPaymentPageView).toHaveBeenCalledTimes(1);

    const propsPassed = mockedPaymentPageView.mock.calls[0][0];
    expect(propsPassed).toMatchObject({
      data: mockHookReturn.data,
      state: mockHookReturn.state,
      actions: mockHookReturn.actions,
      error: mockHookReturn.error,
    });
  });
});
