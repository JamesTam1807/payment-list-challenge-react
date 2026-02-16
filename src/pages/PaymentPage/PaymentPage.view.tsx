import { I18N } from '../../constants/i18n';
import { PaymentPageViewProps, Currency } from '../../types/payment';
import {
  FilterRow,
  Container,
  Title,
  SearchInput,
  SearchButton,
  ClearButton,
  Select,
} from '../../components/components';
import { ErrorView, TableView } from './components';
import { CURRENCIES } from '../../constants';

export const PaymentPageView: React.FC<PaymentPageViewProps> = ({ data, state, actions, error }) => {
  const { searchRef, currency, isFiltered } = state;
  const { handleCurrencyFilter, handleSearch, resetData } = actions;

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>
      <FilterRow>
        <SearchInput aria-label={I18N.SEARCH_LABEL} ref={searchRef} placeholder={I18N.SEARCH_PLACEHOLDER} />
        <Select
          aria-label={I18N.CURRENCY_FILTER_LABEL}
          value={currency ?? ''}
          onChange={(e) => handleCurrencyFilter(e.target.value as Currency)}
        >
          <option value="">{I18N.CURRENCY_FILTER_LABEL}</option>
          {CURRENCIES.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </Select>
        <SearchButton onClick={handleSearch}>{I18N.SEARCH_BUTTON}</SearchButton>
        {isFiltered && <ClearButton onClick={resetData}>{I18N.CLEAR_FILTERS}</ClearButton>}
      </FilterRow>
      {error ? <ErrorView error={error} /> : <TableView data={data.payments} state={state} actions={actions} />}
    </Container>
  );
};
