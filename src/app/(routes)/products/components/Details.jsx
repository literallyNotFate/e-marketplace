'use client'

import { useFetch } from "../../../../../lib/hooks/useFetch"
import { useState } from "react"
import LoadingSpinner from "@/app/components/shared/LoadingSpinner"
import ProductInfo from "../ui/ProductInfo"
import CommentFeed from "../ui/CommentFeed"
import CommentForm from "./CommentForm"
import { fetchActions, reload } from "../../../../../lib/utils"
import { useSession } from "next-auth/react"
import Modal from "@/app/components/shared/Modal"
import { Button } from "@/app/components/ui/Button"
import TrashBin from "@/app/components/shared/icons/trash"
import { useRouter } from "next/navigation"
import RelatedProducts from "../ui/RelatedProducts"

function Details({id}) {
    const session = useSession()
    const router = useRouter()
    const { data, loading } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

    const [comment, setComment] = useState()
    const [rating, setRating] = useState(0)

    const [open, setOpen] = useState(false)

    if(loading) {
        return <LoadingSpinner/>
    }

    // comments
    const postComment = async() => {
        const response = await fetchActions('http://localhost:3000/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({comment, rating, id})
        })

        reload()
        return response
    }

    const editComment = async(id, newContent, newRating) => {
        const response = await fetchActions(`http://localhost:3000/api/comments/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id, newContent, newRating})
        })

        reload()
        return response
    }

    const deleteComment = async(id) => {
        const response = await fetchActions(`http://localhost:3000/api/comments/${id}`, {
            method: 'DELETE',
        })

        reload()
        return response
    }


    // product delete
    const deleteProduct = async(id) => {
        setTimeout(() => {
            setOpen(false)
        }, 500)

        const response = await fetchActions(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE',
        })

        setTimeout(() => {
            router.push('/products')
        }, 500)
        return response
    }


    return (
        <div className="z-10 w-full max-w-5xl px-5 xl:px-0">
            <ProductInfo data={data} session={session} setOpen={setOpen}/>

            <h1 className='text-3xl font-bold mb-10 opacity-0 animate-fade' style={{animationDelay: "1.6s", animationFillMode: "forwards"}}>Comments ({data.comments.length})</h1>

            <CommentForm postComment={postComment}
                comment={comment}
                setComment={setComment}
                rating={rating}
                setRating={setRating}
                isCreator={data.userId === session?.data?.user.id}
                delay="1.8s"/>

            <CommentFeed comments={data} 
                editComment={editComment} 
                deleteComment={deleteComment} 
                delay="2.0s"/>
                
            
            <Modal open={open}>
                <div className="w-[300px]">
                    <TrashBin className='mx-auto mt-5 h-[50px] w-[50px] text-red-500'/>
                    <h1 className="text-center font-bold mt-3 text-2xl">Confirm delete</h1>
                    <p className="text-lg text-center">Are you sure you want to delete this product ({data.name})?</p>

                    <div className="flex justify-between mt-6 w-3/4 mx-auto">
                        <Button className='border border-red-500 bg-red-500 hover:text-red-500 text-white hover:bg-white rounded-lg' onClick={() => deleteProduct(data.id)}>Delete</Button>
                        <Button className='text-white hover:bg-white rounded-lg' onClick={() => setOpen(false)}>Cancel</Button>
                    </div>
                </div>
            </Modal>


            <RelatedProducts data={data.related} session={session} delay="2.5s"/>
        </div>
    )
}

export default Details