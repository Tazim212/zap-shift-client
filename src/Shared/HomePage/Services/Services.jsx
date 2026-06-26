import React from 'react'
import serviceImg from "../../../assets/service.png"
const Services = () => {
    const services = [
        {
            image: serviceImg,
            title: "Express  & Standard Delivery",
            prefers: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
        },
        {
            image: serviceImg,
            title: "Nationwide Delivery",
            prefers: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.in Dhaka within 4–6 hours from pick-up to drop-off."
        },
        {
            image: serviceImg,
            title: "Fulfillment Solution",
            prefers: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
        },
        {
            image: serviceImg,
            title: "Cash on Home Delivery",
            prefers: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
        },
        {
            image: serviceImg,
            title: "Corporate Service / Contract In Logistics",
            prefers: "Customized corporate services which includes warehouse and inventory management support."
        },
        {
            image: serviceImg,
            title: "Parcel Return",
            prefers: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
        },
    ]


    return (
        <div className='my-12 bg-secondary'>
            <div className='text-white pt-15 w-1/2 mx-auto'>
                <h1 className='text-3xl font-bold text-center'>Our Services</h1>
                <p className='py-3 text-center'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 py-6 mx-10'>
                {
                    services.map((service, index) =>

                        <div key={index} className="card bg-gray-300 w-80 shadow-lg rounded-xl hover:bg-info">
                            <figure className="px-10 pt-10">
                                <img
                                    src={service.image}
                                    alt="Shoes"
                                    className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{service.title}</h2>
                                <p>{service.prefers}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Services