'use client'

import Image from "next/image"
import Star from "@/app/components/shared/icons/star"
import { Button } from "@/app/components/ui/Button"
import useCart from "../../../../../lib/hooks/useCart"

function CartItem({data}) {
    const cart = useCart()

    const handleAddToCart = (product) => {
        cart.addToCart(product)
    };
    
    const handleRemoveFromCart = (id) => {
        cart.removeFromCart(id)
    };

    return (
        <div className="flex py-6 border-b animate-fade-up" style={{animationDelay: '0.5s', animationFillMode: "forwards"}}>
            <div className="relative h-[100px] w-[100px] rounded-md overflow-hidden sm:h-[150px] sm:w-[150px]">
                <Image fill src={data.images[0]} alt="Product image" className="object-cover object-center"/>
            </div>

            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative flex gap-5 align-bottom justify-around">
                    <div className="mt-3 sm:mt-7 w-1/4">
                        <p className="sm:text-3xl text-xl font-semibold">{data.name}</p>
                        <p className="sm:text-lg text-md text-gray-500">{data.category}</p>
                    </div>

                    <div className="flex gap-3 mt-6 sm:mt-10 w-1/2 m-auto justify-center">
                        <Button className='text-white hover:bg-white hover:text-black rounded-md sm:h-[50px] sm:w-[50px] w-[40px] h-[40px]' 
                            disabled={data.quantity === data.limit} onClick={() => handleAddToCart(data)}>+</Button>

                        <h1 className="sm:text-3xl text-xl font-bold mt-1">{data.quantity}</h1>

                        <Button className='text-white hover:bg-white hover:text-black rounded-md sm:h-[50px] sm:w-[50px] w-[40px] h-[40px]'
                            onClick={() => handleRemoveFromCart(data.id)}>-</Button>
                    </div>
                
                    <div className="mt-3 sm:mt-7 w-1/3">
                        <h1 className="font-bold sm:text-3xl text-lg text-green-600 text-end">{data.price} $</h1>

                        <div className="font-bold text-lg sm:text-xl text-yellow-600 flex float-right">
                            <Star fill className='sm:w-[25px] sm:h-[25px] w-[20px] h-[20px]'/>
                            <div>
                                <h1 className="ml-[5px]">{data.rating === null ? 0 : data.rating.toFixed(2)}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem