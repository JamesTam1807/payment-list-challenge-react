import { UsePaymentHandlerProps } from '../../../types/payment';
import { paginate } from '../utils';
import { updatePaginateButtons } from '../utils';
import { Currency } from '../../../types/payment';

export const usePaymentHandlers = ({
  state: { page, currency, searchParams },
  refs: { searchRef },
  services: { fetchPayments },
  setters: {
    setPage,
    setCurrency,
    setSearchParams,
    setIsFiltered,
    setIsPrevPageDisabled,
    setIsNextPageDisabled,
    setError,
  },
}: UsePaymentHandlerProps) => {
  const handleSearch = async () => {
    const newPage = 1;
    const search = searchRef.current?.value;

    setIsFiltered(true);
    setPage(newPage);

    const newParams = {
      ...searchParams,
      page: newPage,
      search,
      currency,
    };

    setSearchParams(newParams);
    const res = await fetchPayments(newParams);

    updatePaginateButtons(newPage, res, setIsPrevPageDisabled, setIsNextPageDisabled);
  };

  const handleCurrencyFilter = async (currency: Currency) => {
    const newPage = 1;

    setIsFiltered(Boolean(currency));
    setCurrency(currency);
    setPage(newPage);

    const newParams = {
      ...searchParams,
      page: newPage,
      currency,
    };
    setSearchParams(newParams);
    const res = await fetchPayments(newParams);

    updatePaginateButtons(newPage, res, setIsPrevPageDisabled, setIsNextPageDisabled);
  };

  const handlePrevPage = async () => {
    await paginate({
      page,
      operation: -1,
      searchParams,
      fetchPayments,
      setPage,
      setSearchParams,
      setIsPrevPageDisabled,
      setIsNextPageDisabled,
    });
  };

  const handleNextPage = async () => {
    await paginate({
      page,
      operation: 1,
      searchParams,
      fetchPayments,
      setPage,
      setSearchParams,
      setIsPrevPageDisabled,
      setIsNextPageDisabled,
    });
  };

  const resetData = async () => {
    if (searchRef.current) {
      searchRef.current.value = '';
    }
    setIsFiltered(false);
    setCurrency(undefined);
    setError(null);

    const defaultPage = 1;
    setPage(defaultPage);

    const defaultParams = { page: defaultPage, pageSize: 5 };
    setSearchParams(defaultParams);
    const res = await fetchPayments(defaultParams);

    updatePaginateButtons(defaultPage, res, setIsPrevPageDisabled, setIsNextPageDisabled);
  };

  return {
    handleSearch,
    handleCurrencyFilter,
    handlePrevPage,
    handleNextPage,
    resetData,
  };
};
