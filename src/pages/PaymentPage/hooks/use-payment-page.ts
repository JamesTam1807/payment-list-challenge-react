import { useEffect, useState } from "react"
import { PaymentData } from "../../../types/payment";
import { getPayments } from "../api/getPayments";

export const usePaymentPage = () => {
    const [data, setData] = useState<PaymentData>({ payments: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const params = {
        page: 1,
        pageSize: 5
    }
    
    useEffect(() => {
        async function fetchData() {
            const res = await getPayments({ params });
            console.log("JAMES: ", res);
            
            if (res.data) {
                setData(res.data);
                setError(null);
            }
        }
        setLoading(false);
        fetchData();
    }, []);

    return { data, loading, error };
}