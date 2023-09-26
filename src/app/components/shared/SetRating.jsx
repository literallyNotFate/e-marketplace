'use client'

import { useState } from "react";
import Star from '../shared/icons/star'

function SetRating({rating, setRating}) {
    const [hover, setHover] = rating ? useState(rating) : useState(0);

    const reset = () => {
        setRating(0)
        setHover(0)
    }

    return (
        <>
            {[...Array(5)].map((_, index) => {
                index += 1;

                return (
                    <button key={index}
                        className={index <= ((rating && hover) || hover) ? "text-yellow-500" : "text-neutral-300"}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onDoubleClick={() => reset()}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <Star fill/>
                    </button>
                )
            })}
        </>
    )
}

export default SetRating