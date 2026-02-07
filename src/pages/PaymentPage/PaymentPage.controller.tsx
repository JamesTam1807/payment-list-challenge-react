import { I18N } from "../../constants/i18n";
import { usePaymentPage } from "./hooks/use-payment-page";
import { PaymentPageView } from "./PaymentPage.view";
import { Spinner } from "../../components/components";

export const PaymentPageController: React.FC = () => {
    const { data, loading, error } = usePaymentPage();

    if (loading) return <Spinner/>;
    if (error) return <>{I18N.INTERNAL_SERVER_ERROR}</>;

    return <PaymentPageView data={data.payments}/>;
}
