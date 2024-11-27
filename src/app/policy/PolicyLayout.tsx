import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header.tsx";
import {media} from "@/hooks/useMedia.tsx";


const Layout: React.FC = () => {
    return (
        <>
            <div className="items-center justify-center mb-0">
                <div className="flex flex-col h-screen w-full items-center justify-center">
                    <Header />
                    <div className="w-full flex h-fit ">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
