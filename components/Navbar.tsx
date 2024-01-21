import Image from 'next/image';
import {BsChevronDown,BsSearch,BsBell} from 'react-icons/bs';
import {useState,useCallback,useEffect} from 'react';
import AccountMenu from './AccountMenu';
import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import useCurrentUser from '@/hooks/useCurrentUser';
import { BsPersonFill } from "react-icons/bs";
import Link from 'next/link';

const TOP_OFFSET=66;

const Navbar = ()=>{
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

    

    return (
        <nav className="w-full fixed z-40 text-black flex flex-col justify-center text-xl">
                <div className="absolute">  </div>
                <div className={'px-4 md:px-16 py-6 flex items-center transition' }>
                <div className="font-bold">Resume<span className="text-blue-600">Genie</span></div>
                <div className="flex-row ml-12 gap-7 hidden lg:flex">
                    <NavbarItem label="Home" route="/"/>
                    <NavbarItem label="Templates" route="/templates"/>
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className=" text-sm">Browse</p>
                    <BsChevronDown className={`transition ${showMobileMenu?'rotate-180':'rotate-0'}`}/>
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        
                        {user?.image? (
                            <div className="w-12 h-12 rounded-full border border-[2px] overflow-hidden bg-white">
                                <Image width="40" height="40"
                                className="h-12 w-12 object-contain rounded-full "
                                src={user.image} alt="profileImage"/>
                            </div>
                        ):
                        (
                            <BsPersonFill size={45}/>
                        )}
                       
                      
                        <BsChevronDown className={`transition hover:scale-125 ${showAccountMenu?'rotate-180':'rotate-0'}`}/>
                    </div>
                    <AccountMenu visible={showAccountMenu}/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;