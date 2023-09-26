'use client'

import CartItem from "./CartItem";
import useCart from "../../../../../lib/hooks/useCart";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/app/components/shared/LoadingSpinner";
import Summary from "./Summary";

function CartList() {
    const cart = useCart();
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return <LoadingSpinner/>
    }

    return (
        <>
            {cart.items.length === 0 ? (<h1 className="text-neutral-500 text-center text-4xl">No items added to cart.</h1>) :
            (<>
                {cart.items.map((item) => (
                    <CartItem key={item.id} data={item} />
                ))}

                <Summary cart={cart} />
            </>)}
        </>
    )
}

export default CartList