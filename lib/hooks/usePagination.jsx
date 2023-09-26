import { useMemo, useState } from "react";

const usePagination = (data, volume) => {
    const [page, setPage] = useState(0);

    const total = useMemo(() => 
        Math.ceil(data.length / volume), 
    [volume, data.length]);

    const slicedData = useMemo(() => 
        data.slice(page * volume, page * volume + volume), 
    [volume, page]);

    const allPages = [...Array(total).keys()]

    return { slicedData, page, total, allPages, setPage };
}

export default usePagination