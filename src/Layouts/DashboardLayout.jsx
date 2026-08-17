import { Helmet } from "react-helmet-async";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaTasks, FaUsers } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDirectionsBike, MdWorkHistory } from "react-icons/md";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import { RiEBikeFill } from "react-icons/ri";

const DashboardLayout = () => {
    const { role } = useRole()

    return (
        <div className="drawer lg:drawer-open">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4 text-2xl font-semibold italic">Zap Shift Dashboard</div>
                </nav>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">

                        {/* Our List item */}
                        <li>
                            <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>

                        {/* rider only routes  */}

                        {
                            role === "rider" && <>
                                <li>
                                    <Link to="/dashboard/accept-deliveries" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Accept Deliveries">
                                        <span className="text-xl my-1.5 inline-block"><FaTasks></FaTasks></span>
                                        <span className="is-drawer-close:hidden">Accept Deliveries</span>
                                    </Link>
                                </li>
                            </>
                        }


                        {/* admin routes */}

                        {
                            role === "admin" ?
                                <li>
                                    <Link to="/dashboard/myparcels" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Parcels">
                                        <span className="text-xl my-1.5 inline-block"><CiDeliveryTruck></CiDeliveryTruck></span>
                                        <span className="is-drawer-close:hidden">All Parcels</span>
                                    </Link>
                                </li>
                                :
                                <li>
                                    <Link to="/dashboard/myparcels" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Parcels">
                                        <span className="text-xl my-1.5 inline-block"><CiDeliveryTruck></CiDeliveryTruck></span>
                                        <span className="is-drawer-close:hidden">My Parcels</span>
                                    </Link>
                                </li>
                        }

                        <li>
                            <Link to="/dashboard/payment-history" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History">
                                <span className="text-xl my-1.5 inline-block"><MdWorkHistory /></span>
                                <span className="is-drawer-close:hidden">Payment History</span>
                            </Link>
                        </li>

                        {
                            role === "admin" && <>
                                <li>
                                    <Link to="/dashboard/approved-riders" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approved Riders">
                                        <span className="text-xl my-1.5 inline-block"><MdOutlineDirectionsBike /></span>
                                        <span className="is-drawer-close:hidden">Approved Riders</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/user-management" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="User Management">
                                        <span className="text-xl my-1.5 inline-block"><FaUsers></FaUsers></span>
                                        <span className="is-drawer-close:hidden">User Management</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/assign-rider" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assign-rider">
                                        <span className="text-xl my-1.5 inline-block"><RiEBikeFill /></span>
                                        <span className="is-drawer-close:hidden">Assign Rider</span>
                                    </Link>
                                </li>
                            </>
                        }

                        <li>
                            <Link to="/dashboard/coverage" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Coverage Area">
                                <span className="text-xl my-1.5 inline-block"><IoLocationSharp /></span>
                                <span className="is-drawer-close:hidden">Coverage Area</span>
                            </Link>
                        </li>

                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default DashboardLayout;