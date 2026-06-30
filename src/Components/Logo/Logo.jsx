import { Link } from "react-router";
import logo from "../../assets/logo.png"
const Logo = () => {
    return (
        <Link to="/">
            <div className="flex items-center">
                <img src={logo} alt="" />
                <h2 className="font-bold -ms-2 text-2xl">zapShift</h2>
            </div>
        </Link>
    )
}
export default Logo;