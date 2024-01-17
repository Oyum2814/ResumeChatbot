import Navbar from "@/components/Navbar";
import Resume from "@/components/Resume";
import Resume2 from "@/components/Resume2";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  if(!session){
    return {
      redirect:{
        destination:'/auth',
        permanent:false,
      }
    }
  }

  return {
    props:{}
  }
}
export default function resume() {
  return (
    <div>
      <Navbar />
      <Resume2 />
    </div>
  )
}
