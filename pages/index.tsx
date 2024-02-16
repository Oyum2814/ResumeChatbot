import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

// export async function getServerSideProps(context: NextPageContext){
//   const session = await getSession(context);

//   if(!session){
//     return {
//       redirect:{
//         destination:'/auth',
//         permanent:false,
//       }
//     }
//   }

//   return {
//     props:{}
//   }
// }
export default function Home() {
  return (
    <div className="hero-bg">
      <Navbar homePage/>
      <Hero />
    </div>
  )
}
