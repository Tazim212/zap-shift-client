import logo from "../../assets/logo.png"
const Logo = () =>{
    return(
        <div className="flex items-center">
            <img src={logo} alt="" />
            <h2 className="font-bold -ms-2 text-2xl">zapShift</h2>
        </div>
    )
}
export default Logo;