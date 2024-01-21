import Navbar from "@/components/Navbar";
import Resume1 from "@/components/Resume1";
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
export default function resume1() {
  return (
    <div>
      <Navbar />
      <Resume1 />
    </div>
  )
}
