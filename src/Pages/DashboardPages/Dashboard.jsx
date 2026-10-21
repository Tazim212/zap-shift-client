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
    const [adminStat, SetAdminStat] = useState([])
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
        axiosSecure.get(`/parcel_admin_state`)
            .then(res => {
                SetAdminStat(res.data)
                // console.log(res.data)
            })
    }, [])

    useEffect(() => {
        axiosSecure.get(`/parcel_rider_stats/${user?.email}`)
            .then(res => {
                SetRiderPar(res.data)
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
                role === "admin" &&
                <div>
                    <div className="my-3 mx-4">
                        <h2 className="text-2xl font-extrabold">Admin Dashboard</h2>
                        <p>You can access all your data and information from anywhere. </p>
                    </div>
                    <div className="stats stats-vertical lg:stats-horizontal bg-gray-200 shadow mt-6 ms-4">
                        <div className="stat">
                            <div className="stat-title text-xl">Total Delivered</div>
                           <div className="stat-value">{adminStat.totalDelivered}</div>
                            
                        </div>

                        <div className="stat">                     
                            <div className="stat-title text-xl">New Parcels Order</div>
                            <div className="stat-value">{adminStat.newParcel}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-title text-xl">Total Rider</div>
                            <div className="stat-value">{adminStat.totalRider}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title text-xl">Total User</div>
                            <div className="stat-value">{adminStat.totalUser}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title text-xl">Total Net Worth</div>
                            <div className="stat-value flex items-center gap-1"><span><TbCoinTaka></TbCoinTaka></span>{adminStat.total}</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default Dashboard;