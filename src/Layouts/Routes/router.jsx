import { createBrowserRouter } from "react-router";
import Home from "../../Shared/HomePage/Home/Home";
import Layout from "../Layout/Layout";
import Coverage from "../../Pages/Coverage/Coverage";
import AboutUs from "../../Pages/AboutUs/AboutUs";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import PrivateRoute from "../../Components/PrivateRoute/PrivateRoute";
import SendParcel from "../../Pages/SendParcel/SendParcel";
import DashboardLayout from "../DashboardLayout";
import MyParcels from "../../Pages/DashboardPages/MyParcels";
import PaymentSuccess from "../../Pages/DashboardPages/PaymentSuccess";
import Payment from "../../Pages/DashboardPages/Payment";
import PaymentCancel from "../../Pages/DashboardPages/PaymentCancel";
import PaymentHistory from "../../Pages/DashboardPages/PaymentHistory";
import Rider from "../../Pages/Rider/Rider";
import ApproveRider from "../../Pages/DashboardPages/ApproveRider";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/about",
                Component: AboutUs
            },
            {
                path: "/sendparcel",
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>
            },
            {
                path: "/rider",
                element: <PrivateRoute><Rider></Rider></PrivateRoute>
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/register",
                Component: Register
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: "/dashboard/myparcels",
                Component: MyParcels
            },
            {
                path: "/dashboard/payment/:id",
                Component: Payment
            },
            {
                path: "/dashboard/coverage",
                Component: Coverage,
                loader: () => fetch("/warehouses.json").then(res => res.json())
            },
            {
                path: "/dashboard/payment-success",
                Component: PaymentSuccess
            },
            {
                path: "/dashboard/payment-cancel",
                Component: PaymentCancel
            },
            {
                path: "/dashboard/payment-history",
                Component: PaymentHistory
            },
            {
                path: "/dashboard/approved-riders",
                Component: ApproveRider
            }
        ]
    }
])