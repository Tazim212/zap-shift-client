import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const { registerUser, updateUserProf} = useAuth()

    const [show, setShow] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const handleREgister = (data) => {
        // console.log(data)
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {
                const formData = new FormData()
                formData.append("image", profileImg)

                const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_api_url, formData)
                .then(res =>{

                    const userProfile = {
                        displayName: data.name,
                        photoURL: res.data.data.url
                    }

                    updateUserProf(userProfile)
                    .then(() =>{
                        // console.log("user updated successfully")
                        Swal.fire("User Created Successfully")
                    })
                    .catch(err =>{
                        console.log(err)
                    })
                    navigate(location?.state || "/")
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(handleREgister)} className="card-body">
                <fieldset className="fieldset">
                    <label className="label">Your Name</label>
                    <input type="text" className="input" {...register("name")} placeholder="Your Name" />
                    <label className="label">Your Photo</label>
                    <input type="file" className="file-input" {...register("photo")} placeholder="Your photo" />
                    <label className="label">Email</label>
                    <input type="email" className="input" {...register("email")} placeholder="Your Email" />
                    <label className="label">Password</label>
                    <input
                        type={show ? "text" : "password"}
                        className="input"
                        {...register("password",
                            { pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/ })}
                        placeholder="Password"
                    />
                    {
                        errors.password?.type === "pattern" && <p className="text-red-600">Password must have one uppercase & one number</p>
                    }
                    {
                        show ? <span onClick={() =>setShow(false)} className="relative left-75 bottom-8 cursor-pointer"><FaEye></FaEye></span> 
                        : 
                        <span onClick={() =>setShow(true)} className="relative left-75 bottom-8 cursor-pointer"><FaEyeSlash></FaEyeSlash></span>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p>Already have an account? <Link to="/login" className="underline text-blue-900">Log In</Link></p>
            </form>
        </div>
    )
}
export default Register;