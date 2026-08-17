import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";

const RiderRoute = ({ children }) => {
    const { role, isLoading } = useRole()

    if (isLoading) {
        return <div className="mt-48 text-center"><span className="loading loading-dots loading-xl text-center"></span></div>
    }
    if (role !== "rider") {
        return <Navigate to="/dashboard/forbidden-access"></Navigate>
    }
    return children;
}
export default RiderRoute;