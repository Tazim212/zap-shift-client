import { Link, useParams } from "react-router"

const PaymentCancel = () => {
    return (
        <div className="text-center space-y-3">
            <h1 className="text-4xl mt-36">Payment has been cancelled.Please try again</h1>
            <Link to="/dashboard/myparcels" className="btn btn-primary text-black">Try again</Link>
        </div>
    )
}
export default PaymentCancel;