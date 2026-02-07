import { buildURL } from "../utils/buildURL";
import { GetPaymentsProps } from "../../../types/payment";

export interface APIError {
    status: number;
    message: string;
}

export async function getPayments({ params }: GetPaymentsProps) {
    try {
        const res = await fetch(buildURL(params));

        if (!res.ok) {
            return { data: null, error: { status: res.status, message: "Error: Failed to fetch data" }};
        }
        
        const data = await res.json();
        return { data, error: null };
    } catch (error: unknown) {
        return { data: null, error: { message: error instanceof Error ? error.message : "Unknown error" } };
    }
}