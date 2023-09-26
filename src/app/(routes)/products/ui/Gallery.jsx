import Image from "next/image"

function Gallery({images}) {
    const [first, ...rest] = images

    return (
        <div className="grid gap-4">
            <div>
                <Image className="w-full rounded-lg h-[400px] object-cover" src={first} alt="Image thumbnail" width={100} height={100}/>
            </div>

            <div className='grid grid-cols-4 gap-4'>
                {rest.map((item, i) => (
                    <Image className="max-w-full rounded-lg" key={i} src={item} alt={`Image ${i + 1}`} width={100} height={100}/>
                ))}
            </div>
        </div>
    )
}

export default Gallery