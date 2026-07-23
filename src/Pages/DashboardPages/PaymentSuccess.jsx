import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const [paymentInfo, setPaymentInfo] = useState({})
    const axiosSecure = useAxiosSecure()

    const session_id = searchParams.get("session_id")

    useEffect(() => {
        if (session_id) {
            axiosSecure.patch(`/payment-success?session_id=${session_id}`)
                .then(res => {
                    console.log(res.data)
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                })
        }
    }, [session_id])
    
    return (
        <div>
            <h2 className="text-4xl text-center mt-36">Payment done Successfully</h2>
            <div className="text-center my-4 font-semibold">
                <p>Your transactionId is: {paymentInfo.transactionId}</p>
                <p>Your trackingId is: {paymentInfo.trackingId}</p>
            </div>
        </div>
    )
}
export default PaymentSuccess;