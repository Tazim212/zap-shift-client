import { useQuery } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import useAxiosSecure from "../../hooks/useAxiosSecure"

const CompletedDeliveries = () =>{
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email, 'delivered'],
        queryFn: async () => {
            const res = await axiosSecure.get(`parcels/rider?riderEmail=${user?.email}&&deliveryStatus=delivered`)
            return res.data
        }
    })

    const calculatePayment = parcel =>{
        if(parcel.senderDistrict === parcel.receiverDistrict){
            return parcel.costs * 0.8
        }
        else {
            return parcel.costs * 0.6
        }
    }

    return(
        <div>
            <h2>Completed Deliveried: {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-5xl mx-auto my-3">
                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>CreatedAt</th>
                            <th>Costs</th>
                            <th>Total Payout</th>
                            <th>Action</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, i) =>
                                <tr key={parcel._id}>
                                    <td>{i + 1}</td>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.createdAt}</td>
                                    <td>{parcel.costs}</td>
                                    <td>{calculatePayment(parcel)}</td>
                                    <td>
                                        <button className="btn btn-primary text-black">Cashout</button>
                                    </td>
                                </tr>
                            )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default CompletedDeliveries