import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaEye, FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useRef, useState } from "react";

const ApproveRider = () => {

    const axiosSecure = useAxiosSecure()
    const [selectedRider, setSelectedRider] = useState([])
    const { user } = useAuth()
    const riderRef = useRef()

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

    const riderModal = (rider) =>{
        setSelectedRider(rider)
        riderRef.current.showModal()
    }

    return (
        <div>
            <Helmet>
                <title>Dashboard | Approve Riders</title>
            </Helmet>
            <h2 className="text-3xl font-semibold text-center">Riders Number: {riders.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-5xl mx-10 my-3">
                    {/* head */}
                    <thead className="bg-gray-500 text-gray-100">
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
                            riders.map((rider, index) =>
                                <tr key={rider._id}>
                                    <th>{index + 1}</th>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.district}</td>
                                    <td className={`${rider.status === "Accepted" ? "text-green-500" : "text-red-600"}`}>{rider.status}</td>
                                    <td className="space-x-2">
                                        <button
                                            onClick={() => riderModal(rider)}
                                            className="btn"><FaEye />
                                        </button>
                                        <button
                                            onClick={() => handleAccept(rider._id)}
                                            className="btn">
                                            <FaUserCheck />
                                        </button>
                                        <button
                                            onClick={() => handleReject(rider._id)}
                                            className="btn">
                                            <IoPersonRemove />
                                        </button>
                                        <button
                                            onClick={() => handleRiderDelet(rider._id)}
                                            className="btn text-red-500">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>

                            )
                        }

                    </tbody>
                </table>

                <dialog ref={riderRef} className="modal">
                    <div className="modal-box bg-gray-500 opacity-90">
                        <div className="card bg-cyan-800 text-gray-200 w-full shadow-sm">
                            <figure>
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    className="w-98 h-75 pt-3"
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2>
                                    <span className="font-bold text-md">Applicant Name:</span> {selectedRider.name}
                                    <div className="badge badge-secondary ms-5">ID:{selectedRider._id}</div>
                                </h2>
                                <p><span className="font-bold text-md">License No: </span>{selectedRider.license}</p>
                                <p><span className="font-bold text-md">Region: </span>{selectedRider.region}</p>
                                <p><span className="font-bold text-md">District: </span>{selectedRider.district}</p>
                                <p><span className="font-bold text-md">National ID: </span>{selectedRider.nid}</p>
                                <p><span className="font-bold text-md">Phone No: </span>{selectedRider.phoneNumber}</p>
                                <p><span className="font-bold text-md">Registration No: </span>{selectedRider.regNumber}</p>
                            </div>
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
export default ApproveRider;