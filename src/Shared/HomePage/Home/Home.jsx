import Banner from "../Banner/Banner";
import Partners from "../OurPartners/Partners";
import Services from "../Services/Services";
import WorksToDo from "../WorksToDo/WorksToDo";

const Home = () =>{
    return(
        <div>
            <Banner></Banner>
            <WorksToDo></WorksToDo>
            <Services></Services>
            <Partners></Partners>
        </div>
    )
}
export default Home;