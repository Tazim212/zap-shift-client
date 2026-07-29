import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const { registerUser, updateUserProf, handleGoogleSigned } = useAuth()

    const [show, setShow] = useState(false)
    const axiosSecure = useAxiosSecure()

    const location = useLocation()
    const navigate = useNavigate()

    const handleREgister = (data) => {
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {
                const formData = new FormData()
                formData.append("image", profileImg)

                const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_api_url, formData)
                    .then(res => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: res.data.data.url,
                        }
                        axiosSecure.post('/users', userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User has registered",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate(location?.state || "/")
                                }
                            })

                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }

                        updateUserProf(userProfile)
                            .then(() => { })
                            .catch(err => {
                                console.log(err)
                            })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const googleSigned = () => {
        handleGoogleSigned()
            .then(res => {
                // console.log(res.user)
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    image: res.user.photoURL
                }
                axiosSecure.post("/users",userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "User has been registered",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        navigate(location?.state || "/")
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mb-8">
            <Helmet>
                <title>Sign Up page</title>
            </Helmet>

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
                        show ? <span onClick={() => setShow(false)} className="absolute left-80 top-69 cursor-pointer"><FaEye></FaEye></span>
                            :
                            <span onClick={() => setShow(true)} className="absolute left-80 top-69 cursor-pointer"><FaEyeSlash></FaEyeSlash></span>
                    }
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p>Already have an account? <Link to="/login" className="underline text-blue-900">Log In</Link></p>
            </form>

            <button onClick={googleSigned} className="btn bg-gray-500 text-gray-100 border-[#e5e5e5] w-2/3 my-3 mx-auto">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Sign up with Google
            </button>
        </div>
    )
}
export default Register;