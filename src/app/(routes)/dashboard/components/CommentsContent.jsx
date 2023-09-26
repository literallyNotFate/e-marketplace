'use client'

import { useState } from "react";
import { calculateTimeSince } from "../../../../../lib/utils"
import Image from "next/image"
import ShowRating from "@/app/components/shared/ShowRating"
import { Button } from "@/app/components/ui/Button";

function CommentsContent({data}) {
    const [current, setCurrent] = useState(1);
    const itemsPerPage = 3;

    const result = data.slice((current - 1) * itemsPerPage, 
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

    return (
        <>
            <div className="flex flex-col">
                {result.map((item) => 
                    <div className="p-6 mb-6 text-base bg-white rounded-lg shadow-lg" key={item.id}>
                        <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-black font-bold">
                                    <Image className="mr-2 w-6 h-6 rounded-full" src={item.user.image} alt="Comment author" width={50} height={50}/>
                                    @{item.user.username}
                                </p>
                                
                                <p className="text-sm text-gray-500 mr-3">{calculateTimeSince(item.createdAt)} ago</p>
                                <ShowRating rating={item.rating}/>
                            </div>
                        </div>

                        <p className="text-gray-500">{item.content}</p>
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

export default CommentsContent