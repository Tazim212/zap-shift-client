import { Outlet } from "react-router"
import Logo from "../../Components/Logo/Logo"
import authImg from '../../assets/authImage.png'

const AuthLayout = () =>{
    return(
        <div className="max-w-11/12 mx-auto mt-2">
            <Logo></Logo>
            <div className="flex justify-around items-center">
                <Outlet></Outlet>
                <img src={authImg} alt="" />
            </div>
        </div>
    )
}
export default AuthLayout