import React from "react"

const classes = `bg-gray-50 border border-gray-300
text-gray-900 text-sm rounded-lg focus:border-black
block w-full p-2.5 focus:outline-none duration-200 transition-all`

const Textarea = React.forwardRef(({ className, delay, resized, rows, cols, ...props }, ref) => {
    return <textarea className={`${classes} ${className}`} ref={ref} rows={rows} cols={cols}
        style={{animationDelay: delay, animationFillMode: "forwards", 
        resize: resized ? 'vertical' : 'none'}} {...props}/>
})


Textarea.displayName = 'Textarea'
export { Textarea }