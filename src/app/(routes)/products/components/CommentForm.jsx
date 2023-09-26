import { Textarea } from "@/app/components/ui/Textarea"
import { Button } from "@/app/components/ui/Button"
import SetRating from "@/app/components/shared/SetRating"

function CommentForm({postComment, comment, setComment, rating, setRating, delay, isCreator}) {
    return (
        <div className="mb-9 opacity-0 animate-fade-up" style={{ animationDelay: delay, animationFillMode: "forwards" }}>
            {!isCreator ? (
                <div className="py-2 px-4 flex gap-2">
                    <p className="font-bold">Set rating: </p>
                    <SetRating rating={rating} setRating={setRating}/>
                </div>
            ) : null}
            
            <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg">
                <Textarea rows="6" value={comment} onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..." resized={false}></Textarea>
            </div>

            <Button disabled={!comment || (isCreator ? false : rating === 0)} onClick={() => postComment()} className='text-white hover:text-black hover:bg-white'>Post comment</Button>
        </div>
    )
}

export default CommentForm