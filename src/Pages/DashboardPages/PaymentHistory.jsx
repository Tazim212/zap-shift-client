import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useRole from "../../hooks/useRole";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PaymentHistory = () => {
    const { user } = useAuth();
    const { role } = useRole()
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [allPayment, setAllPayment] = useState([])
    const axiosSecure = useAxiosSecure()

    // specific user add krte hobe remember
    const { data: payments = [] } = useQuery({
        queryKey: ["payment", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data;
        }
    })

    useEffect(() => {
        axiosSecure.get(`/all_payments?page=${page}&limit=8`)
            .then(res => {
                setAllPayment(res.data.result)
                setTotalPages(res.data.totalPages)
            })
    }, [page])

    return (
        <div>
            <Helmet>
                <title>Dashboard | Payment History</title>
            </Helmet>
            <h2 className="text-lg md:text-3xl text-center md:text-justify font-bold my-3 px-12">Payment History</h2>
            {
                role === "user" &&
                <div className="overflow-x-auto">
                    <table className="table w-2xl md:w-5xl mx-1 md:mx-10 my-2">
                        {/* head */}
                        <thead>
                            <tr className="bg-gray-600 text-gray-100">
                                <th>#</th>
                                <th>Parcel Name</th>
                                <th>Recipient Email</th>
                                <th>Tracking Number</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((payment, index) =>
                                    <tr key={payment._id}>
                                        <th>{index + 1}</th>
                                        <td>{payment.parcelName}</td>
                                        <td>{payment.customerEmail}</td>
                                        <td>{payment.trackingId}</td>
                                        <td>$ {payment.amount}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            }

            {
                role === "admin" &&
                <div className="overflow-x-auto">
                    <table className="table w-2xl md:w-5xl mx-1 md:mx-10 my-2">
                        <thead>
                            <tr className="bg-gray-600 text-gray-100">
                                <th>#</th>
                                <th>Parcel Name</th>
                                <th>Recipient Email</th>
                                <th>Tracking Number</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allPayment.map((payment, index) =>
                                    <tr key={payment._id}>
                                        <th>{(page - 1) * 8 + index + 1}</th>
                                        <td>{payment.parcelName}</td>
                                        <td>{payment.customerEmail}</td>
                                        <td>{payment.trackingId}</td>
                                        <td>$ {payment.amount}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="flex gap-2 justify-center mt-4">
                        <button onClick={() => setPage(1)} className="btn">
                            <IoIosArrowBack />
                        </button>
                        <button
                            className="btn btn-sm"
                            onClick={() => setPage((p) => p - 1)}
                            disabled={page === 1}
                        >
                            Prev
                        </button>

                        {[...Array(totalPages).keys()].map((n) => (
                            <button
                                key={n}
                                className={`btn btn-sm ${page === n + 1 ? "btn-primary" : ""}`}
                                onClick={() => setPage(n + 1)}
                            >
                                {n + 1}
                            </button>
                        ))}

                        <button
                            className="btn btn-sm"
                            onClick={() => setPage((p) => p + 1)}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                        <button onClick={() =>setPage(totalPages)} className="btn">
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
export default PaymentHistory;