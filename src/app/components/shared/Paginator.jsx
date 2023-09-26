import { Button } from "../ui/Button"

function Paginator({pages, current, setPage}) {
    return (
        <>
            {pages.map((page, i) => (
                <Button key={page} className={`rounded-none px-4 py-2 hover:scale-105 ${current === i ? 'text-white hover:text-white' : 'text-black bg-white hover:bg-white hover:text-black'}`}
                    onClick={() => setPage(page)} title={`Page ${page + 1}`}>{page + 1}</Button>
            ))}
        </>
    )
}

export default Paginator