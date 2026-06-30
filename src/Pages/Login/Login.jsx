import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const { signedUser } = useAuth()
    const [show, setShow] = useState(false)

    const handleSignIn = (data) => {
        // console.log(data.email, data.password)
        signedUser(data.email, data.password)
        .then(res =>{
            console.log(res.user)
        })
        .catch(err =>{
            console.log(err)
        })
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
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
                        show ? <span onClick={() => setShow(false)} className="relative bottom-8 left-75 cursor-pointer"><FaEye></FaEye></span>
                            :
                            <span onClick={() => setShow(true)} className="relative bottom-8 left-75 cursor-pointer"><FaEyeSlash></FaEyeSlash></span>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p>Don't have an account? <Link to="/register" className="underline text-blue-900">Register Now</Link></p>
            </form>
        </div>
    )
}
export default Login;