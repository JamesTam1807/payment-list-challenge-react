import { API_URL } from "../../../constants";
import { GetPaymentsParams } from "../../../types/payment";

export function buildURL (params: GetPaymentsParams) {
    const query = new URLSearchParams();

    if (params.search) query.append("search", params.search);
    if (params.currency) query.append("currency", params.currency);
    if (params.page !== undefined) query.append("page", params.page.toString());
    if (params.pageSize !== undefined) query.append("pageSize", params.pageSize.toString());

    return `${API_URL}?${query.toString()}`;
}