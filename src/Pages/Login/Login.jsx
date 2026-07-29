import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const { signedUser, handleGoogleSigned, passReset } = useAuth()
    const [show, setShow] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const handleSignIn = (data) => {
        signedUser(data.email, data.password)
            .then(res => {
                // console.log(res.user)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged in successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state || "/")
            })
            .catch(err => {
                console.log(err)
            })
    }


    const googleSigned = () => {
        handleGoogleSigned()
            .then(() => {
                navigate(location?.state || "/")
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handlePassReset = (data) => {
        // const email = getValues(email)

        // if (!data.email) {
        //     Swal.fire({
        //         position: "top-end",
        //         icon: "warning",
        //         title: "Enter Your Email",
        //         showConfirmButton: false,
        //         timer: 1500
        //     });
        //     return
        // }

        passReset(data.email)
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Password reset mail sent",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err =>{
                console.log(err)
            })
    }


    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <Helmet>
                <title>Login Page</title>
            </Helmet>
            <form onSubmit={handleSubmit(handleSignIn)} className="card-body">
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type={show ? "text" : "password"}
                        className="input"
                        {...register("password",
                            { required: true, pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/ })}
                        placeholder="Password" />
                    {
                        errors.password?.type === "pattern" && <p className="text-red-600">Password must have one uppercase & one number</p>
                    }

                    {
                        show ? <span onClick={() => setShow(false)} className="absolute top-34 left-80 cursor-pointer"><FaEye></FaEye></span>
                            :
                            <span onClick={() => setShow(true)} className="absolute top-34 left-80 cursor-pointer"><FaEyeSlash></FaEyeSlash></span>
                    }
                    <div><a onClick={handlePassReset} className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p>Don't have an account? <Link to="/register" className="underline text-blue-900">Register Now</Link></p>
            </form>
            <button onClick={googleSigned} className="btn bg-gray-500 text-gray-100 border-[#e5e5e5] w-2/3 my-3 mx-auto">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
        </div>
    )
}
export default Login;