import { I18N } from "../../constants/i18n";
import { PaymentPageViewProps, Payment } from "../../types/payment";
import { Table, TableBodyWrapper, TableCell, TableHeader, TableHeaderRow, TableHeaderWrapper, TableRow, StatusBadge } from '../../components/components';
import { formatAmount, formatDate } from "./utils";

export const PaymentPageView: React.FC<PaymentPageViewProps> = ({ data }) => {
    return (
        <Table>
            <TableHeaderWrapper>
                <TableHeaderRow>
                    <TableHeader>{I18N.TABLE_HEADER_PAYMENT_ID}</TableHeader>
                    <TableHeader>{I18N.TABLE_HEADER_DATE}</TableHeader>
                    <TableHeader>{I18N.TABLE_HEADER_AMOUNT}</TableHeader>
                    <TableHeader>{I18N.TABLE_HEADER_CUSTOMER}</TableHeader>
                    <TableHeader>{I18N.TABLE_HEADER_CURRENCY}</TableHeader>
                    <TableHeader>{I18N.TABLE_HEADER_STATUS}</TableHeader>
                </TableHeaderRow>
            </TableHeaderWrapper>
            <TableBodyWrapper>
                {data.map((payment: Payment) => (
                <TableRow key={payment.id}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.date && formatDate(payment.date)}</TableCell>
                    <TableCell>{payment.amount && formatAmount(payment.amount)}</TableCell>
                    <TableCell>{payment.customerName}</TableCell>
                    <TableCell>{payment.currency}</TableCell>
                    <TableCell>
                        <StatusBadge status={payment.status}>
                            {payment.status}
                        </StatusBadge>
                    </TableCell>
                </TableRow>
                ))}
            </TableBodyWrapper>
        </Table>
    )
}
