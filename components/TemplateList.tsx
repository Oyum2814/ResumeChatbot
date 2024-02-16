import Image from 'next/image'
import Link from 'next/link'
import template1 from '@/public/assets/templates/template1.png'
import template2 from '@/public/assets/templates/template2.png'
import useTemplates from '@/hooks/useTemplates'
import { useEffect, useState } from 'react'

const TemplateList = () => {
    const {data:fetchedTemplates} = useTemplates();
    const [templates,setTemplates] = useState([]);
    
    useEffect(()=>{
        if(fetchedTemplates){
            setTemplates(fetchedTemplates);
            console.log(fetchedTemplates)
        }
    },[fetchedTemplates])
    return ( 
        <div className="template-bg pb-40 absolute w-screen h-auto top-48 lg:top-60  flex justify-center items-center ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-6 gap-x-16 gap-y-16 md:gap-y-4 mx-auto">
                {templates?.map((template:any,index:any)=>(
                    <Link className="w-auto  h-[35vh]  shadow-xl rounded-md mt-16 lg:mt-6
                    hover:scale-110 transition ease-in-out duration-300 "
                   href={`/resume/${template?.name}`} key={index}>
                       <Image 
                       width={400}
                       height={300}
                       className="h-full w-full object-cover cursor-pointer border-[1px]"
                       alt={template?.name}
                       src={template?.thumbnail}/>
                       <p className="text-center mt-2 text-[#6a2c70] text-xl manrope font-light">{template?.name}</p>
                   </Link>
                ))}
                
                {/* <Link 
                href="/resume/"
                className="w-auto h-[35vh]  border-black border-[1px] rounded-md 
                hover:scale-110 transition ease-in-out duration-300">
                    <Image 
                    width={400}
                    height={300}
                    className="h-full w-auto object-contain cursor-pointer"
                    alt="template2"
                    src={template2}/>
                    <p className="text-center mt-2 font-[700] text-xl">Template 2</p>
                </Link>
                 */}
            </div>
        </div>
     );
}
 
export default TemplateList;