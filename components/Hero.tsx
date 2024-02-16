import heroImg from '@/public/assets/hero.png'
import Image from 'next/image'
import Link from 'next/link';
import asset1 from '@/public/assets/hero/asset1.png'
import asset2 from '@/public/assets/hero/asset2.png'
import asset3 from '@/public/assets/hero/asset3.png'

const Hero = () => {
    return ( 
        <div className='h-screen w-screen flex   justify-center items-center '>
            <div className="rounded-[10px]  opacity-0.6 hero-card text-white w-[80%] h-[70%] flex justify-center items-center
            flex-col-reverse md:flex-row">
                <div className="md:max-w-[50%] px-4 md:px-20 h-[60%] md:h-auto text-center md:text-left">
                    <h2 className="font-[700] manrope text-[16px] xl:text-[21px]">
                    Create a Compelling CV with AI Assistance in Minutes
                    </h2>
                    <p className="manrope font-[300] mt-8 text-sm">
                    Resume Genie is an Online platform which helps you create a resume via conversation with a Chatbot. 
                    Choose from multiple templates from our site and build your resume today in 10 minutes!
                    </p>
                    <div className=" mt-6">
                        <Link 
                        href={"/templates"}
                        className="px-4 py-2 bg-white text-[#6a2c70] font-extralight rounded-[10px]">
                            Get Started Now
                        </Link>
                    </div>
                </div>
                <div className="flex h-[40%] w-full md:h-full justify-center items-center md:w-[50%] overflow-hidden">
                    <Image src={asset1} alt="" height={270} width={191} className="h-[50%] md:h-[35%] w-auto"/>
                    <Image src={asset2} alt="" height={270} width={191} className="h-[50%] md:h-[35%] w-auto"/>
                    <Image src={asset3} alt="" height={270} width={191} className="h-[50%] md:h-[35%] w-auto"/>
                </div>
            </div>
        </div>
     );
}
 
export default Hero;