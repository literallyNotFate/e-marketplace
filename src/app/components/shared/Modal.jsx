function Modal({open, children}) {
    return (
        <div className={`fixed z-10 inset-0 transition-all backdrop-blur-sm duration-200 overflow-y-hidden ${open ? "visible bg-black/20 scale-100 opacity-100" : "invisible scale-125 opacity-0"}`}>
            <div className={`flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0`}>
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    {children}
                </div>
            </div>
        </div>
   )
}

export default Modal