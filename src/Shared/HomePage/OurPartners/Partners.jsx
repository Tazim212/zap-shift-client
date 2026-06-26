import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import img1 from "../../../assets/brands/amazon.png"
import img2 from "../../../assets/brands/amazon_vector.png"
import img3 from "../../../assets/brands/casio.png"
import img4 from "../../../assets/brands/moonstar.png"
import img5 from "../../../assets/brands/randstad.png"
import img6 from "../../../assets/brands/star.png"
import img7 from "../../../assets/brands/start_people.png"
import { Autoplay } from 'swiper/modules';



const Partners = () => {
    const partners = [img1, img2, img3, img4, img5, img6, img7]

    return (
        <Swiper
            slidesPerView={4}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
                delay: 900,
                disableOnInteraction: false,
            }}
            className="mySwiper my-9"
        >
            {
                partners.map((partner, index) =>
                    <SwiperSlide key={index}>
                        <img src={partner} alt="" />
                    </SwiperSlide>
                )
            }
        </Swiper>
    )
}
export default Partners;