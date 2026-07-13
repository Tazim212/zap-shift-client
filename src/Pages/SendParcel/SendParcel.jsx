import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [centers, setCenters] = useState([])

    const axiosSecure = useAxiosSecure()
    const senderRegion = watch("SenderRegion")
    const receiverRegion = watch("ReceiverRegion")

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
        console.log(data)
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
                        <input type="radio" className="radio mr-2" {...register("ParcelType")} value="document" />
                        Documents
                    </label>

                    <label>
                        <input type="radio" className="radio mr-2" {...register("ParcelType")} value="non-document" />
                        Non-Documents
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-3">
                        <div className="flex flex-col">
                            <label className="label " htmlFor="name">Parcel Name</label>
                            <input type="text" className="input" {...register("ParcelName")} placeholder="Parcel Name" />
                        </div>
                        <div className="flex flex-col">
                            <label className="label " htmlFor="name">Parcel Weight</label>
                            <input type="number" className="input" {...register("ParcelWeight")} placeholder="Weight" />
                        </div>
                    </div>
                </div>


                <div className="my-6 grid grid-cols-1 md:grid-cols-2">

                    {/* Sender Details */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">Sender Details</h2>
                        <div className="flex flex-col">
                            <label className="label pb-2" htmlFor="name">Sender Name</label>
                            <input type="text" className="input" {...register("SenderName")} placeholder="Sender Name" />
                        </div>

                        <div className="flex flex-col">
                            <label className="label pb-2" htmlFor="name">Sender Phone No.</label>
                            <input type="number" className="input" {...register("SenderPhoneNumber")} placeholder="Phone No." />
                        </div>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Region</legend>
                            <select defaultValue="Pick a District" {...register("SenderRegion")} className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    regions.map((r, i) => <option key={i}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender District</legend>
                            <select defaultValue="Pick a District" {...register("SenderDistrict")} className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtByRegion(senderRegion).map((d, i) => <option key={i}>{d}</option>)
                                }
                            </select>
                        </fieldset>

                        <div className="flex flex-col">
                            <label className="label pb-2" htmlFor="name">Sender Address</label>
                            <input type="text" className="input" {...register("SenderAddress")} placeholder="Sender Address" />
                        </div>
                    </div>

                    {/* Receiver DEtails  */}
                    <div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Receiver Details</h2>
                            <div className="flex flex-col">
                                <label className="label pb-2" htmlFor="name">Receiver Name</label>
                                <input type="text" className="input" {...register("ReceiverName")} placeholder="Receiver Name" />
                            </div>

                            <div className="flex flex-col">
                                <label className="label pb-2" htmlFor="name">Receiver Phone No.</label>
                                <input type="number" className="input" {...register("ReceiverPhoneNumber")} placeholder="Phone No." />
                            </div>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender Region</legend>
                                <select defaultValue="Pick a District" {...register("ReceiverRegion")} className="select">
                                    <option disabled={true}>Pick a district</option>
                                    {
                                        regions.map((r, i) => <option key={i}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender District</legend>
                                <select defaultValue="Pick a District" {...register("ReceiverDistrict")} className="select">
                                    <option disabled={true}>Pick a district</option>
                                    {
                                        districtByRegion(receiverRegion).map((d, i) => <option key={i}>{d}</option>)
                                    }
                                </select>
                            </fieldset>

                            <div className="flex flex-col">
                                <label className="label pb-2" htmlFor="name">Receiver Address</label>
                                <input type="text" className="input" {...register("ReceiverAddress")} placeholder="Receiver Address" />
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