import Image from 'next/image';
import {BsChevronDown,BsSearch,BsBell} from 'react-icons/bs';
import {useState,useCallback,useEffect} from 'react';
import AccountMenu from './AccountMenu';
import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import useCurrentUser from '@/hooks/useCurrentUser';
import { BsPersonFill } from "react-icons/bs";
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';

const TOP_OFFSET=66;
interface NavbarProps{
    resumePage?:boolean;
    homePage?:boolean;
}
const Navbar:React.FC<NavbarProps> = ({resumePage,homePage})=>{
    const [showMobileMenu,setShowMobileMenu] =useState(false);
    const [showAccountMenu,setShowAccountMenu] =useState(false);
    const {data:user} = useCurrentUser();
    const [showBackground,setShowBackground]=useState(false);

    useEffect(()=>{
        const handleScroll=()=>{
            if(window.scrollY>= TOP_OFFSET)
            {
                setShowBackground(true);
            }
            else
            {
                setShowBackground(false);
            }
        }
        window.addEventListener('scroll',handleScroll);

        return ()=>{
            window.removeEventListener('scroll',handleScroll);
        }
    },[]);
    
    const toggleMobileMenu = useCallback(()=>{
        setShowMobileMenu((current)=>!current);
    },[]);
    const toggleAccountMenu = useCallback(()=>{
        setShowAccountMenu((current)=>!current);
    },[]);

    const [loader,setLoader] = useState(false);
    const downloadPDF = ()=>{
        window.print();
        // const capture = document.querySelector('#resume');
        // setLoader(true);
        // html2canvas(capture as any ).then((canvas)=>{
        //     const imgData = canvas.toDataURL('img/png');
        //     const doc = new jsPDF('p','mm','a4');
        //     const componentWidth = doc.internal.pageSize.getWidth();
        //     const componentHeight = doc.internal.pageSize.getHeight();
        //     doc.addImage(imgData,'PNG',0,0,componentWidth,componentHeight);
        //     setLoader(false);
        //     doc.save('resume.pdf');
        // })
    }

    return (
        // update : changed text to white from back and background to transparent from white
        <nav className={`non_print_area manrope
        w-full fixed z-40 text-white flex flex-col justify-center text-xl h-16 
        ${homePage?'bg-transparent':'bg-[#6a2c70]'}
         md:bg-none`}>
                {resumePage && 
                (<>
                    <div className="absolute w-[100vw] md:bg-[#6a2c70] h-16 border-b-[1px] top-0 -z-20"></div>
                    {/* <div className="absolute w-[50vw] top-0  md:bg-black md:bg-opacity-80 h-16 right-0">  */}
                    <div className="relative w-full h-full  justify-start items-center ml-4 hidden md:flex">
                        {/* <div className="text-sm text-white bg-blue-600 px-4 py-2 rounded-md cursor-pointer"
                        onClick={downloadPDF}>
                            Save PDF
                        </div> */}
                    </div> 
                    {/* </div> */}
                </>
                )}
                
                <div className={'px-4 md:px-16 py-6 flex items-center transition text-ms' }>
                <Link href="/" className="font-bold cursor-pointer">Resume<span className="text-blue-500">Genie</span></Link>
                <div className="flex-row ml-12 gap-7 hidden lg:flex text-sm">
                    <NavbarItem label="Templates" route="/templates"/>
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className=" text-sm">Browse</p>
                    <BsChevronDown className={`transition ${showMobileMenu?'rotate-180':'rotate-0'}`}/>
                    <MobileMenu visible={showMobileMenu} />
                </div>
                {user?
                    (
                    <div className="flex flex-row ml-auto gap-7 items-center">
                        <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                            
                            {user?.image? (
                                <div className="w-12 h-12 rounded-full  border-[2px] overflow-hidden bg-white">
                                    <Image width="40" height="40"
                                    className="h-12 w-12 object-cover rounded-full "
                                    src={user.image} alt="profileImage"/>
                                </div>
                            ):
                            (
                                <BsPersonFill size={30}/>
                            )}
                        
                        
                            <BsChevronDown className={`transition hover:scale-125 ${showAccountMenu?'rotate-180':'rotate-0'}`}/>
                        </div>
                        <AccountMenu visible={showAccountMenu}/>
                    </div>)
                :
                    <div className="flex flex-row ml-auto gap-8 items-center text-sm font-bold">
                        <Link href="/auth" className="cursor-pointer px-4 py-2 bg-white text-[#6a2c70] font-extralight rounded-[10px]">Login / SignUp</Link>

                    </div>
                }
                
            </div>
        </nav>
    )
}

export default Navbar;