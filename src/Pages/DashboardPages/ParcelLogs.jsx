import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const ParcelLogs = () => {
    const { trackingId } = useParams()

    const axiosInstance = useAxios()
    const { data: logs = [] } = useQuery({
        queryKey: ["parcel-logs", trackingId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/parcel-logs/${trackingId}`)
            return res.data;
        }
    })
    return (
        <div className="py-4">
            <h1 className="text-center text-3xl font-bold py-2">Your Parcels Status</h1>
            <ul className="timeline timeline-vertical">
                {
                    logs.map(log =>
                        <li key={log._id}>
                            <div className="timeline-start">
                                {new Date(log.createdAt).toLocaleString("en-BD", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                    timeZone: "Asia/Dhaka"
                                })}
                            </div>
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="timeline-end timeline-box font-semibold text-lg">{log.details}</div>
                            <hr />
                        </li>
                    )
                }

            </ul>
        </div>
    )
}
export default ParcelLogs;