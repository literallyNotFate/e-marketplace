'use client'

import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Select } from "@/app/components/ui/Select";
import Dropzone from "@/app/components/ui/Dropzone";
import { useDropzone } from 'react-dropzone'
import { getSignature, saveToDatabase } from "../../../../../lib/cloudinary";
import Image from "next/image";
import { fetchActions } from "../../../../../lib/utils";
import { useFetch } from "../../../../../lib/hooks/useFetch";
import LoadingSpinner from "@/app/components/shared/LoadingSpinner";

const options = ['Clothing', 'Shoes', 'Electronics', 'Books', 'Games', 'For Pets', 'Furniture']

function ProductForm({id}) {
    const router = useRouter()
    const session = useSession()

    const initial = id ? useFetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`) : null

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        mode: 'onChange'
    })

    useEffect(() => {
        if(session?.status !== 'authenticated' && session?.status !== 'loading') {
            router.push('/products')
        }
    }, [session])


    function resetting(data) {
        reset(data.data)
        if(data.data !== undefined) {
            load(data.data.images)
            router.refresh()
        }
    }

    useEffect(() => {
        if(id) {
            resetting(initial)
        }
    }, [id ? initial.data : null])


    const title = initial ? 'Edit product' : 'Create product';
    const action = initial ? 'Save changes' : 'Create';
    

    const postProduct = async(data) => {
        const urls = await upload()

        const res = {
            ...data,
            price: parseInt(data.price),
            quantity: parseInt(data.quantity),
            images: urls
        }

        // in edit/delete mode
        if(initial) {
            const response = await fetchActions(`http://localhost:3000/api/products/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(res)
            })

            setTimeout(() => {
                router.push(`/products/${id}`)
            }, 1000)

            return response
        }
        
        // other
        const response = await fetchActions(`http://localhost:3000/api/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(res)
        })

        setFiles([])
        setRejected([])
        reset()

        setTimeout(() => {
            router.push('/products')
        }, 1000)
        
        return response
    }



    // img
    const [files, setFiles] = useState([])
    const [rejected, setRejected] = useState([])

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [...previousFiles, ...acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }))])
        }
    
        if (rejectedFiles?.length) {
            setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
        }
    }, [])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        maxSize: 1024 * 1000,
        maxFiles: 3,
        onDrop
    })

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])

    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    const removeAll = () => {
        setFiles([])
        setRejected([])
    }

    const removeRejected = name => {
        setRejected(files => files.filter(({ file }) => file.name !== name))
    }

    async function upload() {
        if (files.length === 0) return

        const urls = []

        for(let i = 0; i < files.length; i++) {
            const file = files[i];

            const formData = new FormData()
            const { timestamp, signature } = await getSignature()

            formData.append('file', file)
            formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
            formData.append('signature', signature)
            formData.append('timestamp', timestamp)
            formData.append('folder', 'e-marketplace')

            const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
            const data = await fetch(endpoint, {
                method: 'POST',
                body: formData
            }).then(res => res.json())

            const url = await saveToDatabase({
                version: data?.version,
                signature: data?.signature,
                public_id: data?.public_id,
            })
    
            urls.push(url)
        }

        return urls
    }

    function load(urls) {
        if (urls.length === 0) return
        const result = []

        for(let i = 0; i < urls.length; i++) {
            let file
            fetch(urls[i]).then(async response => {
                const contentType = response.headers.get('content-type')
                const blob = await response.blob()

                file = new File([blob], `Image ${i + 1}`, { type: contentType})
                Object.assign(file, { preview: URL.createObjectURL(file) })
                
                result.push(file)
            })
        }

        setFiles(result)
    }

    if(id) {
        if(!initial) {
            return <LoadingSpinner/>
        }
    }

    

    return (
        <>
            <div className="z-10 w-full max-w-xl px-5 xl:px-0">
                <h1 className="text-3xl mb-8 font-bold opacity-0 animate-fade-up" style={{animationDelay: "0.2s", animationFillMode: "forwards"}}>{title}</h1>

                <form onSubmit={handleSubmit(postProduct)}>
                    <div className="mb-6 opacity-0 animate-fade-up" style={{animationDelay: "0.4s", animationFillMode: "forwards"}}>
                        <label className="block text-gray-700 md:text-md text-sm font-bold mb-2" htmlFor="name-input">
                            Name
                        </label>

                        <Input id="name-input" type="text" placeholder="Name" 
                            {...register('name', {
                                required: 'Name is required',
                            })}/>

                        {errors?.name && (<div className="font-light text-red-500 mt-3 animate-fade-down">{errors.name.message}</div>)}
                    </div>

                    <div className="mb-6 opacity-0 animate-fade-up" style={{animationDelay: "0.6s", animationFillMode: "forwards"}}>
                        <label className="block text-gray-700 md:text-md text-sm font-bold mb-2" htmlFor="category-input">
                            Category
                        </label>

                        <Select id="category-input" options={options}
                            {...register('category', {
                                required: 'Category is required',
                            })}/>

                        {errors?.category && (<div className="font-light text-red-500 mt-3 animate-fade-down">{errors.category.message}</div>)}
                    </div>

                    <div className="mb-6 flex justify-between gap-10">
                        <div className="w-1/2 opacity-0 animate-fade-up" style={{animationDelay: "0.8s", animationFillMode: "forwards"}}>
                            <label className="block text-gray-700 md:text-md text-sm font-bold mb-2" htmlFor="price-input">
                                Price
                            </label>

                            <Input id="price-input" type="number" placeholder="0"
                                {...register('price', {
                                    required: 'Price is required',
                                })}/>

                            {errors?.price && (<div className="font-light text-red-500 mt-3 animate-fade-down">{errors.price.message}</div>)}
                        </div>
                        <div className="w-1/2 opacity-0 animate-fade-up" style={{animationDelay: "1.0s", animationFillMode: "forwards"}}>
                            <label className="block text-gray-700 md:text-md text-sm font-bold mb-2" htmlFor="quantity-input">
                                Quantity
                            </label>

                            <Input id="quantity-input" type="number" placeholder="0"
                                {...register('quantity', {
                                    required: 'Quantity is required',
                                })}/>

                            {errors?.quantity && (<div className="font-light text-red-500 mt-3 animate-fade-down">{errors.quantity.message}</div>)}
                        </div>
                    </div>

                    <div className="mb-6 opacity-0 animate-fade-up" style={{animationDelay: "1.2s", animationFillMode: "forwards"}}>
                        <Dropzone 
                            className='border border-neutral-200 p-16 text-gray-500 hover:text-gray-600 transition-all duration-150 cursor-pointer rounded-xl'
                            getInputProps={getInputProps}
                            getRootProps={getRootProps}
                            isDragActive={isDragActive}
                        />
                    </div>

                    <div className='mt-10'>
                        {files.length === 0 ? null : (
                            <>
                                <div className='float-right'>
                                    <Button onClick={removeAll} className='text-white hover:text-black hover:bg-white'>Remove all files</Button>
                                </div>

                                <h3 className='title mt-10 pb-3 text-lg font-semibold'>Accepted Files</h3>
                                <ul className='mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
                                {files.map(file => (
                                    <li key={file.name} className='relative rounded-md shadow-lg'>
                                        <Image src={file.preview} alt={file.name} width={100} height={100} onLoad={() => {
                                            URL.revokeObjectURL(file.preview)
                                        }}
                                        className='h-full w-full rounded-md object-contain'/>
                                        
                                        <Button className='absolute -right-3 -top-3 flex h-8 w-6 items-center justify-center rounded-full hover:text-rose-400 border border-rose-400 bg-rose-400 transition-colors hover:bg-white text-white' onClick={() => removeFile(file.name)}>
                                            <p className='fill-white transition-colors hover:fill-rose-400 text-xl h-[35px]'>&times;</p>
                                        </Button>
                                    </li>
                                ))}
                                </ul>
                            </>
                        )}

        
                        <ul className='mt-6 flex flex-col'>
                            {rejected.map(({ file, errors }) => (
                                <li key={file.name} className='flex items-start justify-between'>
                                    <div>
                                        <p className='mt-2 text-sm font-medium text-stone-500'>{file.name}</p>
                                        <ul className='text-[12px] text-red-400'>
                                            {errors.map(error => (
                                                <li key={error.code}>{error.message}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Button className='rounded-xl text-white hover:text-black hover:bg-white' onClick={() => removeRejected(file.name)}>Remove</Button>
                                </li>
                            ))}
                        </ul>

                        {files.length === 0 && (<p className="font-light text-red-500 mt-5 animate-fade-down mb-5" style={{animationDelay: "1.4s", animationFillMode: "forwards"}}>At least 1 image is required</p>)}
                    </div>


                    <div className="flex items-center justify-between mb-5 opacity-0 animate-fade-down" style={{animationDelay: "1.4s", animationFillMode: "forwards"}}>
                        <Button className='p-3 w-1/3 text-white hover:text-black hover:bg-white' type="submit" disabled={files.length === 0}>{action}</Button>
                    </div>
                </form>
            </div>
        </>     
    )
}

export default ProductForm