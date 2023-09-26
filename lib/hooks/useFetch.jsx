import { useEffect, useState } from "react";

export const useFetch = (url, multitple, refetch) => {
    const [data, setData] = multitple ? useState([]) : useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRequest = async() => {
            const response = await fetch(url);
            const result = await response.json();

            setData(result);
            setLoading(false);
        }
        
        fetchRequest();
    }, [url, refetch])

    return { data, loading };
};