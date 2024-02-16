import Breadcrumbs from "@/components/Breadcrumbs";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import TemplateList from "@/components/TemplateList";
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

export default function templates() {
    return (
      <>
      <Navbar />
      <div className="template-bg w-screen h-screen flex flex-col justify-center items-center">
        <Breadcrumbs template/>
        <TemplateList />
      </div>
      </>
    )
  }