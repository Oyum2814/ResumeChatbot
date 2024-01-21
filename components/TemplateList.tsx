import Image from 'next/image'
import Link from 'next/link'
import template1 from '@/public/assets/templates/template1.png'
import template2 from '@/public/assets/templates/template2.png'
const TemplateList = () => {
    return ( 
        <div className="absolute w-screen h-auto mt-32 md:mt-48 flex justify-center items-center">
            <div className="grid grid-cols-4 p-6 gap-x-16 gap-y-4 mx-auto">
                <Link className="w-[15vw] h-[35vh]  border-black border-[1px] rounded-md 
                 hover:scale-110 transition ease-in-out duration-300"
                href="/resume1">
                    <Image 
                    width={400}
                    height={300}
                    className="h-full w-full object-cover cursor-pointer object-top"
                    alt="template1"
                    src={template1}/>
                    <p className="text-center mt-2 font-[700] text-xl">Template 1</p>
                </Link>
                <Link 
                href="/resume2"
                className="w-[15vw] h-[35vh]  border-black border-[1px] rounded-md 
                hover:scale-110 transition ease-in-out duration-300">
                    <Image 
                    width={400}
                    height={300}
                    className="h-full w-auto object-contain cursor-pointer"
                    alt="template2"
                    src={template2}/>
                    <p className="text-center mt-2 font-[700] text-xl">Template 2</p>
                </Link>
                
            </div>
        </div>
     );
}
 
export default TemplateList;