import {createBrowserRouter, RouteObject} from "react-router-dom";
import useAuth from "./store/useUsers.tsx";

// After logging in, you must use window.location.href = /{target} to redirect, otherwise subsequent routes cannot be loaded
export const Routers = () => {
    // @eslint-disable-next-line @typescript-eslint/no-unused-vars
    let basicRouter:RouteObject[] = [
        {
            path: "/",
            element: <h1>Hello GitDataAi Cloud</h1>
        },
        {
            path: "/auth",
            element: <h1>Layout</h1>,
            children: [
                {
                    path: "login",
                    element: <h1>Login</h1>
                },
                {
                    path: "register",
                    element: <h1>Register</h1>
                }
            ]
        }
    ]
    // @eslint-disable-next-line @typescript-eslint/no-unused-vars
    let AuthBeforeRouter:RouteObject[] = [
        {
            path: "/test",
            element: <h1>test</h1>
        }
    ]
    const resp = useAuth.getState();
    if (resp.user !== undefined){
        basicRouter.push(...AuthBeforeRouter)
    }
    return createBrowserRouter(basicRouter)
}