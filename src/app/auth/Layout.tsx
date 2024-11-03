import {Outlet} from "react-router-dom";

const AuthLayout = () => {
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