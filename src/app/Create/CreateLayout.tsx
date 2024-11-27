import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header.tsx";
import {media} from "@/hooks/useMedia.tsx";


const CreateLayout: React.FC = () => {
    const navigate = useNavigate();
    const height = media.height

    useEffect(() => {
        console.log(media)
    }, []);

    return (
        <>
            <div className="items-center justify-center mb-0" style={{height: height}}>
                <div className="flex flex-col h-screen w-full items-center justify-center" style={{height:height}}>
                    <Header />
                    <div className="w-full flex flex-grow ">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateLayout;
