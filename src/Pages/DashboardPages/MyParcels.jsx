import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useParams } from "react-router";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useRole from "../../hooks/useRole";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const MyParcels = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { role } = useRole()
    const [page, setPage] = useState(1)
    const queryClient = useQueryClient()

    const { data: parcels = [] } = useQuery({
        queryKey: ["myparcels", user?.email, page],
        enabled: role !== 'admin',
        queryFn: async () => {
            const res = await axiosSecure.get(`/myparcels?email=${user?.email}&page=${page}&limit=8`)
            console.log(res.data)
            return res.data
        }
    })
    const userParcel = parcels.result || []
    const userTotalPages = parcels.totalPages || 1

    const { data: allParcels = [] } = useQuery({
        queryKey: ["parcels", role, page],
        enabled: role === "admin",
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${role}?page=${page}&limit=8`)
            console.log(res.data)
            return res.data
        }
    })
    const allParcel = allParcels.result || []
    const adminTotalPages = allParcels.totalPages || 1

    const totalPages = role === "admin" ? adminTotalPages : userTotalPages
    // console.log(allParcels)
    const handlePayment = async (parcel) => {
        const info = {
            parcelId: parcel._id,
            costs: parcel.costs,
            parcelName: parcel.parcelName,
            senderEmail: parcel.senderEmail,
            trackingId: parcel.trackingId
        }
        const res = await axiosSecure.post('/create-checkout-session', info)
        window.location.assign(res.data.url)
    }

    const handleParcelDelete = id => {
        // console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed)
                axiosSecure.delete(`/myparcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            if (role === "admin") {
                                queryClient.invalidateQueries({
                                    queryKey: ["parcels", role]
                                })
                            }
                            else {
                                queryClient.invalidateQueries({
                                    queryKey: ["myparcels", user?.email],
                                })
                            }

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel has been deleted.",
                                icon: "success"
                            });

                        }

                    })

        });
    }

    return (
        <div>
            <Helmet>
                <title>Dashboard | My parcels</title>
            </Helmet>

            <h2>Hello dashboards {allParcels.length}</h2>
            {
                role === "admin" ?
                    <h2 className="text-2xl md:text-4xl font-bold my-4 mx-12 text-center md:text-justify">All Parcels</h2>
                    :
                    <h2 className="text-2xl md:text-4xl font-bold my-4 mx-12 text-center md:text-justify">My Parcels</h2>
            }

            <div className="overflow-x-auto">
                <table className="table w-2xl md:w-6xl mx-1 md:mx-4">
                    <thead>
                        <tr className="bg-gray-700 text-gray-100">
                            <th>#</th>
                            <th>Name</th>
                            <th>Weight</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Tracking Id</th>
                            <th>Delivery Status</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            role === "admin" &&
                            allParcel.map((parcel, i) =>
                                <tr key={parcel._id} className="hover:bg-base-300">
                                    <th>{(page - 1) * 8 + i + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.parcelWeight}</td>
                                    <td>{new Date(parcel.createdAt).toLocaleString()}</td>
                                    <td>{parcel.costs}</td>
                                    <td>
                                        <Link to={`/parcel-logs/${parcel.trackingId}`} className="cursor-pointer">{parcel.trackingId}</Link>
                                    </td>
                                    <td className="text-amber-600">{parcel.deliveryStatus}</td>
                                    <td>
                                        {
                                            parcel.paymentStatus === "paid" && <span className="text-md text-green-800 font-semibold">paid</span>
                                        }
                                    </td>
                                    <td className="space-x-2">
                                        <Link className="btn btn-soft btn-success">Edit</Link>
                                        <button onClick={() => handleParcelDelete(parcel._id)} className="btn btn-soft btn-error">Delete</button>
                                    </td>
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
                    <button onClick={() => setPage(totalPages)} className="btn">
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>

            {
                role === "user" &&
                <div className="overflow-x-auto">
                    <table className="table w-2xl md:w-6xl mx-1 md:mx-4">
                        <thead>
                            <tr className="bg-gray-700 text-gray-100">
                                <th>#</th>
                                <th>Name</th>
                                <th>Weight</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Tracking Id</th>
                                <th>Delivery Status</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userParcel.map((parcel, i) =>
                                    <tr key={parcel._id} className="hover:bg-base-300">
                                        <th>{(page - 1) * 8 + i + 1}</th>
                                        <td>{parcel.parcelName}</td>
                                        <td>{parcel.parcelWeight}</td>
                                        <td>{new Date(parcel.createdAt).toLocaleString()}</td>
                                        <td>{parcel.costs}</td>
                                        <td>
                                            <Link to={`/parcel-logs/${parcel.trackingId}`} className="cursor-pointer">{parcel.trackingId}</Link>
                                        </td>
                                        <td className="text-amber-600">{parcel.deliveryStatus}</td>
                                        <td>
                                            {
                                                parcel.paymentStatus === "paid"
                                                    ?
                                                    <span className="text-lg text-green-800 font-semibold">paid</span>
                                                    :
                                                    <Link><button onClick={() => handlePayment(parcel)} className="btn btn-primary text-black">Pay</button></Link>
                                            }
                                        </td>
                                        <td className="space-x-2">
                                            <Link className="btn btn-soft btn-success">Edit</Link>
                                            <button onClick={() => handleParcelDelete(parcel._id)} className="btn btn-soft btn-error">Delete</button>
                                        </td>
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
                        <button onClick={() => setPage(totalPages)} className="btn">
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
            }
        </div>

    )
}
export default MyParcels;
