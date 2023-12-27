import heroImg from '@/public/assets/hero.png'
import Image from 'next/image'
import Link from 'next/link';
const Hero = () => {
    return ( 
        <div className='h-screen w-screen flex flex-col md:flex-row  justify-center items-center '>
            <Image
            className="h-auto w-[80vw] my-4 md:hidden block"
            src={heroImg} 
            alt=""

            height={1200}
            width={675}/>
            <div className="flex flex-col  justify-center items-center md:items-start">
                <h1 className="font-bold text-2xl md:text-5xl md:px-6 md:py-2 max-w-[80vw] md:max-w-[40vw] text-center md:text-left">
                    Create a compelling CV with AI Assistance in Minutes
                </h1>
                <h3 className="md:px-6 md:py-2 text-lg md:text-4xl font-light text-center md:text-left">
                Online resume builder with AI assistance
                </h3>
                <Link href="/resume"
                className="bg-[#5d61bf] mt-4 py-2 px-6 text-white cursor-pointer 
                rounded-md w-[80%] md:w-[25%] text-center ml-6 text-2xl font-semibold">
                    Get Started
                </Link>
            </div>
            <Image
            className="h-auto w-[40vw] md:block hidden"
            src={heroImg} 
            alt=""

            height={1200}
            width={675}/>
        </div>
     );
}
 
export default Hero;