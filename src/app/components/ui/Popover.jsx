'use client'

import { useState } from "react"

function Popover({title, content}) {
    const [open, setOpen] = useState(false)

    function handleClick() {
        setOpen(!open)
    }

    return (
        <>
            <div className="relative">
                <button onClick={handleClick} className='animate-fade'>
                    {title}
                </button>

                {open && <div className="absolute right-0 overflow-hidden rounded-lg border border-blue-gray-50 bg-white p-4 shadow-lg">{content}</div>}
            </div>
        </>
    )
}

export default Popover