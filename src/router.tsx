import { createBrowserRouter, RouteObject } from "react-router-dom";
import useAuth from "./store/useUsers.tsx";
import AuthLayout from "./app/AuthLayout.tsx";
import LoginForm from "./components/auth/LoginForm.tsx";
import RegisterForm from "./components/auth/RegisterForm.tsx";
import ForgotForm from "./components/auth/ForgotForm.tsx";

// After logging in, you must use window.location.href = /{target} to redirect, otherwise subsequent routes cannot be loaded
export const Routers = () => {
  // @eslint-disable-next-line @typescript-eslint/no-unused-vars
  let basicRouter: RouteObject[] = [
    {
      path: "/",
      element: <h1>Hello GitDataAi Cloud</h1>,
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <LoginForm />,
        },
        {
          path: "register",
          element: <RegisterForm />,
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
