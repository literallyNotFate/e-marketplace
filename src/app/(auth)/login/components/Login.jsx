'use client'

import { useForm } from "react-hook-form"
import { signIn, useSession } from "next-auth/react"
import { toast } from 'react-hot-toast'
import Link from "next/link"
import { Input } from "../../../components/ui/Input"
import { Button } from "../../../components/ui/Button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


function Login() {
    const session = useSession()
    const router = useRouter()

    const {register, handleSubmit, watch, formState: {errors}, reset} = useForm({
        mode: 'onChange'
    })

    useEffect(() => {
        if(session?.status === 'authenticated') {
            router.push('/')
        }
    })

    const loginUser = async(data) => {
        signIn('credentials', {...data, redirect: false})
            .then((callback) => {
                if(callback?.error) {
                    toast.error(callback.error)
                    return
                }

                toast.success(`Logged in`)
                router.refresh()
            })

        reset()
    }


    return (
        <>
            <div className="z-10 w-full max-w-xl px-5 xl:px-0">
                <form onSubmit={handleSubmit(loginUser)}>
                    <div className="mb-6 opacity-0 animate-fade-up" style={{animationDelay: "0.4s", animationFillMode: "forwards"}}>
                        <label className="block text-gray-700 md:text-md text-sm font-bold mb-2" htmlFor="email-input">
                            Email
                        </label>

                        <Input id="email-input" type="text" placeholder="Email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Please enter a valid email address'
                                }
                            })}/>

                        {errors?.email && (<div className="font-light text-red-500 mt-3 animate-fade-down">{errors.email.message}</div>)}
                    </div>

                    <div className="mb-6 opacity-0 animate-fade-up" style={{animationDelay: "0.6s", animationFillMode: "forwards"}}>
                        <label className="block text-gray-700 md:text-md text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>

                        <Input id="password" type="password" placeholder="Password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                },
                            })}/>

                        {errors?.password && (<div className="font-light text-red-500 mt-3 animate-fade-down">{errors.password.message}</div>)}
                    </div>

                    <div className="flex items-center justify-between mb-5 opacity-0 animate-fade-down" style={{animationDelay: "0.8s", animationFillMode: "forwards"}}>
                        <Button className='p-3 w-1/3 text-white hover:bg-white hover:text-black' type="submit">Login</Button>
                    </div>

                    <p className="opacity-0 animate-fade-down" style={{animationDelay: "1.0s", animationFillMode: "forwards"}}>No account? <Link href='/register' className="underline">Sign Up</Link></p>
                </form>
            </div>
        </>
    )
}

export default Login