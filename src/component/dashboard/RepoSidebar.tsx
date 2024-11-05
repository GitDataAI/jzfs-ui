import {Menu} from "primereact/menu";
import {AiOutlineAlignLeft} from "react-icons/ai";
import {defaultItem} from "../../store/useSidebar.tsx";
import {useState} from "react";
import {MenuItem} from "primereact/menuitem";

const DashRepoSidebar = () => {
    const HiddleSidebar = () => {
        const idx = document.getElementById("dash-sidebar");
        const btn = document.getElementById("dash-sidebar-header-outlint");
        if (!(idx === null|| btn === null)){
            if (idx.style.transform == "translateX(-100%)"){
                idx.style.transform = "translateX(0%)"
                btn.style.transform = "translateX(0%)"
            }else {
                idx.style.transform = "translateX(-100%)"
                btn.style.transform = "translateX(100%)"
            }
        }
    }
    const [Item] = useState<MenuItem[]>(defaultItem);
    return (
        <div className="dash-sidebar" id="dash-sidebar">
            <div className="dash-sidebar-header">
                <button id="dash-sidebar-header-outlint" onClick={HiddleSidebar} className="dash-sidebar-header-outlint"
                        aria-label="Filter"><AiOutlineAlignLeft/></button>
            </div>
            <div className="dash-sidebar-option">
                <Menu onClick={(e)=>{
                    console.log(e);
                }} model={Item}/>
            </div>
        </div>
    )
};

export default DashRepoSidebar