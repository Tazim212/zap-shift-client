import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";

const ApproveRider = () => {

    const axiosSecure = useAxiosSecure()

    const { user } = useAuth()

    const { data: riders = [] } = useQuery({
        queryKey: ["riders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders")
            return res.data;
        }
    })

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
                                    <td>{rider.status}</td>
                                    <td>
                                        <button className="btn"><FaUserCheck /></button>
                                        <button className="btn"><IoPersonRemove /></button>
                                        <button className="btn"><FaTrashAlt /></button>
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