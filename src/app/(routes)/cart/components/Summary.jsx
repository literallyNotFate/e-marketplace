import { Button } from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Summary({cart}) {
    const router = useRouter()

    const price = cart.totalAmount(cart.items)
    const count = cart.totalItems(cart.items)

    const buy = () => {
        toast.success(`${count} items bought for ${price} $`);

        setTimeout(() => {
            router.push('/products')
        }, 1000)

        cart.clearCart();
    }

    return (
        <div className="mt-7 opacity-0 animate-fade float-right" style={{animationDelay: "1s", animationFillMode: "forwards"}}>
            <div className="mb-6">
                <h1 className="sm:text-7xl text-4xl font-extrabold text-green-600 mb-3 text-end">{price} $</h1>
                <h1 className="sm:text-3xl text-lg text-gray-600 text-end">Total items: {count}</h1>
            </div>
            <div className="flex gap-6">
                <Button className='sm:p-[20px] p-[10px] text-white hover:text-black hover:bg-white sm:w-[150px] w-[75px] rounded-xl'
                    onClick={() => cart.clearCart()}>Clear Cart</Button>
                <Button className='sm:p-[20px] p-[10px] text-white hover:text-black hover:bg-white sm:w-[150px] w-[75px] rounded-xl'
                    onClick={() => buy()}>Buy</Button>
            </div>
        </div>
    )
}

export default Summary