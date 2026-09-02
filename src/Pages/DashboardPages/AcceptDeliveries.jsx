import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AcceptDeliveries = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email, 'in_deliver'],
        queryFn: async () => {
            const res = await axiosSecure.get(`parcels/rider?riderEmail=${user?.email}&&deliveryStatus=in_deliver`)
            return res.data
        }
    })

    const handleAccept = parcel => {
        const statusInfo = { deliveryStatus: 'accepted' };
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider accepted your delivery`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handlePickedup = parcel => {
        const statusInfo = { deliveryStatus: 'picked_up' };
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider picked up your delivery`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDelivered = parcel => {
        const statusInfo = { deliveryStatus: 'delivered' };
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Parcel has been delivered`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <h2 className="text-4xl">Assign - {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-5xl mx-auto my-3">
                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Sender Name</th>
                            <th>Status</th>
                            <th>Confirmation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, i) =>
                                <tr key={parcel._id}>
                                    <td>{i + 1}</td>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.senderName}</td>
                                    {
                                        parcel.deliveryStatus === "in_deliver"
                                            ?
                                            <>
                                                <td>
                                                    <button onClick={() => handleAccept(parcel)} className="btn btn-accent">Accept</button>
                                                    <button className="btn btn-error ms-3">Reject</button>
                                                </td>
                                            </>
                                            :
                                            <td className="font-semibold">Accepted</td>
                                    }
                                    {
                                        parcel.deliveryStatus === "delivered" ?
                                            <td className="font-semibold">Delivered</td>
                                            :
                                            <>
                                                <td>
                                                    <button onClick={() => handlePickedup(parcel)} className="btn btn-accent">Mark as picked up</button>
                                                    <button onClick={() => handleDelivered(parcel)} className="btn btn-info ms-3">Mark as delivered</button>
                                                </td>
                                            </>
                                    }
                                </tr>
                            )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default AcceptDeliveries;