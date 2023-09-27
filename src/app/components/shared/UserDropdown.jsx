'use client'

import Popover from "../ui/Popover"
import Image from "next/image"
import DashboardIcon from "./icons/dashboard"
import { Button } from "../ui/Button"
import { signOut } from "next-auth/react"
import Logout from "./icons/logout"
import Skeleton from "../ui/Skeleton"
import { useFetch } from "../../../../lib/hooks/useFetch"
import Plus from "./icons/plus"
import useCart from "../../../../lib/hooks/useCart"

function UserDropdown({session}) {
    const {data} = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${session?.user.id}`, false, session?.user.id)
    const cart = useCart()

    if(!data) {
        return (
            <div className="p-4 mt-1">
                <Skeleton className='rounded-full w-[40px] h-[40px]'/>
            </div>
        )
    }

    const logout = () => {
        cart.clearCart()
        signOut()
    }
    
    return (
        <>
            <Popover 
                title={
                    <div className="p-4 mt-1">
                        <Image src={session?.user.image} width={40} height={40} className='rounded-full w-[40px] h-[40px] overflow-hidden' alt='User avatar'/>
                    </div>
                }

                content={
                    <>
                        <div className="mb-5 animate-fade-up">
                            <p className="font-bold text-center">@{data.username}</p>
                        </div>
                        <div>
                            <Button className='w-[10em] group flex items-center justify-center space-x-2 mb-5 mx-auto animate-fade-up hover:text-black hover:bg-white text-white' href={`/dashboard/${data.id}`} delay='0.4s'>
                                <DashboardIcon/>
                                <p>Dashboard</p>
                            </Button>
                        </div>
                        <div>
                            <Button className='w-[10em] group flex items-center justify-center space-x-2 mb-5 mx-auto animate-fade-up hover:text-black hover:bg-white text-white' href={'/products/new'} delay='0.6s'>
                                <Plus/>
                                <p>Add</p>
                            </Button>
                        </div>
                        <div>
                            <Button className='animate-fade-up w-[10em] group flex items-center justify-center space-x-2 mx-auto border border-red-500 bg-red-500 hover:text-red-500 text-white hover:bg-white' delay='0.8s'
                                onClick={() => logout()}>
                                <Logout/>
                                <p>Logout</p>
                            </Button>
                        </div>
                    </>
                }
            />
        </>
    )
}

export default UserDropdown