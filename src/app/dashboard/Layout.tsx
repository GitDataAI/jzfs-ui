import DashRepoSidebar from "../../component/dashboard/RepoSidebar.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import useSidebar from "../../store/useSidebar.tsx";

const DashboardLayout = () => {
    const nav = useNavigate();
    useSidebar.subscribe((state)=>{
        console.log(state.current);
        const url = state.current.url;
        if (url){
            nav("/"+url)
        }
    })
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