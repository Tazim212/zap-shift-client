import { use } from "react"
import { AuthContext } from "../Context/AuhContext"

const useAuth = () =>{
    const authcCon = use(AuthContext)
    return authcCon
}
export default useAuth;