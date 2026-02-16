import { I18N } from '../../../constants/i18n';
import { GetPaymentsResponseError } from '../../../types/payment';
import { ErrorBox } from '../../../components/components';

export const ErrorView = ({ error }: { error?: GetPaymentsResponseError | null }) => {
  const status = error?.status;
  const defaultErrorMessage = 'Something went wrong! Please try again.';
  const ERROR_MESSAGES: Record<number, string> = {
    404: I18N.PAYMENT_NOT_FOUND,
    500: I18N.INTERNAL_SERVER_ERROR,
  };
  const errorMessage = status && ERROR_MESSAGES[status] ? ERROR_MESSAGES[status] : defaultErrorMessage;

  return <ErrorBox>{errorMessage}</ErrorBox>;
};
