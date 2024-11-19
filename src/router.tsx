import { createBrowserRouter, RouteObject } from "react-router-dom";
import useAuth from "./store/useUsers.tsx";
import AuthLayout from "./app/auth/Layout.tsx";
import LoginForm from "./components/auth/LoginForm.tsx";
import RegisterForm from "./components/auth/RegisterForm.tsx";
import ForgotForm from "./components/auth/ForgotForm.tsx";
import Layout from "./app/Layout.tsx";
import Repositories from "./app/Repositories.tsx";
import Login from "./app/auth/Login.tsx";
import Register from "./app/auth/Register.tsx";
import Group from "./app/Group.tsx";
import Actions from "./app/Actions.tsx";

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
          path: "forgot",
          element: <ForgotForm />,
        },
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
