import trackingImg from '../../../assets/live-tracking.png'
import deliveryImg1 from '../../../assets/safe-delivery.png'
import deliveryImg2 from '../../../assets/safe-delivery.png'

const ServiceCard = () => {
    return (
        <div className="my-7">
            <span className="border-x-2 w-full border-dashed"></span>

            <div className="card card-side bg-gray-300 py-4 my-9 shadow-sm px-3">
                <figure>
                    <img
                        src={trackingImg}
                        className='w-43'
                        alt="Movie" />
                </figure>
                <div className="divider lg:divider-horizontal"></div>
                <div className="card-body">
                    <h2 className="font-bold text-xl">Live Parcel Tracking</h2>
                    <p>Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery,
                        monitor your shipment's journey and get instant status updates for complete peace of mind..</p>
                </div>
            </div>

            <div className="card card-side bg-gray-300 py-4 my-9 shadow-sm px-3">
                <figure>
                    <img
                        src={deliveryImg1}
                        className='w-43'
                        alt="Movie" />
                </figure>
                <div className="divider lg:divider-horizontal"></div>
                <div className="card-body">
                    <h2 className="font-bold text-xl">100% Safe Delivery</h2>
                    <p>We ensure your parcels are handled with the utmost care and delivered securely to their destination.
                        Our reliable process guarantees safe and damage-free delivery every time.</p>
                </div>
            </div>

            <div className="card card-side bg-gray-300 py-4 my-9 shadow-sm px-3">
                <figure>
                    <img
                        src={deliveryImg2}
                        className='w-36'
                        alt="Movie" />
                </figure>
                <div className="divider lg:divider-horizontal"></div>
                <div className="card-body">
                    <h2 className="font-bold text-xl">24/7 Call Center Support!</h2>
                    <p>Our dedicated support team is available around the clock
                        to assist you with any questions, updates, or delivery concerns—anytime you need us.</p>
                </div>
            </div>
        </div>
    )
}
export default ServiceCard;