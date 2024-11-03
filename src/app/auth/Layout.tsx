import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const AuthLayout = () => {
    const nav = useNavigate();
    useEffect(() => {
        nav("/auth/login")
    },[])
    return(
        <div className="auth-layout">
            <div className="auth-node">
                <h1>GitDataAI</h1>
                <img src="/gitdataai.png" />
                <Outlet/>
            </div>
        </div>
    )
}

export default AuthLayout