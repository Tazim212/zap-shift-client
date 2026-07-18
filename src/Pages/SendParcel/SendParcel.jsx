import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()
    const [centers, setCenters] = useState([])
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const senderRegion = watch("senderRegion")
    const receiverRegion = watch("receiverRegion")

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

    const handleParcel = (data) => {

        const isDocument = data.parcelType === "document"
        const isSameDistrict = data.senderDistrict === data.receiverDistrict
        const weights = parseFloat(data.parcelWeight)

        let costs = 0

        if (isDocument) {
            costs = isSameDistrict ? 60 : 80
        }
        else {
            if (weights <= 3) {
                costs = isSameDistrict ? 110 : 150
            }
            else {
                const extraWeight = weights - 3;
                const minCharge = isSameDistrict ? 110 : 150;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                costs = minCharge + extraCharge
            }
        }

        data.costs = costs

        Swal.fire({
            title: "Agree with the costs?",
            text: `Your costing will be ${costs} Taka`,
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I agree"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/sendparcel', data)
                    .then(res => {
                        // console.log(res.data)
                        Swal.fire({
                            text: "Your order has been placed.",
                            icon: "success"
                        });
                        reset()
                    })
            }
        });

    }

    return (
        <div className="my-5">
            <div className="my-7 space-y-4">
                <h1 className="text-4xl font-bold">Send A Percel</h1>
                <p className="text-xl font-semibold">Enter Your Parcel Details</p>
            </div>

            {/* documents */}

            <form onSubmit={handleSubmit(handleParcel)}>
                <div className="space-x-5 my-3">
                    <label>
                        <input type="radio" className="radio mr-2" {...register("parcelType")} value="document" />
                        Documents
                    </label>

                    <label>
                        <input type="radio" className="radio mr-2" {...register("parcelType")} value="non-document" />
                        Non-Documents
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-3">
                        <div className="flex flex-col">
                            <label className="label " htmlFor="name">Parcel Name</label>
                            <input type="text" className="input" {...register("parcelName")} placeholder="Parcel Name" />
                        </div>
                        <div className="flex flex-col">
                            <label className="label " htmlFor="name">Parcel Weight</label>
                            <input type="number" className="input" {...register("parcelWeight")} placeholder="Weight" />
                        </div>
                    </div>
                </div>


                <div className="my-6 grid grid-cols-1 md:grid-cols-2">

                    {/* Sender Details */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">Sender Details</h2>

                        <div className="flex flex-col">
                            <label className="label pb-2" htmlFor="name">Sender Name</label>
                            <input type="text" defaultValue={user?.displayName} className="input" {...register("senderName")} placeholder="Sender Name" />
                        </div>
                        <div className="flex flex-col">
                            <label className="label pb-2" htmlFor="name">Sender Email</label>
                            <input type="email" defaultValue={user?.email} className="input" {...register("senderEmail")} placeholder="Sender Email" />
                        </div>

                        <div className="flex flex-col">
                            <label className="label pb-2" htmlFor="name">Sender Phone No.</label>
                            <input type="tel" className="input" {...register("senderPhoneNumber"), { maxLength: 11, required: true }} placeholder="Phone No." />
                            {errors.senderPhoneNumber && <p className="text-red-500">Number is not valid</p>}
                        </div>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Region</legend>
                            <select defaultValue="Pick a District" {...register("senderRegion")} className="select">
                                <option>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender District</legend>
                            <select defaultValue="Pick a District" {...register("senderDistrict")} className="select">
                                <option>Pick a district</option>
                                {
                                    districtByRegion(senderRegion).map((d, i) => <option key={i}>{d}</option>)
                                }
                            </select>
                        </fieldset>

                        <div className="flex flex-col">
                            <label className="label pb-2" htmlFor="name">Sender Address</label>
                            <input type="text" className="input" {...register("senderAddress")} placeholder="Sender Address" />
                        </div>
                    </div>

                    {/* Receiver DEtails  */}
                    <div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Receiver Details</h2>

                            <div className="flex flex-col">
                                <label className="label pb-2" htmlFor="name">Receiver Name</label>
                                <input type="text" className="input" {...register("receiverName")} placeholder="Receiver Name" />
                            </div>
                            <div className="flex flex-col">
                                <label className="label pb-2" htmlFor="name">Receiver Email</label>
                                <input type="email" className="input" {...register("receiverEmail")} placeholder="Receiver Email" />
                            </div>

                            <div className="flex flex-col">
                                <label className="label pb-2" htmlFor="name">Receiver Phone No.</label>
                                <input type="tel" className="input" {...register("receiverPhoneNumber"), { minLength: 11 }, { maxLength: 11 }} placeholder="Phone No." />
                                {"receiverPhoneNumber" === 11 && <p className="text-red-500">Number is not valid</p>}
                            </div>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver Region</legend>
                                <select defaultValue="Pick a District" {...register("receiverRegion")} className="select">
                                    <option>Pick a region</option>
                                    {
                                        regions.map((r, i) => <option key={i}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver District</legend>
                                <select defaultValue="Pick a District" {...register("receiverDistrict")} className="select">
                                    <option>Pick a district</option>
                                    {
                                        districtByRegion(receiverRegion).map((d, i) => <option key={i}>{d}</option>)
                                    }
                                </select>
                            </fieldset>

                            <div className="flex flex-col">
                                <label className="label pb-2" htmlFor="name">Receiver Address</label>
                                <input type="text" className="input" {...register("receiverAddress")} placeholder="Receiver Address" />
                            </div>
                        </div>
                    </div>
                </div>
                <input type="submit" value="Send Parcel" className="btn btn-primary text-black" />
            </form>

        </div>
    )
}
export default SendParcel;