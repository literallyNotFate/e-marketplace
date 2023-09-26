import React from "react"

const classes = `bg-gray-50 border border-gray-300
text-gray-900 text-sm rounded-lg focus:border-black
block w-full p-2.5 focus:outline-none duration-200 transition-all`

const Input = React.forwardRef(({ className, delay, ...props }, ref) => {
    return <input className={`${classes} ${className}`} ref={ref}
        style={{animationDelay: delay, animationFillMode: "forwards"}} {...props}/>
})


Input.displayName = 'Input'
export { Input }