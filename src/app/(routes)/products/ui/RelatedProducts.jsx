import ProductCard from "./ProductCard"

function RelatedProducts({data, session, delay}) {
    return (
        <>
            {data.length !== 0 ? (
                <div className='mt-12 opacity-0 animate-fade-up' style={{animationDelay: delay, animationFillMode: "forwards"}}>
                    <h1 className='text-3xl font-bold mb-6'>Related Products</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.map((item) => (
                            <ProductCard key={item.id} data={item} session={session}/>
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default RelatedProducts