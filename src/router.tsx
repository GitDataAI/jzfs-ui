import { createBrowserRouter, RouteObject } from "react-router-dom";
import useAuth from "./store/useUsers.tsx";
import AuthLayout from "./app/auth/Layout.tsx";
import ForgotForm from "./components/auth/ForgotForm.tsx";
import Layout from "./app/Layout.tsx";
import Repositories from "./app/Repositories.tsx";
import Login from "./app/auth/Login.tsx";
import Register from "./app/auth/Register.tsx";
import Group from "./app/Group.tsx";
import Actions from "./app/Actions.tsx";
import Forgot from "./app/auth/Forgot.tsx";
import Profile from "@/app/Profile.tsx";
import UpPwd from "@/app/auth/UpPwd.tsx";
import SearchAccount from "@/app/auth/SearchAccount.tsx";
import FindAccount from "@/app/auth/FindAccount.tsx";


// After logging in, you must use window.location.href = /{target} to redirect, otherwise subsequent routes cannot be loaded
export const Routers = () => {
  // @eslint-disable-next-line @typescript-eslint/no-unused-vars
  let basicRouter: RouteObject[] = [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Repositories />,
        },
        {
          path: "/Repositories",
          element: <Repositories />,
        },
        {
          path: "/Actions",
          element: <Actions />,
        },
        {
          path: "/Group",
          element: <Group />,
        },
        {
          path:"/Profile",
          element: <Profile />
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "apply",
          element: <Register />,
        },
        {
          path: "SearchAccount",
          element: <SearchAccount/>
        },
        {
          path: "forgot",
          element: <Forgot />,
        },
        {
          path:"UpPwd/:token",
          element: <UpPwd/>
        },
        {
          path: "FindAccount",
          element: <FindAccount/>,
        }
      ],
    },
  ];
  // @eslint-disable-next-line @typescript-eslint/no-unused-vars
  let AuthBeforeRouter: RouteObject[] = [
    {
      path: "/test",
      element: <h1>test</h1>,
    },
  ];
  const resp = useAuth.getState();
  if (resp.user !== undefined) {
    basicRouter.push(...AuthBeforeRouter);
  }
  return createBrowserRouter(basicRouter);
};
