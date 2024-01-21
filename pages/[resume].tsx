
import { useRouter } from "next/router";

const resume = () => {
    const router = useRouter();
    const {resume} = router.query;
    if(resume==='resume1')
    return (  
        <div>
            {resume}
        </div>
    );
}
 
export default resume;