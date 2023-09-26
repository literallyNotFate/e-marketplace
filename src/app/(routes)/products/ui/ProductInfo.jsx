import Gallery from "./Gallery"
import { Balancer } from "react-wrap-balancer"
import Image from "next/image"
import { getFormattedDate } from "../../../../../lib/utils"
import { Button } from "@/app/components/ui/Button"
import Star from "@/app/components/shared/icons/star"

function ProductInfo({data, session, setOpen}) {
    const isAuthor = session.data?.user?.id === data.userId
    
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[75px] mb-20">
            <div className="opacity-0 animate-fade-down" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
                <Gallery images={data.images}/>
            </div>

            <div>
                <h1 className="animate-fade-up lg:text-5xl text-4xl opacity-0 font-bold tracking-[-0.07em] md:text-7xl"
                    style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
                    <Balancer>{data.name}</Balancer>
                </h1>

                <h1 className="animate-fade-up text-3xl opacity-0 font-bold tracking-[-0.07em] md:text-5xl text-gray-500 mb-5"
                    style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
                    <Balancer>{data.category}</Balancer>
                </h1>

                <div className="flex items-center animate-fade-up opacity-0" style={{ animationDelay: "1.0s", animationFillMode: "forwards" }}>
                    <p className="inline-flex items-center mr-3 text-md text-black font-bold">
                        <Image src={data.user.image} className='mr-4 rounded-full border-2 border-black overflow-hidden h-[50px] w-[50px] object-fit' width={50} height={50} alt='Owner image'/>
                        @{data.user.username}
                    </p>
                    <p className="text-md text-gray-500">{getFormattedDate(data.createdAt)}</p>
                </div>

                <div className="mb-14 animate-fade-up opacity-0 flex justify-between" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
                    <h1 className="text-4xl text-yellow-600 font-extrabold flex mt-4">
                        <Star className='h-[35px] w-[35px]' fill/>
                        <Balancer className="ml-[10px]">{data.rating === null ? 0 : data.rating.toFixed(2)}</Balancer>
                    </h1>
                    <h1 className="text-end text-6xl text-green-600 font-extrabold">
                        <Balancer>{data.price} $</Balancer>
                    </h1>
                </div>
                    
                <div className='animate-fade-up opacity-0' style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}>
                    <div>
                        {isAuthor ? 
                            <div className="flex gap-2 float-right w-1/2">
                                <Button className='p-[20px] text-white border-blue-500 bg-blue-500 hover:text-blue-500 hover:bg-white w-full text-center' 
                                    href={`/products/${data.id}/edit`}>Edit</Button>

                                <Button className='p-[20px] text-white border-red-500 bg-red-500 hover:text-red-500 hover:bg-white w-full'
                                    onClick={() => setOpen(true)}>Delete</Button>
                            </div> :
                            <div className="flex flex-col gap-3 float-right w-1/3">
                                <Button className='p-[20px] justify-end text-white hover:text-black hover:bg-white'>Buy</Button>
                                <p className='text-xl text-center text-gray-500 animate-bounce'>
                                    <Balancer>Available: {data.quantity}</Balancer>
                                </p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo