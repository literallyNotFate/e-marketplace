import Link from "next/link"

const classes = `rounded-full border border-black bg-black 
p-1.5 px-4 text-sm text-black transition-all
opacity-0 hover:text-black animate-fade disabled:border-gray-600 
disabled:bg-white disabled:text-gray-600 disabled:cursor-not-allowed`

function Button({ children, className, href, delay, ...props }) {
    if (href) {
        return (
            <Link href={href} className={`${classes} ${className}`} style={{animationDelay: delay, animationFillMode: "forwards"}}>
                {children}
            </Link>
        )
    }

    return (
        <button className={`${classes} ${className}`} style={{animationDelay: delay, animationFillMode: "forwards"}} {...props}>
            {children}
        </button>
    )
}


Button.displayName = 'Button'
export { Button }