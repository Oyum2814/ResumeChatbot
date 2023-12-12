import {useState, useCallback} from "react";
import Input from "../components/Input";
import axios from 'axios';
import {signIn} from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';
import Image from 'next/image'
import logo from '@/public/assets/logo.png'
const Auth = ()=>{

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(()=>{
        setVariant((currentVariant)=>currentVariant==='login'?'register':'login');
    },[]);

    const login = useCallback(async()=>{
        try{
            const res = await signIn('credentials',{email, password, callbackUrl:'/'});
            if (res?.error) { console.log("Error  - ",res.error); }
        } catch(error){
            console.log(error);
        }
    },[email, password]);

    const register = useCallback(async ()=>{
        try{
            const res= await axios.post('/api/register',{email, name, password});
            login();
        } catch(error) {
            console.log(error);
        }
    },[email, name, password,login]);

    

    return(
        <div className="relative h-screen w-screen bg-[#F9FEEA] overflow-x-hidden">
            <div className="flex flex-col justify-center w-full h-full ">
               <div className="flex flex-col xl:flex-row justify-between items-center px-4 text-black ">
                    <div className="w-[60%] flex-col justify-center md:ml-[80px] hidden xl:flex">
                        <Image src={logo}
                        className="md:ml-[80px]"
                        alt="Logo"
                        height={160} width={120}/>
                        <h2 className="text-5xl font-bold">Resume<span className="text-blue-600">Genie</span></h2>
                        <p className="mt-4 max-w-[70%]">Resume Genie is an Online platform which helps you create a resume via conversation with a Chatbot.
                        Choose from multiple templates from our site and build your resume today in 10 minutes!</p>
                    </div>
                    <div className="bg-[#1F7A56]/20 border-[4px] border-[#19CC85]/60  p-16 self-center rounded-[20px] 
                    xl:w-[30%]  xl:mr-[80px] my-auto">
                        <h2 className=" text-4xl mb-8 font-semibold">
                            {variant==='login'?'Sign In':'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant==='register'&&(
                                <Input 
                                label="Username"
                                onChange={(e:any)=>setName(e.target.value)}
                                id="name"
                                value={name}
                            />
                            )}
                            
                            <Input 
                                label="Email"
                                onChange={(e:any)=>setEmail(e.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input 
                                label="Password"
                                onChange={(e:any)=>setPassword(e.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={variant==='login'?login:register} className="bg-[#4FB0C6]/80 py-3 text-white font-medium rounded-md w-full mt-10
                        hover:bg-[#4FB0C6] transition-">
                            {variant==='login'?'Login':'Sign Up'}
                        </button>
                        <div className="flex items-center gap-4 mt-8 justify-center">
                            <div onClick={(e)=>{
                                e.preventDefault();
                                signIn('google',{callbackUrl:'/'});
                                }} className=" xs:bg-blue-400 border-[1px] border-black w-15 h-15 flex items-center p-2 justify-center cursor-pointer
                                hover:bg-neutral-200 transition rounded-full">
                                <FcGoogle size={30}/>

                            </div>
                            <div onClick={()=>signIn('github',{callbackUrl:'/'})} className="border-[1px]
                             border-black w-15 h-15 p-2 flex items-center justify-center cursor-pointer
                             hover:bg-neutral-200 transition rounded-full">
                                <FaGithub size={30}/>
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12 text-center">
                            {variant==='login'?'New Here?':'Already have an account?'}
                            <span onClick={toggleVariant} className="text-black ml-1 hover:underline cursor-pointer">
                                {variant==='login'?'Create Account':'Login'}
                            </span>
                        </p>
                    </div>
               </div>
            </div>
        </div>
    );
}

export default Auth;