import { Navigate, useNavigate } from "react-router"
import useRole from "../../hooks/useRole"

const AdminRoute = ({ children }) => {
    const { role, isLoading } = useRole()

    if (isLoading) {
        return <div className="mt-48 text-center"><span className="loading loading-dots loading-xl text-center"></span></div>
    }
    if (role !== "admin") {
        return <Navigate to="/dashboard/forbidden-access"></Navigate>
    }
    return children;
}
export default AdminRoute;