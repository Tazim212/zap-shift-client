import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

const UserManagement = () => {
    const axiosSecure = useAxiosSecure()
    const [page, setPage] = useState(1)

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users", page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${page}&limit=5`)
            return res.data;
        }
    })

    const allUsers = users.result || []
    const totalPages = users.totalPages || 1;

    const handleMakeAdmin = (user) => {
        const roleInfo = { role: "admin" };
        axiosSecure.patch(`/users/${user?.email}/role`, roleInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} has been made as an admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleRemoveAdmin = (user) => {
        const roleInfo = { role: "user" };

        Swal.fire({
            title: `Are you sure you want remove ${user?.name} from admin?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove!"
        }).then((result) => {
            if (result.isConfirmed)
                axiosSecure.patch(`/users/${user?.email}/role`, roleInfo)
                    .then(() => {
                        refetch()
                        Swal.fire({
                            title: "Removed!",
                            text: `${user?.name} has been removed from admin`,
                            icon: "success"
                        });
                    })
        });
    }

    return (
        <div>
            <Helmet>
                <title>Dashboard | User Management</title>
            </Helmet>
            <h2 className="text-lg md:text-3xl font-bold text-center py-3">Users Management </h2>

            <div className="overflow-x-auto">
                <table className="table w-2xl md:w-5xl mx-1 md:mx-8">
                    <thead className="bg-gray-500 text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((user, i) =>
                                <tr key={user._id}>
                                    <td>{(page - 1) * 5 + i + 1}</td>
                                    <td>
                                        <div className="avatar flex items-center gap-2">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                            <h3>{user.name}</h3>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td className={`${user.role === "admin" ? "text-green-400" : "text-black"} font-semibold`}>{user.role}</td>
                                    <td>
                                        {user.role === "admin" ?
                                            <button onClick={() => handleRemoveAdmin(user)} className="btn bg-red-600"><IoPersonRemove /></button>
                                            :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn bg-green-400"><FaUserShield /></button>
                                        }
                                    </td>
                                </tr>
                            )
                        }

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
export default UserManagement;