import img from "../../../assets/bookingIcon.png"

const WorksToDo = () => {
    return (
        <div className="mb-12">
            <h1 className="text-3xl py-5 font-bold text-center mb-4 text-secondary">How It Works</h1>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-15 mx-25 md:mx-0">

                <div className="card bg-gray-300 w-61 shadow-lg rounded-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src={img}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Booking Pick & Drop</h2>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>

                <div className="card bg-gray-300 w-61 shadow-lg rounded-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src={img}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Cash On Delivery</h2>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>

                <div className="card bg-gray-300 w-61 shadow-lg rounded-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src={img}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Delivery Hub</h2>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>
                
                <div className="card bg-gray-300 w-61 shadow-lg rounded-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src={img}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Booking SME & Corporate</h2>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>
            </section>

        </div>
    )
}
export default WorksToDo;