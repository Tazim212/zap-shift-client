import { useForm } from "react-hook-form";
import agent from "../../assets/agent-pending.png"
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Rider = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
    const [centers, setCenters] = useState([])
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const riderRegion = watch("region")

    useEffect(() => {
        axiosSecure.get("/servicecenter")
            .then(res => {
                setCenters(res.data)
            })
    }, [])

    const regionsDuplicate = centers.map(center => center.region)
    const regions = [...new Set(regionsDuplicate)]

    const districtByRegion = region => {
        const regionDIstrict = centers.filter(d => d.region === region)
        const districts = regionDIstrict.map(dis => dis.district)
        return districts
    }

    const handleApplication = (data) => {
        axiosSecure.post("/riders", data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your application has been sent",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <Helmet>
                <title>Be A Rider</title>
            </Helmet>
            <div className="w-1/2 mx-5 my-3">
                <h2 className="text-4xl font-bold">Be A Rider</h2>
                <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.</p>
            </div>

            <div className="flex justify-between items-start">
                <form onSubmit={handleSubmit(handleApplication)} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Your Name</label>
                        <input type="text" {...register("name", { required: true })} className="input" placeholder="Enter Your Name" defaultValue={user?.displayName} />

                        <label className="label">Your Email</label>
                        <input type="email" {...register("email", { required: true })} className="input" placeholder="Enter Your Email" defaultValue={user?.email} />

                        <label className="label">Driving License Number</label>
                        <input
                            type="text"
                            maxLength={15}
                            {...register("license", { required: true, pattern: /^[A-Za-z]{2}[0-9]{13}$/ })}
                            className="input"
                            placeholder="Driving License Number"
                        />

                        {errors.license && (<p className="text-red-700 py-2">ফরম্যাট ভুল! (যেমন: DK1234567890123)</p>)}

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Region</legend>
                            <select defaultValue="Pick a Region" {...register("region")} className="select">
                                <option>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">District</legend>
                            <select defaultValue="Pick a District" {...register("district")} className="select">
                                <option>Pick a district</option>
                                {
                                    districtByRegion(riderRegion).map((d, i) => <option key={i}>{d}</option>)
                                }
                            </select>
                        </fieldset>

                        <label className="label">NID No.</label>
                        <input
                            type="text"
                            minLength={10}
                            maxLength={17}
                            {...register("nid", { required: true, pattern: /^(\d{10}|\d{17})$/ })}
                            className="input"
                            placeholder="Enter NID No."
                        />

                        {errors.nid && (<p className="text-red-700 py-2">National Id should be 10 or 17 digits</p>)}

                        <label className="label">Phone Number</label>
                        <input
                            type="number"
                            minLength={11}
                            maxLength={11}
                            {...register("phoneNumber", { required: true })}
                            className="input"
                            placeholder="Enter Phone Number"
                        />
                        {errors.phoneNumber && (<p className="text-red-700 py-2">Number must be 11 digits</p>)}

                        <label className="label">Bike Brand Model and Year</label>
                        <input type="text" {...register("brand", { required: true })} className="input" placeholder="Brand Name" />

                        <label className="label">Bike Registration Number</label>
                        <input
                            type="text"
                            maxLength={6}
                            {...register("regNumber",
                                { required: true })}
                            className="input" placeholder="Bike Registration Number"
                        />

                        {errors.regNumber && (<p className="text-red-700 py-2">Registration number must be 6 digits</p>)}

                        <label className="label">Tell Us About Yourself</label>
                        <textarea type="text" {...register("about", { required: true })} className="input" placeholder="Tell us" />


                        <button className="btn btn-primary mt-4">Submit</button>
                    </fieldset>
                </form>

                <img src={agent} alt="" />
            </div>
        </div>
    )
}
export default Rider;