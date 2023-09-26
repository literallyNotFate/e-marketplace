import Skeleton from "@/app/components/ui/Skeleton"

function CardSkeleton({amount}) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from(Array(amount), (v,i)=> 
                    <Skeleton className='rounded-xl p-3 space-y-4' key={i}>
                        <Skeleton className='aspect-square rounded-xl bg-neutral-300 relative'/>
                        <Skeleton className="w-full bg-neutral-300 p-5"></Skeleton>
                        <Skeleton className='w-full bg-neutral-300 p-3'></Skeleton>
                    </Skeleton>
                )}
            </div>
        </div>
    )
}

export default CardSkeleton