import { createBrowserRouter } from "react-router";
import Home from "../../Shared/HomePage/Home/Home";
import Layout from "../Layout/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    }
])