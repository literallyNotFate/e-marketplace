import Pencil from "@/app/components/shared/icons/pencil"
import TrashBin from "@/app/components/shared/icons/trash"
import Paginator from "@/app/components/shared/Paginator"
import { Button } from "@/app/components/ui/Button"
import { Textarea } from "@/app/components/ui/Textarea"
import { useSession } from "next-auth/react"
import Image from "next/image"
import usePagination from "../../../../../lib/hooks/usePagination"
import { calculateTimeSince } from "../../../../../lib/utils"
import { useState } from "react"
import ShowRating from "@/app/components/shared/ShowRating"
import SetRating from "@/app/components/shared/SetRating"

function Comment({data, editComment, deleteComment, productCreator}) {
    const session = useSession()

    const isAuthor = session?.data?.user.id === data.userId
    const isProductCreator = productCreator === data.userId
    
    const [isEditing, setIsEditing] = useState(false)
    const [commentContent, setCommentContent] = useState(data.content)

    const [rating, setRating] = useState(data.rating)

    function edit() {
        setIsEditing(false)
        editComment(data.id, commentContent, rating)
    }

    return (
        <div className="p-6 mb-6 text-base bg-white rounded-lg shadow-md">
            <div className="flex justify-between mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-black font-bold">
                        <Image className="mr-2 w-6 h-6 rounded-full" src={data.user.image} alt="Comment author" width={50} height={50}/>
                        @{data.user.username}
                    </p>
                    
                    <p className="text-sm text-gray-500 mr-3">{calculateTimeSince(data.createdAt)} ago</p>
                    {isProductCreator ? <p className="text-purple-500 text-sm font-thin italic">Creator</p> : 
                        (!isEditing ? <ShowRating rating={data.rating}/> : null)}
                </div>

                {!isAuthor ? null : (
                    <div className="flex gap-2">
                        <Button className='border-blue-500 bg-blue-500 hover:text-blue-500 text-white hover:bg-white rounded-md' onClick={() => setIsEditing(!isEditing)}>
                            <Pencil/>
                        </Button>
                        <Button className='border-red-500 bg-red-500 hover:text-red-500 text-white hover:bg-white rounded-md' onClick={() => deleteComment(data.id)}>
                            <TrashBin/>
                        </Button>
                    </div>
                )}
            </div>

            {!isEditing ? (<p className="text-gray-500">{data.content}</p>) : 
            (
                <>
                    <div className="mb-3">
                        <SetRating rating={rating} setRating={setRating}/>
                    </div>
                    <Textarea onChange={(e) => setCommentContent(e.target.value)} value={commentContent} resized={false} className='mb-3'/>
                    <Button className='text-white hover:bg-white hover:text-black rounded-md'
                        onClick={() => edit()}>Save changes</Button>
                </>
            )}
        </div>
    )
}


function CommentFeed({comments, editComment, deleteComment, delay}) {
    const {slicedData, page, allPages, setPage} = usePagination(comments.comments, 3)

    return (
        <>
            <div className="flex flex-col gap-3 mb-3 opacity-0 animate-fade-up" style={{animationDelay: delay, animationFillMode: "forwards"}}>
                {slicedData.map((item) => (
                    <Comment data={item} 
                        key={item.id} 
                        editComment={editComment}
                        deleteComment={deleteComment} 
                        productCreator={comments.userId}/>
                ))}
            </div>
            
            <div className='opacity-0 animate-fade-up' style={{animationDelay: delay, animationFillMode: "forwards"}}>
                <Paginator pages={allPages} current={page} setPage={setPage}/>
            </div>
        </>
    )
}

export default CommentFeed