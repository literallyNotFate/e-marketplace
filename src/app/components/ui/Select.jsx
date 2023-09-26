import React from "react"

const selectClasses = `bg-gray-50 border border-gray-300
text-gray-900 text-sm rounded-lg focus:border-black
block w-full p-2.5 focus:outline-none duration-200 transition-all`

const Select = React.forwardRef(({ className, delay, options, ...props }, ref) => {
    return (
        <select className={`${selectClasses} ${className}`} style={{animationDelay: delay, animationFillMode: "forwards"}} ref={ref} {...props}>
            {options.map((item, idx) => 
                <option value={item} key={idx}>{item}</option>
            )}
        </select>
    )
})


Select.displayName = 'Select'
export { Select }