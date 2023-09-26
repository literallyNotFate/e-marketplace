'use client'

import LoadingSpinner from "@/app/components/shared/LoadingSpinner";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useFetch } from "../../../../../lib/hooks/useFetch";
import FilterProducts from "./FilterProducts";
import ProductList from "../ui/ProductList";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";

const categories = ['Clothing', 'Shoes', 'Electronics', 'Books', 'Games', 'For Pets', 'Furniture']

function DisplayProducts() {
    const session = useSession()
    const { data, loading } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, true)

    const [filtered, setFiltered] = useState(data);
    const [current, setCurrent] = useState(1);
    const itemsPerPage = 4;
    
    if(loading) {
        return <LoadingSpinner/>
    }

    // paginated filtered data
    const resultProducts = filtered.slice((current - 1) * itemsPerPage, 
        (current - 1) * itemsPerPage + itemsPerPage);


    const handleFilterChange = (products) => {
        setCurrent(1);
        setFiltered(products);
    }


    // next/prev pagination
    const isPrevPageAvailable = current > 1;
    const isNextPageAvailable = current < Math.ceil(filtered.length / itemsPerPage);

    const handlePrevious = () => {
        if (isPrevPageAvailable) {
            setCurrent(prev => prev - 1);
        }
    };
      
    const handleNext = () => {
        if (isNextPageAvailable) {
            setCurrent(prev => prev + 1);
        }
    };


    return (
        <div className="flex gap-5 flex-col md:flex-row">
            {data.length === 0 ? (
                <div className="flex flex-col gap-3 m-auto opacity-0 animate-fade-up" style={{animationDelay: '0.3s', animationFillMode: "forwards"}}>
                    <h1 className="text-3xl font-bold text-center">No results found.</h1>
                    <h2 className="text-xl font-semibold">Do you want to add product? {' '} 
                        {session?.status === 'unauthenticated' ? (
                            <Link href={'/register'} className='underline'>Sign Up!</Link>
                        ) : (
                            <Link href={'/products/new'} className='underline'>Create one!</Link>
                        )}
                    </h2>
                </div>
            ) : (
                <>
                    <FilterProducts items={data.products} categories={categories} onFilterChange={handleFilterChange} delay='0.5s'/>

                    <div className="flex flex-col gap-7 w-full">
                        <ProductList products={resultProducts} featured={data.featured} session={session} delay='1s'/>

                        {!isPrevPageAvailable && !isNextPageAvailable ? null : (
                            <>
                                <div className="opacity-0 animate-fade-down flex gap-3 mx-5" style={{animationDelay: '1.5s', animationFillMode: "forwards"}}>
                                    <Button onClick={handleNext}
                                        disabled={!isNextPageAvailable}
                                        className='text-white hover:bg-white rounded-md'>Next</Button>

                                    <Button onClick={handlePrevious}
                                        disabled={!isPrevPageAvailable}
                                        className='text-white hover:bg-white rounded-md'>Previous</Button>
                                </div> 
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default DisplayProducts