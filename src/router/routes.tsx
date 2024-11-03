import {createBrowserRouter} from "react-router-dom";
import DashboardLayout from "../app/dashboard/Layout.tsx";
import Repo from "../app/dashboard/Repo.tsx";
import AuthLayout from "../app/auth/Layout.tsx";
import Login from "../app/auth/Login.tsx";
import Apply from "../app/auth/Apply.tsx";

const Routes = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: <DashboardLayout/>,
            children: [
                {
                    path: "repo",
                    element: <Repo/>
                }
            ]
        },
        {
            path: "auth",
            element: <AuthLayout/>,
            children: [
                {
                    path: 'login',
                    element: <Login/>
                },
                {
                    path: 'apply',
                    element: <Apply/>
                }
            ]
        }
    ])
}


export default Routes;