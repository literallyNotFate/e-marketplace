"use client";

import Link from "next/link";
import useScroll from "../../../../lib/hooks/useScroll";
import UserDropdown from "../shared/UserDropdown";
import ShoppingCart from "../shared/icons/cart";
import { Button } from "../ui/Button";
import useCart from "../../../../lib/hooks/useCart";

function Navbar({ session }) {
    const scrolled = useScroll(50)

    const cart = useCart()
    const count = cart.totalItems(cart.items)

    return (
        <>
          <div className={`fixed top-0 w-full flex justify-center ${scrolled ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl" : "bg-white/0"} z-30 transition-all`}>
              <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
                  <Link href={"/"} className="flex items-center font-bold text-2xl gap-5 animate-fade-down" style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
                      <ShoppingCart/>
                      <p>e-marketplace</p>
                  </Link>
                    
                  <div>
                      {session ? (
                        <div className="flex gap-5 justify-center items-center">
                            <Button href={'/cart'} delay="2s" className='text-white hover:text-black hover:bg-white rounded-md w-[100px] text-center h-fit'>Cart ({count})</Button>
                            <UserDropdown session={session} />
                        </div>) : 
                        (
                            <Button href={'/register'} delay="0.2s" className='text-white hover:text-black hover:bg-white'>Sign Up</Button>
                        )}
                  </div>
              </div>
          </div>
        </>
    );
}

export default Navbar