
import Resume from "@/components/Resume";
import { useRouter } from "next/router";

const resume = () => {
    const router = useRouter();
    const {resume} = router.query;
    return (  
        <div className="text-black">
            <Resume resumeName={resume as string}/>
        </div>
    );
}
 
export default resume;