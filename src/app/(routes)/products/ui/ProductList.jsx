import ProductCard from "./ProductCard"

function ProductList({products, featured, session, delay}) {
    return (
        <>
            <div className="flex flex-col w-full gap-8 opacity-0 animate-fade-up" style={{animationDelay: delay, animationFillMode: "forwards"}}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((item) => (
                        <ProductCard key={item.id} data={item} featured={featured} session={session}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductList