import DashRepoSidebar from "../../component/dashboard/RepoSidebar.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const DashboardLayout = () => {
    const nav = useNavigate();
    useEffect(()=>{
        nav("/repo")
    },[])
    return (
        <div className="dash-layout">
            <DashRepoSidebar/>
            <div className="dash-body">
                <Outlet/>
            </div>
        </div>
    );
};

export default DashboardLayout