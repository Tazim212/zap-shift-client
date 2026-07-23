import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {

    const axiosSecure = useAxiosSecure()

    const {data: payments = []} = useQuery({
        queryKey: ["payment"],
        queryFn: async() =>{
            const res = await axiosSecure.get("/payments",payments)
            return res.data;
        }
    })

    console.log(payments)
    return (
        <div>
            <h2 className="text-4xl font-bold my-3 px-12">Payment History</h2>
            <div className="overflow-x-auto">
                <table className="table w-5xl mx-10 my-4">
                    {/* head */}
                    <thead>
                        <tr className="bg-gray-600 text-gray-100">
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Recipient Email</th>
                            <th>Tracking Number</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        payments.map((payment, index) => 
                        <tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>{payment.parcelName}</td>
                            <td>{payment.customerEmail}</td>
                            <td>{payment.trackingId}</td>
                            <td>{payment.amount}</td>
                        </tr>
                        )
                       }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default PaymentHistory;