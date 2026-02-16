import { I18N } from '../../../constants/i18n';
import { formatDate, formatAmount } from '../utils';
import { Payment, PaymentPageViewStateProps, PaymentPageViewActionProps } from '../../../types/payment';
import {
  Table,
  TableBodyWrapper,
  TableCell,
  TableHeader,
  TableHeaderRow,
  TableHeaderWrapper,
  TableRow,
  StatusBadge,
  PaginationRow,
  PaginationButton,
} from '../../../components/components';

export const TableView = ({
  data,
  state,
  actions,
}: {
  data: Payment[];
  state: PaymentPageViewStateProps;
  actions: PaymentPageViewActionProps;
}) => {
  const { isPrevPageDisabled, isNextPageDisabled, page } = state;
  const { handlePrevPage, handleNextPage } = actions;

  return (
    <>
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
          {data?.map((payment: Payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.id}</TableCell>
              <TableCell>{payment.date && formatDate(payment.date)}</TableCell>
              <TableCell>{payment.amount && formatAmount(payment.amount)}</TableCell>
              <TableCell>{payment.customerName}</TableCell>
              <TableCell>{payment.currency}</TableCell>
              <TableCell>
                <StatusBadge status={payment.status}>{payment.status}</StatusBadge>
              </TableCell>
            </TableRow>
          ))}
        </TableBodyWrapper>
      </Table>
      <PaginationRow>
        <PaginationButton disabled={isPrevPageDisabled} onClick={handlePrevPage}>
          {I18N.PREVIOUS_BUTTON}
        </PaginationButton>
        <span aria-label={I18N.PAGE_LABEL}>
          {I18N.PAGE_LABEL} {page}
        </span>
        <PaginationButton disabled={isNextPageDisabled} onClick={handleNextPage}>
          {I18N.NEXT_BUTTON}
        </PaginationButton>
      </PaginationRow>
    </>
  );
};
