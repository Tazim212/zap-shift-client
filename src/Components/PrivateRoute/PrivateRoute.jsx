import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()

    const location = useLocation()

    if (loading) {
        return <span className="loading loading-dots loading-xl"></span>
    }

    if (user) {
        return children
    }
    else {
        return <Navigate to="/login" state={location.pathname}></Navigate>
    }

}
export default PrivateRoute;