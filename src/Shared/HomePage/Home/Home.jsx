import Banner from "../Banner/Banner";
import FAQ from "../FAQ/FAQ";
import Partners from "../OurPartners/Partners";
import Priority from "../Priority/Priority";
import Reviews from "../Reviews/Reviews";
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
            <Reviews></Reviews>
            <FAQ></FAQ>
        </div>
    )
}
export default Home;