import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const AssignRider = () => {

    const axiosSecure = useAxiosSecure()
    const riderRef = useRef()
    const [selectedParcel, setSelectedParcel] = useState(null)

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', "pending-pickup"],
        queryFn: async () => {
            const res = await axiosSecure.get("/myparcels?deliveryStatus=pending-pickup")
            return res.data;
        }
    })

    const { data: riders = [] } = useQuery({
        queryKey: ["riders", selectedParcel?.senderDistrict, "Accepted", "available"],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?district=${selectedParcel?.senderDistrict}&status=Accepted&workStatus=available`)
            return res.data;
        }
    })

    const riderModal = (parcel) => {
        setSelectedParcel(parcel)
        riderRef.current.showModal()
    }

    const handleAssign = (rider) => {
        const riderInfo = {
            riderId: rider._id,
            riderName: rider.name,
            riderEmail: rider.email,
            parcelId: selectedParcel._id
        }

        axiosSecure.patch(`/parcel/${selectedParcel._id}`, riderInfo)
            .then(res => {
                refetch()
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider has been assigned`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <h2>Parcels are: {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table w-5xl mx-8">
                    <thead className="bg-gray-500 text-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Sender Name</th>
                            <th>Sender District</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, i) =>
                                <tr key={parcel._id}>
                                    <td>{i + 1}</td>
                                    <td>{parcel.senderName}</td>
                                    <td>{parcel.senderDistrict}</td>
                                    <td>{parcel.deliveryStatus}</td>
                                    <td>
                                        <button onClick={() => riderModal(parcel)} className="btn btn-primary">FInd Riders</button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>

                <dialog ref={riderRef} className="modal">
                    <div className="modal-box opacity-90 max-w-4xl">
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead className="bg-gray-500 text-gray-200">
                                    <tr>
                                        <th></th>
                                        <th>Rider Name</th>
                                        <th>Rider Phone Number</th>
                                        <th>WorkStatus</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        riders.map((rider, i) =>
                                            <tr key={rider._id}>
                                                <td>{i + 1}</td>
                                                <td>{rider.name}</td>
                                                <td>{rider.phoneNumber}</td>
                                                <td>{rider.workStatus}</td>
                                                <td>
                                                    <button onClick={() => handleAssign(rider)} className="btn btn-primary text-black">Assign</button>
                                                </td>
                                            </tr>
                                        )

                                    }

                                </tbody>
                            </table>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    )
}
export default AssignRider;