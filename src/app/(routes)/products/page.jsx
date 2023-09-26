import DisplayProducts from "./components/DisplayProducts"

export const metadata = {
    title: 'Products | E-Marketplace',
    description: 'Products of E-Marketplace',
}

function Products() {
    return (
        <div className="z-10 w-full max-w-6xl px-5 xl:px-0">
            <DisplayProducts/>
        </div>
    )
}

export default Products









// 'use client'

// import { useForm } from "react-hook-form"
// import { toast } from 'react-hot-toast'
// import Link from "next/link"
// import { Input } from "../ui/Input"
// import { Button } from "../ui/Button"
// import DownloadCloud from "../shared/icons/cloud"
// import { useState, useEffect } from 'react'
// import { getSignature, saveToDatabase } from "../../../../lib/cloudinary"


// function Register() {
//     const [selectedFile, setSelectedFile] = useState()
//     const [preview, setPreview] = useState()

//     useEffect(() => {
//         if (!selectedFile) {
//             setPreview(undefined)
//             return
//         }
        
//         const objectUrl = URL.createObjectURL(selectedFile)
//         setPreview(objectUrl)

//         return () => URL.revokeObjectURL(objectUrl)
//     }, [selectedFile])
      
    
//     const onSelectFile = e => {
//         if (!e.target.files || e.target.files.length === 0) {
//             setSelectedFile(undefined)
//             return
//         }

//         setSelectedFile(e.target.files[0])
//     }

//     const {register, handleSubmit, watch, formState: {errors}, reset} = useForm({
//         mode: 'onChange'
//     })

//     async function upload() {
//         const file = selectedFile
//         if (!file) return
        
//         const { timestamp, signature } = await getSignature()
        
//         const formData = new FormData()
        
//         formData.append('file', file)
//         formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
//         formData.append('signature', signature)
//         formData.append('timestamp', timestamp)
//         formData.append('folder', 'e-marketplace')
        
//         const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
//         const data = await fetch(endpoint, {
//             method: 'POST',
//             body: formData
//         }).then(res => res.json())
        
//         const url = await saveToDatabase({
//             version: data?.version,
//             signature: data?.signature,
//             public_id: data?.public_id,
//         })

//         return url
//     }


//     const registerUser = async(data) => {
//         const image = await upload()

//         const user = {
//             username: data?.username,
//             email: data?.email, 
//             password: data?.password, 
//             image
//         }

//         const options = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(user)
//         }

//         const response = await fetch('api/register', options)

//         if (!response.ok) {
//             const text = await response.text();
//             toast.error(text)
//             return
//           }
        
//         const jsonResponse = await response.json();
//         toast.success(`${data.username} registered`)

//         setSelectedFile(undefined);
//         setPreview(undefined)
//         reset()

//         return jsonResponse
//     }


//     return (
//         <>
//             <div className="z-10 w-full max-w-xl px-5 xl:px-0">
//                 <form onSubmit={handleSubmit(registerUser)}>
//                     <div className="flex items-center justify-center w-1/2 mx-auto mb-2 opacity-0 animate-fade-up" style={{animationDelay: "0.2s", animationFillMode: "forwards"}}>
//                         <label htmlFor="image-file" className="flex items-center justify-center border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-full w-32 h-32">
//                             {selectedFile ? <img src={preview} className='rounded-full object-contain'/> : <DownloadCloud className='text-gray-500'/>}
//                         </label>

//                         <Input id="image-file" type="file" accept="image/*" className='hidden' {...register('imageUrl', {
//                             required: 'Image is required',
//                             })} onChange={onSelectFile} />
//                     </div>

//                     {errors?.imageUrl && (<div className="font-light text-red-500 mt-3 text-center animate-fade-down mb-6">{errors.imageUrl.message}</div>)}

//                     <div className="mb-6 opacity-0 animate-fade-up" style={{animationDelay: "0.4s", animationFillMode: "forwards"}}>
//                         <label className="block text-gray-700 md:text-md text-sm font-bold mb-2" htmlFor="username-input">
//                             Username
//                         </label>

//                         <Input id="username-input" type="text" placeholder="Username" 
//                             {...register('username', {
//                                 required: 'Username is required',
//                                 minLength: {
//                                     value: 5,
//                                     message: 'Username must be at least 5 characters'
//                                 },
//                             })}/>

//                         {errors?.username && (<div className="font-light text-red-500 mt-3 animate-fade-down">{errors.username.message}</div>)}
//                     </div>

//                     <div className="mb-6 opacity-0 animate-fade-up" style={{animationDelay: "0.6s", animationFillMode: "forwards"}}>
//                         <label className="block text-gray-700 md:text-md text-sm font-bold mb-2" htmlFor="email-input">
//                             Email
//                         </label>

//                         <Input id="email-input" type="text" placeholder="Email"
//                             {...register('email', {
//                                 required: 'Email is required',
//                                 pattern: {
//                                     value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//                                     message: 'Please enter a valid email address'
//                                 }
//                             })}/>

//                         {errors?.email && (<div className="font-light text-red-500 mt-3 animate-fade-down">{errors.email.message}</div>)}
//                     </div>

//                     <div className="mb-6 opacity-0 animate-fade-up" style={{animationDelay: "0.8s", animationFillMode: "forwards"}}>
//                         <label className="block text-gray-700 md:text-md text-sm font-bold mb-2" htmlFor="password">
//                             Password
//                         </label>

//                         <Input id="password" type="password" placeholder="Password"
//                             {...register('password', {
//                                 required: 'Password is required',
//                                 minLength: {
//                                     value: 8,
//                                     message: 'Password must be at least 8 characters'
//                                 },
//                             })}/>

//                         {errors?.password && (<div className="font-light text-red-500 mt-3 animate-fade-down">{errors.password.message}</div>)}
//                     </div>

//                     <div className="mb-6 opacity-0 animate-fade-up" style={{animationDelay: "1s", animationFillMode: "forwards"}}>
//                         <label className="block text-gray-700 md:text-md text-sm font-bold mb-2" htmlFor="confirm-password">
//                             Confirm Password
//                         </label>

//                         <Input id="confirm-password" type="password" placeholder="Confirm Password"
//                             {...register('confirm', {
//                                 required: 'Password is required',
//                                 validate: (value) => {
//                                     if (watch('password') != value) {
//                                     return "Passwords do not match";
//                                     }
//                                 },
//                             })}/>

//                         {errors?.confirm && (<div className="font-light text-red-500 mt-3 animate-fade-down">{errors.confirm.message}</div>)}
//                     </div>

//                     <div className="flex items-center justify-between mb-5 opacity-0 animate-fade-down" style={{animationDelay: "1.4s", animationFillMode: "forwards"}}>
//                         <Button className='p-3 w-1/3' type="submit">Register</Button>
//                     </div>

//                     <p className="opacity-0 animate-fade-down" style={{animationDelay: "1.6s", animationFillMode: "forwards"}}>Having an account? <Link href='/login' className="underline">Sign In</Link></p>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default Register