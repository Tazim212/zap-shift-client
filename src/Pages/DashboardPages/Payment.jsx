import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Payment = () =>{
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()

     const { data: parcel = [], isLoading } = useQuery({
        queryKey: ["parcel", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/${id}`)
            return res.data;
        }
    })

    const handlePayment = async() => {
            const info = {
                parcelId: parcel._id,
                costs: parcel.costs,
                parcelName: parcel.parcelName,
                senderEmail: parcel.senderEmail
            }
            const res = await axiosSecure.post('/create-checkout-session', info)
            console.log(res.data)
            window.location.assign(res.data.url)
            // console.log(info)
        }

    return(
        <div className="text-center mt-36 space-y-3">
            <h1 className="font-bold text-2xl">Parcel Name: {parcel.parcelName}</h1>
            <button onClick={handlePayment} className="btn btn-primary text-black w-28">Pay</button>
        </div>
    )
}
export default Payment