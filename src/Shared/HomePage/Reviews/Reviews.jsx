import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { use } from 'react';
import reviewIcon from "../../../assets/reviewer.png"

const reviewData = fetch("/review.json").then(res => res.json())

const Reviews = () => {

    const reviews = use(reviewData)

    console.log(reviews)
    return (
        <div className='my-7'>
            <div className='py-7 w-2/3 md:w-1/2 mx-auto'>
                <h1 className='text-3xl font-bold pb-3 text-center'>What Our Customers Saying</h1>
                <p className='text-center'>Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                    Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                loop={true}
                centeredSlides={true}
                slidesPerView={3}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper h-80 w-full"
            >
                {
                    reviews.map((review, index) =>
                        <SwiperSlide key={index}>
                            <div key={index} className="card bg-secondary text-white w-80 shadow-2xl">
                                <figure>
                                    <img
                                        src={review.image}
                                        className='py-1.5'
                                        alt="Shoes" />
                                </figure>
                                <p className='text-ellipsis px-2'>{review.review}</p>

                                <div className="flex items-center gap-2 py-3 px-2">
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={reviewIcon} />

                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg">{review.name}</h2>
                                        <span>{review.occupation}</span>
                                    </div>

                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }

            </Swiper>
        </div>
    )
}
export default Reviews;