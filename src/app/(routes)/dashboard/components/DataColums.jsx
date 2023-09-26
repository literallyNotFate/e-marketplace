function DataColumns({content, className, handleClick}) {
    return (
        <div className={`p-5 bg-white rounded-xl shadow-xl hover:scale-105 transition-all duration-100 ${className}`} onClick={handleClick}>
            {content}
        </div>
    )
}

export default DataColumns