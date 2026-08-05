import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useParams } from "react-router";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useRole from "../../hooks/useRole";

const MyParcels = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { role } = useRole()

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ["myparcels", user?.email],
        enabled: role !== 'admin',
        queryFn: async () => {
            const res = await axiosSecure.get(`/myparcels?email=${user?.email}`)
            return res.data
        }
    })
    const { data: allParcels = [] } = useQuery({
        queryKey: ["parcels", role],
        enabled: role === "admin",
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${role}`)
            return res.data
        }
    })


    const handlePayment = async (parcel) => {
        const info = {
            parcelId: parcel._id,
            costs: parcel.costs,
            parcelName: parcel.parcelName,
            senderEmail: parcel.senderEmail
        }
        const res = await axiosSecure.post('/create-checkout-session', info)
        // console.log(res.data)
        window.location.assign(res.data.url)
        // console.log(info)
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
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your parcel has been deleted.",
                            icon: "success"
                        });
                    })
        });
    }

    return (
        <div>
            <Helmet>
                <title>Dashboard | My parcels</title>
            </Helmet>

            <h2>Hello dashboards {allParcels.length}</h2>
            <h2 className="text-4xl font-bold my-4 mx-12">My Parcels</h2>
            <div className="overflow-x-auto">
                <table className="table w-6xl mx-4">
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
                            role === "admin" ?
                                allParcels.map((parcel, i) =>
                                    <tr key={parcel._id} className="hover:bg-base-300">
                                        <th>{i + 1}</th>
                                        <td>{parcel.parcelName}</td>
                                        <td>{parcel.parcelWeight}</td>
                                        <td>{parcel.createdAt}</td>
                                        <td>{parcel.costs}</td>
                                        <td>{parcel.trackingId}</td>
                                        <td className="text-amber-600">{parcel.deliveryStatus}</td>
                                        <td className="space-x-2">
                                            <Link className="btn btn-soft btn-success">Edit</Link>
                                            <button onClick={() => handleParcelDelete(parcel._id)} className="btn btn-soft btn-error">Delete</button>
                                        </td>
                                    </tr>)
                                :
                                parcels.map((parcel, i) =>
                                    <tr key={parcel._id} className="hover:bg-base-300">
                                        <th>{i + 1}</th>
                                        <td>{parcel.parcelName}</td>
                                        <td>{parcel.parcelWeight}</td>
                                        <td>{parcel.createdAt}</td>
                                        <td>{parcel.costs}</td>
                                        <td>{parcel.trackingId}</td>
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
                                    </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default MyParcels;