'use client'

import { useFetch } from "../../../../../lib/hooks/useFetch";
import LoadingSpinner from "@/app/components/shared/LoadingSpinner";
import Image from "next/image";
import { calculateTimeSince } from "../../../../../lib/utils";
import DataColumns from "./DataColums";
import Product from "@/app/components/shared/icons/product";
import CommentIcon from "@/app/components/shared/icons/comment";
import Star from "@/app/components/shared/icons/star";
import { useState } from "react";
import Modal from "@/app/components/shared/Modal";
import ProductContent from "./ProductContent";
import { Button } from "@/app/components/ui/Button";
import CommentsContent from "./CommentsContent";

function Dashboard({id}) {
    const { data, loading } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, false, id)

    const [open, setOpen] = useState({
        product: false,
        comment: false,
        featured: false
    })

    if(loading) {
        return <LoadingSpinner/>
    }

    const feat = data.featured.map(a => a.product);

    const info = [
        {
            id: 1,
            content: <>
                <Product className={`w-[100px] h-[100px] mx-auto ${data.products.length === 0 ? 'text-neutral-300' : 'text-green-600'}`}/>
                <h1 className={`text-2xl text-center mt-3 ${data.products.length === 0 ? 'text-neutral-300' : 'text-green-600'}`}>Published products</h1>
            </>,
            class:`border-2 ${data.products.length === 0 ? 'border-neutral-300 cursor-not-allowed' : 'border-green-600 cursor-pointer'}`,
            disabled: data.products.length === 0,
            handleClick: function() {
                setOpen({...open, product: true})
            }
        },
        {
            id: 2,
            content: <>
                <CommentIcon className={`w-[100px] h-[100px] mx-auto ${data.comments.length === 0 ? 'text-neutral-300' : 'text-purple-600'}`}/>
                <h1 className={`text-2xl text-center mt-3 ${data.comments.length === 0 ? 'text-neutral-300' : 'text-purple-600'}`}>Comments</h1>
            </>,
            class:`border-2 ${data.comments.length === 0 ? 'border-neutral-300 cursor-not-allowed' : 'border-purple-600 cursor-pointer'}`,
            disabled: data.comments.length === 0,
            handleClick: function() {
                setOpen({...open, comment: true})
            }
        },
        {
            id: 3,
            content: <>
                <Star fill className={`w-[100px] h-[100px] mx-auto ${data.featured.length === 0 ? 'text-neutral-300' : 'text-yellow-600'}`}/>
                <h1 className={`text-2xl text-center mt-3 ${data.featured.length === 0 ? 'text-neutral-300' : 'text-yellow-600'}`}>Featured products</h1>
            </>,
            class:`border-2 ${data.featured.length === 0 ? 'border-neutral-300 cursor-not-allowed' : 'border-yellow-600 cursor-pointer'}`,
            disabled: data.featured.length === 0,
            handleClick: function() {
                setOpen({...open, featured: true})
            }
        },
    ]

    return (
        <div className="z-10 w-full max-w-5xl px-5 xl:px-0">
            <div className='flex flex-col gap-7'>
                <div>
                    <div className="flex flex-col gap-6 items-center">
                        <Image src={data.image} className='rounded-full border-2 border-black overflow-hidden h-[200px] w-[200px] object-fit' width={200} height={200} alt='User avatar'/>
                        <h1 className="text-center font-bold text-4xl">@{data.username}</h1>
                    </div>
                    <p className="text-xl text-gray-500 text-center">Registered {calculateTimeSince(data.createdAt)} ago</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {info.map((item) => 
                        <DataColumns 
                            content={item.content}
                            className={item.class}
                            handleClick={!item.disabled ? item.handleClick : null} 
                            key={item.id}
                        />
                    )}
                </div>
            </div>
            
            <Modal open={open.product}>
                <ProductContent data={data.products}/>
                <Button className={`text-white hover:bg-white rounded-md mt-5 w-full ${open.product ? '' : 'invisible'}`} 
                    onClick={() => setOpen({...open, product: false})}>Close</Button>
            </Modal>

            <Modal open={open.comment}>
                <CommentsContent data={data.comments}/>
                <Button className={`text-white hover:bg-white rounded-md mt-5 w-full ${open.comment ? '' : 'invisible'}`} 
                    onClick={() => setOpen({...open, comment: false})}>Close</Button>
            </Modal>

            <Modal open={open.featured}>
                <ProductContent data={feat}/>
                <Button className={`text-white hover:bg-white rounded-md mt-5 w-full ${open.featured ? '' : 'invisible'}`} 
                    onClick={() => setOpen({...open, featured: false})}>Close</Button>
            </Modal>
        </div>
    )
}



export default Dashboard