import Facebook from "../shared/icons/facebook";
import Github from "../shared/icons/github";
import Twitter from "../shared/icons/twitter";
import Youtube from "../shared/icons/youtube";

function Footer() {
    return (
        <div className="absolute w-full py-5 text-center animate-fade-up">
            <p className="text-gray-500 mb-2">&copy; Vladimir Marcvart | 2023</p>
            
            <div className="flex w-64 m-auto">
                <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="mx-auto flex max-w-fit items-center justify-center overflow-hidden rounded-full bg-blue-100 px-4 py-2 hover:bg-blue-200">
                    <Twitter className="h-5 w-5 text-[#1d9bf0]" />
                </a>

                <a href="https://github.com/" className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800" target="_blank" rel="noopener noreferrer">
                    <Github className='h-5 w-5'/>
                </a>

                <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="mx-auto flex max-w-fit items-center justify-center overflow-hidden rounded-full bg-[#3b5998] px-4 py-2 hover:bg-[#304778]">
                    <Facebook className="h-5 w-5 text-white" />
                </a>

                <a href="https://youtube.com/" target="_blank" rel="noreferrer" className="mx-auto flex max-w-fit items-center justify-center overflow-hidden rounded-full bg-[#c4302b] px-4 py-2 hover:bg-[#9d2622]">
                    <Youtube className="h-5 w-5 text-white" />
                </a>
            </div>
        </div>
    );
}

export default Footer
  