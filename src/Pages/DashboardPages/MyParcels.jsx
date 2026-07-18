import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MyParcels = () => {

    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

    const { data: parcels = [] } = useQuery({
        queryKey: ["myparcels", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myparcels?email=${user?.email}`)
            return res.data
        }
    })

    return (
        <div>
            Hello dashboards {parcels.length}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Weight</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    {
                        parcels.map((parcel, i) =>
                        <tr key={parcel._id} className="hover:bg-base-300">
                            <th>{i + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>{parcel.parcelWeight}</td>
                            <td>{parcel.createdAt}</td>
                            <td>{parcel.costs}</td>
                            <td>Pending</td>
                            <td className="space-x-2">
                                <Link className="btn btn-soft btn-success">Edit</Link>
                                <Link className="btn btn-soft btn-error">Delete</Link>
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