import Breadcrumbs from "@/components/Breadcrumbs";
import Resume from "@/components/Resume";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

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

const ResumePage = () => {
    const router = useRouter();
    const {resume} = router.query;
    return (  
        <div className="text-black">
            <Breadcrumbs resume resumeName={resume as string}/>
            <Resume resumeName={resume as string}/>
        </div>
    );
}
 
export default ResumePage;