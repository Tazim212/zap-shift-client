import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UserManagement = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
        const roleInfo = { role: "admin" };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
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
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
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
            <h2 className="3xl">Users Management </h2>

            <div className="overflow-x-auto">
                <table className="table w-5xl mx-8">
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
                            users.map((user, i) =>
                                <tr key={user._id}>
                                    <td>{i + 1}</td>
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
        </div>
    )
}
export default UserManagement;