'use client'

import DownloadCloud from "../shared/icons/cloud"

function Dropzone({className, getInputProps, getRootProps, isDragActive}) {
    return (
        <div {...getRootProps({className: className})}>
            <input {...getInputProps({ name: 'file' })} />
            <div className='flex flex-col items-center justify-center gap-4'>
                <DownloadCloud/>
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag & drop files here, or click to select files</p>
                )}
            </div>
        </div> 
    )
}

export default Dropzone