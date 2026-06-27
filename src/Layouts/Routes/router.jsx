import { createBrowserRouter } from "react-router";
import Home from "../../Shared/HomePage/Home/Home";
import Layout from "../Layout/Layout";
import Coverage from "../../Pages/Coverage/Coverage";
import AboutUs from "../../Pages/AboutUs/AboutUs";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";

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
                path: "/coverage",
                Component: Coverage,
                loader: () => fetch("/warehouses.json").then(res => res.json())
            },
            {
                path: "/about",
                Component: AboutUs
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
    }
])