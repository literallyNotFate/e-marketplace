import { Balancer } from "react-wrap-balancer"
import ArrowRight from "./components/shared/icons/arrowright";
import MoreHorizontal from "./components/shared/icons/morehorizontal";
import { Button } from "./components/ui/Button";

function Home() {
    return (
        <>
          <div className="z-10 w-full max-w-xl px-5 xl:px-0">
              <h1 className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.07em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
                style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
                  <Balancer>Put and Sell your goods with E-Marketplace</Balancer>
              </h1>

              
              <p className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
                style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
                  <Balancer>Fullstack website powered by Next.js, MongoDB and Tailwind CSS.</Balancer>
              </p>

              <div className="mx-auto mt-6 items-center justify-center space-x-5 flex">
                  <Button className='group flex max-w-fit items-center justify-center space-x-2 text-white hover:text-black hover:bg-white' href={'/about'} delay="0.3s">
                      <MoreHorizontal/>
                      <p>See more</p>
                  </Button>

                  <Button className='group flex max-w-fit items-center justify-center space-x-2 text-white hover:text-black hover:bg-white' href={'/products'} delay="0.3s">
                      <ArrowRight/>
                      <p>Get Started</p>
                  </Button>
              </div>
          </div>
        </>
    )
}

export default Home
