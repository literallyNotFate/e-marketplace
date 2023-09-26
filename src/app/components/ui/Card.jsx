import Balancer from "react-wrap-balancer";

function Card({title, description, logo, large, delay}) {
    return (
      <div
          className={`opacity-0 relative col-span-1 h-fit p-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md animate-fade-up ${
            large ? "md:col-span-2" : ""
          }`}
          style={{ animationDelay: delay, animationFillMode: "forwards" }}
      >
            <div className="flex items-center justify-center">
                {logo}
            </div>

            <div className="mx-auto max-w-md text-center">
                <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-3xl text-transparent md:text-5xl font-bold">
                    <Balancer>{title}</Balancer>
                </h1>
                    
                <div className="mt-2 leading-normal text-gray-500 md:max-w-prose">
                    <Balancer>{description}</Balancer>
                </div>
            </div>
      </div>
    );
}

export default Card