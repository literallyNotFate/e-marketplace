'use client'

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import Star from "@/app/components/shared/icons/star";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ProductContent({data}) {
    const router = useRouter()

    const [current, setCurrent] = useState(1);
    const itemsPerPage = 3;

    const resultProducts = data.slice((current - 1) * itemsPerPage, 
        (current - 1) * itemsPerPage + itemsPerPage);

    const isPrevPageAvailable = current > 1;
    const isNextPageAvailable = current < Math.ceil(data.length / itemsPerPage);
    
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

    const handleClick = (id) => {
        router.push(`/products/${id}`);
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                {resultProducts.map((item) =>
                    <div className='flex gap-3 hover:cursor-pointer shadow-lg' key={item.id} onClick={() => handleClick(item.id)}>
                        <div className="w-[100px] h-[100px] rounded-xl bg-gray-100 relative">
                            <Image src={item.images[0]} alt="Product Image" fill className="aspect-square object-cover rounded-md"/>
                        </div>

                        <div className="flex justify-between w-full">
                            <div className="w-1/2">
                                <p className="font-semibold text-2xl">{item.name}</p>
                                <p className="text-lg text-gray-500">{item.category}</p>
                            </div>

                            <div className="w-1/3">
                                <div className="font-bold text-xl text-yellow-600 flex">
                                    <Star fill/>
                                    <div>
                                        <h1 className="ml-[5px]">{item.rating === null ? 0 : item.rating.toFixed(2)}</h1>
                                    </div>
                                </div>
                
                                <h1 className="font-bold text-xl text-green-600">{item.price} $</h1>
                            </div>
                        </div>
                    </div>
                )}

                {!isPrevPageAvailable && !isNextPageAvailable ? null : (
                    <>
                        <div className="flex gap-3 mx-5">
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
    )   
}

export default ProductContent