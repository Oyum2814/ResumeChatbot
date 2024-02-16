import {useState, useCallback, useEffect} from "react";
import Input from "../components/Input";
import axios from 'axios';
import {getSession, signIn} from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';
import Image from 'next/image'
import asset1 from '@/public/assets/login/asset1.png'
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
const Auth = ()=>{

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [variant, setVariant] = useState('login');
    const toggleVariant = useCallback(()=>{
        setVariant((currentVariant)=>currentVariant==='login'?'register':'login');
    },[]);

    const login = useCallback(async()=>{
        try{
            const res = await signIn('credentials',{email, password, redirect:false});

            if (res?.error) {
                toast.error("Wrong Credentials");
            } else {
                router.push('/templates');
            }
    
        } catch(error){
            toast.error('Wrong Credentials');
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
    
    useEffect(() => {
        
        // Check if user is already authenticated
        const checkAuth = async () => {
          const session = await getSession();
          if (session) {
            // If user is authenticated, redirect to home page
            router.replace("/");
          }
        };    
        checkAuth();
    }, []);   
    

    return(
        <div className="relative h-screen w-screen hero-bg overflow-x-hidden">
            <Navbar />
            <div className='h-screen w-screen flex flex-col md:flex-row  justify-center items-center '>
                <div className="rounded-[10px]  opacity-0.6 hero-card w-[80%] h-[80%] md:h-[70%]
                flex flex-col md:flex-row justify-center items-center">
                    <div className="w-[70%] h-auto md:w-[50%] md:h-full flex justify-center items-center">
                        <Image src={asset1} alt=""
                        width={552} height={366}/>
                    </div>
                    <div className="md:w-[30%] flex flex-col justify-center items-start md:ml-12 ">
                        <h2 className="text-white mt-8 md:mt-0 manrope mx-auto text-center md:text-left text-[16px] font-[700]">
                                {variant==='login'?'Login':'Register'}
                        </h2>
                        <div className="flex flex-col gap-4 mt-4 w-full">
                            {variant==='register'&&(
                                <Input 
                                label="Name"
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
                            {variant==='register' &&(
                                <Input label="Confirm Password" 
                                id="confirmpassword"
                                type="password" />
                            )}

                        </div>
                        <button onClick={variant==='login'?login:register}
                        className="cursor-pointer px-4 py-2 bg-white text-[#6a2c70] font-extralight rounded-[10px] manrope
                        mt-4 mx-auto">
                            {variant==='login'?'Login':'Register'}
                        </button>
                        <div className="text-white mt-4 text-[11px] w-full text-center manrope">
                            {variant==='login'?'New to Resume Genie?':'Already have an account?'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant==='login'?'Create Account':'Login'}
                            </span>
                            <div className="mt-2">
                                Or {variant} With
                            </div>
                            <div className="flex items-center gap-3 justify-center mt-2">
                                <div onClick={(e)=>{
                                    e.preventDefault();
                                    signIn('google',{callbackUrl:'/templates'});
                                    }} 
                                    className="cursor-pointer">
                                    <FcGoogle size={26}/>

                                </div>
                                <div onClick={()=>signIn('github',{callbackUrl:'/templates'})}
                                className="cursor-pointer">
                                    <FaGithub size={26}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <div className="flex flex-col justify-center w-full h-full ">
               <div className="flex flex-col xl:flex-row justify-between items-center px-4 text-black ">
                    <div className="w-[60%] flex-col justify-center md:ml-[80px] hidden xl:flex">
                        <Image src={logo}
                        className=""
                        alt="Logo"
                        height={320} width={240}/>
                        <h2 className="text-5xl font-bold">Resume<span className="text-blue-600">Genie</span></h2>
                        <p className="mt-4 max-w-[70%]">Resume Genie is an Online platform which helps you create a resume via conversation with a Chatbot.
                        Choose from multiple templates from our site and build your resume today in 10 minutes!</p>
                    </div>
                    <div className="p-16 self-center rounded-[20px] 
                    xl:w-[30%]  xl:mr-[80px] my-auto">
                        <h2 className=" text-4xl mb-8 font-semibold text-neutral-700 ">
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
                            
                        </div>
                        <p className="text-neutral-500 mt-12 text-center">
                            {variant==='login'?'New Here?':'Already have an account?'}
                            <span onClick={toggleVariant} className="text-black ml-1 hover:underline cursor-pointer">
                                {variant==='login'?'Create Account':'Login'}
                            </span>
                        </p>
                    </div>
               </div>
            </div> */}
        </div>
    );
}

export default Auth;