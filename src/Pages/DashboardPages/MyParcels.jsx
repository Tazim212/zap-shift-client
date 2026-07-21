import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyParcels = () => {

    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ["myparcels", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myparcels?email=${user?.email}`)
            return res.data
        }
    })

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
                                    <td>
                                        {
                                            status === "paid"
                                                ?
                                                "paid"
                                                :
                                                <Link to={`/dashboard/payment/${parcel._id}`}><button className="btn btn-primary text-black">Pay</button></Link>
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