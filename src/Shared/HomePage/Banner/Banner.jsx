import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/banner/banner1.png"
import banner2 from "../../../assets/banner/banner2.png"
import banner3 from "../../../assets/banner/banner3.png"
import { MdArrowOutward } from "react-icons/md";

const Banner = () => {
    return (
        <div>
            <Carousel autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={banner1} />
                    <div className="flex items-center gap-1 absolute ps-20 top-104">
                        <button className="btn btn-primary flex items-center">Track Your Percel</button>
                        <span className="bg-secondary text-white text-3xl rounded-full"><MdArrowOutward></MdArrowOutward></span>
                        <button className="btn btn-outline btn-secondary">Be A Rider</button>
                    </div>
                </div>
                <div>
                    <img src={banner2} />
                    <div className="flex items-center gap-1 absolute ps-20 top-103">
                        <button className="btn btn-primary flex items-center">Track Your Person</button>
                        <span className="bg-secondary text-white text-3xl rounded-full"><MdArrowOutward></MdArrowOutward></span>
                        <button className="btn btn-outline btn-secondary">Be A Rider</button>
                    </div>
                </div>
                <div>
                    <img src={banner3} />
                    <div className="flex items-center gap-1 absolute ps-20 top-98">
                        <button className="btn btn-primary flex items-center">Track Your Person</button>
                        <span className="bg-secondary text-white text-3xl rounded-full"><MdArrowOutward></MdArrowOutward></span>
                        <button className="btn btn-outline btn-secondary">Be A Rider</button>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}
export default Banner;