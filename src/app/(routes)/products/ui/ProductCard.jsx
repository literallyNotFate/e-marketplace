"use client";

import ShoppingCart from "@/app/components/shared/icons/cart";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import Star from "@/app/components/shared/icons/star";
import { Button } from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";
import { fetchActions, reload } from "../../../../../lib/utils";
import useCart from "../../../../../lib/hooks/useCart";

function ProductCard({data, featured, session}) {
    const router = useRouter();
    const cart = useCart();

    const isAuthor = session.data?.user?.id === data.userId
    const isFeatured = featured?.some((item) => item.productId === data.id);

    // add to featured/remove from featured
    const handleAddToFeatured = async (productId) => {
        const response = await fetchActions(`http://localhost:3000/api/featured/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId }),
        })

        reload()
        return response
    };

    const handleRemoveFromFeatured = async (productId) => {
        const response = await fetchActions(`http://localhost:3000/api/featured/remove`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId }),
        })

        reload()
        return response
    };


    const handleClick = () => {
        router.push(`/products/${data.id}`);
    };

    function addToFeatured(e) {
        e.stopPropagation();
        isFeatured ? handleRemoveFromFeatured(data.id) : handleAddToFeatured(data.id)
    };

    function addToCart(e) {
        e.stopPropagation();
        cart.addToCart(data)
    };
    
    return ( 
        <div onClick={handleClick} className={`bg-white group cursor-pointer rounded-xl shadow-xl p-3 space-y-4 hover:scale-105 transition-all duration-100 
            ${isAuthor ? 'border-2 border-purple-500' : ''} 
            ${isFeatured ? 'border-2 border-orange-500' : ''}`}>

            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image src={data.images[0]} alt="Product Image" fill className="aspect-square object-cover rounded-md"/>

                {isAuthor || session.status === "unauthenticated" ? null : (
                    <>
                        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                            <div className="flex gap-x-6 justify-center">
                                <Button onClick={addToFeatured} className='bg-yellow-500'>
                                    <Star fill={isFeatured}/>
                                </Button>

                                <Button onClick={addToCart} className='bg-blue-500'>
                                    <ShoppingCart/>
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div>
                <p className="font-semibold text-lg">{data.name}</p>
                <p className="text-sm text-gray-500">{data.category}</p>
            </div>

            <div className="flex justify-between">
                <div className="font-bold text-xl text-yellow-600 flex">
                    <Star fill/>
                    <div>
                        <Balancer className="ml-[5px]">{data.rating === null ? 0 : data.rating.toFixed(2)}</Balancer>
                    </div>
                </div>

                <Balancer className="font-bold text-xl text-green-600">{data.price} $</Balancer>
            </div>
        </div>
    );
}

export default ProductCard