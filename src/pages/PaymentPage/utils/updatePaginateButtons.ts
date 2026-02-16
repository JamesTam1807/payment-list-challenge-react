import { PaymentResponse } from '../../../types/payment';

export const updatePaginateButtons = (
  newPage: number,
  res: PaymentResponse | null | undefined,
  setIsPrevPageDisabled: (v: boolean) => void,
  setIsNextPageDisabled: (v: boolean) => void,
) => {
  setIsPrevPageDisabled(newPage <= 1);

  if (res) {
    const lastPage = Math.ceil(res.total / res.pageSize);
    setIsNextPageDisabled(newPage >= lastPage);
  }
};
