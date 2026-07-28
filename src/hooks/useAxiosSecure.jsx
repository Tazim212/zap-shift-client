import axios from "axios"
import useAuth from "./useAuth"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000"
})

const useAxiosSecure = () => {
    const { user, signOutUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use((config => {
            config.headers.Authorization = `BearerS ${user?.accessToken}`;
            return config;
        }

        ));

        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response
        }, (error) => {
            const statusCode = error.status;
            if (statusCode === 401 || statusCode === 403) {
                signOutUser()
                    .then(() => {
                        navigate("/login")
                    })
            }

            return Promise.reject(error)
        })
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor)
        }


    }, [user])


    return axiosSecure
}
export default useAxiosSecure;