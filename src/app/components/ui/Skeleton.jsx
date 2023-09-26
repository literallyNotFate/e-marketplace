function Skeleton({className, children}) {
    return (
        <div className={`animate-pulse bg-neutral-200 ${className}`}>
            {children}
        </div>
    )
}

export default Skeleton