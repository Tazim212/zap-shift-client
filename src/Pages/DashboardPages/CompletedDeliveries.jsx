import { useQuery } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const CompletedDeliveries = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [page, setPage] = useState(1)

    const { data: parcel = [] } = useQuery({
        queryKey: ['parcels', user?.email, 'delivered'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user?.email}&&deliveryStatus=delivered&page=${page}&limit=5`)
            console.log(res.data)
            return res.data
        }
    })

    const parcels = parcel.result || []
    const totalPages = parcel.totalPages || 1

    const calculatePayment = parcel => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.costs * 0.8
        }
        else {
            return parcel.costs * 0.6
        }
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-2xl md:w-5xl mx-1 md:mx-auto my-3">
                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>CreatedAt</th>
                            <th>Costs</th>
                            <th>Total Payout</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, i) =>
                                <tr key={parcel._id}>
                                    <td>{(page - 1) * 5 + i + 1}</td>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.createdAt}</td>
                                    <td>{parcel.costs}</td>
                                    <td>{calculatePayment(parcel)}</td>
                                    <td>
                                        <button className="btn btn-primary text-black">Cashout</button>
                                    </td>
                                </tr>
                            )}

                    </tbody>
                </table>
            </div>
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
                <button onClick={() => setPage(totalPages)} className="btn">
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    )
}
export default CompletedDeliveries