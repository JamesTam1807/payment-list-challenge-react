import { usePaymentPage } from './hooks/use-payment-page';
import { PaymentPageView } from './PaymentPage.view';

export const PaymentPageController: React.FC = () => {
  const { data, state, actions, error } = usePaymentPage();

  return <PaymentPageView data={data} state={state} actions={actions} error={error} />;
};
