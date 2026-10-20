import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { TbCoinTaka } from "react-icons/tb";
import { CiDeliveryTruck } from "react-icons/ci";

const Dashboard = () => {
    const { user } = useAuth()
    const { role } = useRole()
    const [riderPar, SetRiderPar] = useState([])
    const axiosSecure = useAxiosSecure()

    const { data: userParcels = [] } = useQuery({
        queryKey: ["user_email", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel_user_stats/${user?.email}`)
            return res.data
        }
    })
    const { data: parcels = [] } = useQuery({
        queryKey: ["riderDelivered", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=delivered`);
            return res.data;
        },
    });

    const totalEarning = parcels.reduce((sum, parcel) => {
        const rate = parcel.senderDistrict === parcel.receiverDistrict ? 0.8 : 0.6;
        return sum + parcel.costs * rate;
    }, 0);

    useEffect(() => {
        axiosSecure.get(`/parcel_rider_stats/${user?.email}`)
            .then(res => {
                SetRiderPar(res.data)
                // console.log(res.data)
            })
    }, [user?.email])


    return (
        <div>

            {/* user Stats  */}

            {
                role === "user" &&
                <div className="stats stats-vertical lg:stats-horizontal bg-gray-200 shadow w-2/3 ms-4 mt-6">
                    <div className="stat">
                        <div className="stat-title text-xl">Total Parcels</div>
                        {
                            userParcels.map((par, i) =>
                                <div key={i} className="stat-value">{par.totalCount}</div>
                            )
                        }
                    </div>

                    <div className="stat">
                        <div className="stat-title text-xl">Successfully Delivered</div>
                        {
                            userParcels.map((par, i) =>
                                <div key={i} className="stat-value">{par.totalDelivered}</div>
                            )
                        }
                    </div>

                    <div className="stat">
                        <div className="stat-title text-xl">Total Expences</div>
                        {
                            userParcels.map((par, i) =>
                                <div key={i} className="stat-value">{par.totalAmount}</div>
                            )
                        }
                    </div>
                </div>
            }

            {/* rider Stats  */}

            {
                role === "rider" &&
                <div className="stats stats-vertical lg:stats-horizontal bg-gray-200 shadow w-2/3 ms-4 mt-4">
                    <div className="stat">
                        <div className="stat-title text-xl">Total Delivered</div>
                        {
                            riderPar.map((par, i) => <div key={i} className="stat-value flex items-center gap-1">{par.delivered}</div>
                            )
                        }
                    </div>

                    <div className="stat">
                        <div className="stat-title text-xl">Total Assigned</div>
                        {
                            riderPar.map((par, i) => <div key={i} className="stat-value flex items-center gap-1">{par.totalAssigned}</div>
                            )
                        }
                    </div>

                    <div className="stat">
                        <div className="stat-title text-xl">Total Income</div>
                        <div className="stat-value flex items-center gap-1"><span><TbCoinTaka /></span>{totalEarning}</div>
                    </div>
                </div>
            }
            {
                role === "admin" && <div className="statsstats-vertical lg:stats-horizontal bg-gray-200 shadow">
                    <div className="stat">
                        <div className="stat-title">Downloads</div>
                        <div className="stat-value">39K</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-8 w-8 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                ></path>
                            </svg>
                        </div>
                        <div className="stat-title">New Users</div>
                        <div className="stat-value">4,900</div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-8 w-8 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                ></path>
                            </svg>
                        </div>
                        <div className="stat-title">New Registers</div>
                        <div className="stat-value">1,800</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                </div>
            }
        </div>
    )
}
export default Dashboard;