import React from "react";

import TopNav from './navbar';
import { LayoutProps } from "./interface/comp_interface";

const Layout:React.FC<LayoutProps> = ({ logged = true, children }) => {
    return (
        <>
            <TopNav logged={logged}/>
            <div className="main-app">
                {children}
            </div>
        </>
    );
};

export default Layout;