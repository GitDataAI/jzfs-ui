import React from "react";

import {Route, Routes} from "react-router-dom";

import LoginPage from "./login";
import RegisterPage from "./register";

const Auth = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage/>} />
            <Route path="*" element={<LoginPage/>} />
            <Route path="register" element={<RegisterPage/>} />
        </Routes>
    )
}

export default Auth;
