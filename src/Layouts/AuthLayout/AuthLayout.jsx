import { Outlet } from "react-router"
import Logo from "../../Components/Logo/Logo"
import second from '../../assets/authImage.png'

const AuthLayout = () =>{
    return(
        <div className="max-w-11/12 mx-auto">
            <Logo></Logo>
            <div className="flex justify-around items-center">
                <Outlet></Outlet>
                <img src={second} alt="" />
            </div>
        </div>
    )
}
export default AuthLayout