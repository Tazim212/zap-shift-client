import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()

    const location = useLocation()

    if (loading) {
        return <div className="mt-48 text-center"><span className="loading loading-dots loading-xl text-center"></span></div>
    }

    if (user) {
        return children
    }
    else {
        return <Navigate to="/login" state={location.pathname}></Navigate>
    }

}
export default PrivateRoute;