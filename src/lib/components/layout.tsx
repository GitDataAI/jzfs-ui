import React from "react";

import TopNav from './navbar';
import { LayoutProps } from "./interface/comp_interface";
import Leftnav from "../../pages/leftnav/index";

const Layout:React.FC<LayoutProps> = ({ logged = true, children }) => {
    return (
        <>
            <TopNav logged={logged}/>
            <div className="main-app">
                {logged && <Leftnav />}
                <div className="child">
                {children}
                </div>
            </div>
        </>
    );
};

export default Layout;