import { useEffect, useRef, useState } from "react";
import Banner from "../Banner/Banner";
import FAQ from "../FAQ/FAQ";
import Partners from "../OurPartners/Partners";
import Priority from "../Priority/Priority";
import Reviews from "../Reviews/Reviews";
import ServiceCard from "../ServiceCard/ServiceCard";
import Services from "../Services/Services";
import WorksToDo from "../WorksToDo/WorksToDo";

const Home = () => {
        const topRef = useRef(null);
        const [showButton, setShowButton] = useState(false);

        useEffect(() => {
            const handleScroll = () => {
                if (window.scrollY > 400) {
                    setShowButton(true);
                } else {
                    setShowButton(false);
                }
            };

            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }, []);

        const scrollToTop = () => {
            topRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    };

    return (
        <div>
            <>
                <div ref={topRef}></div>

                {showButton && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 z-50 h-12 w-12 cursor-pointer rounded-full bg-cyan-600 text-white text-xl shadow-lg hover:translate-y-0.5"
                    >
                        ↑
                    </button>
                )}
            </>
            
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




