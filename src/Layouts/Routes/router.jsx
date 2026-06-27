import { createBrowserRouter } from "react-router";
import Home from "../../Shared/HomePage/Home/Home";
import Layout from "../Layout/Layout";
import Coverage from "../../Pages/Coverage/Coverage";
import AboutUs from "../../Pages/AboutUs/AboutUs";

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
    }
])