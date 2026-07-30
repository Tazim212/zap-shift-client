import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRider = () => {

    const axiosSecure = useAxiosSecure()

    const { user } = useAuth()

    const { data: riders = [], refetch } = useQuery({
        queryKey: ["riders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders")
            return res.data;
        }
    })

    const updateRiderInfo = (id, status) => {
        axiosSecure.patch(`/riders/${id}?status=${status}`)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Your application has been ${status}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleAccept = (id) => {
        updateRiderInfo(id, "Accepted")
    }
    const handleReject = (id) => {
        updateRiderInfo(id, "Rejected")
    }

    const handleRiderDelet = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete the rider?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed)
                axiosSecure.delete(`/riders/${id}`)
                    .then(res => {
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "THe rider application has been deleted.",
                            icon: "success"
                        });
                    })
        });
    }

    return (
        <div>
            Ridersa are: {riders.length}

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, indes) =>
                                <tr key={rider._id}>
                                    <th>{indes + 1}</th>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.district}</td>
                                    <td className={`${rider.status === "Accepted" ? "text-green-500" : "text-red-600"}`}>{rider.status}</td>
                                    <td>
                                        <button onClick={() => handleAccept(rider._id)} className="btn"><FaUserCheck /></button>
                                        <button onClick={() => handleReject(rider._id)} className="btn"><IoPersonRemove /></button>
                                        <button onClick={() => handleRiderDelet(rider._id)} className="btn btn-error"><FaTrashAlt /></button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ApproveRider;