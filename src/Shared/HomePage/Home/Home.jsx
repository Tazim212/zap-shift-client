import Banner from "../Banner/Banner";
import Partners from "../OurPartners/Partners";
import Priority from "../Priority/Priority";
import ServiceCard from "../ServiceCard/ServiceCard";
import Services from "../Services/Services";
import WorksToDo from "../WorksToDo/WorksToDo";

const Home = () =>{
    return(
        <div>
            <Banner></Banner>
            <WorksToDo></WorksToDo>
            <Services></Services>
            <Partners></Partners>
            <ServiceCard></ServiceCard>
            <Priority></Priority>
        </div>
    )
}
export default Home;