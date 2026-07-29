import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()

    // specific user add krte hobe remember
    const {data: payments = []} = useQuery({
        queryKey: ["payment", user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <Helmet>
                <title>Dashboard | Payment History</title>
            </Helmet>
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
                            <td>$ {payment.amount}</td>
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