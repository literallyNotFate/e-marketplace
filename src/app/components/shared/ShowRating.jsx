'use client'

import Star from '../shared/icons/star'

function ShowRating({rating}) {
    return (
        <>
            {[...Array(rating)].map((_, index) => (
                <Star fill className='h-[15px] w-[15px] text-yellow-600' key={index}/>
            ))}
        </>
    )
}

export default ShowRating