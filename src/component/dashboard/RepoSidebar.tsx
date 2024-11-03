import {Menu} from "primereact/menu";
import { GoRepo} from "react-icons/go";
import {PiFlowArrow} from "react-icons/pi";
import {MenuItem, MenuItemOptions} from "primereact/menuitem";

const DashRepoSidebar = () => {
    const ActiveLabel = (id:string) => {
        document.querySelectorAll(".labels")
            .forEach((value)=>{
                value.classList.remove("labels-active")
                if (value.id === id){
                    value.classList.add("labels-active")
                }
            })
    }
    const itemRenderer = (item: MenuItem, _options: MenuItemOptions) => {
        if (item.disabled){
            return (
                <div className='p-menuitem-content labels disable' id={item.id}>
                    <a className="flex align-items-center p-menuitem-link">
                        {item.icon}
                        <span className="mx-2" style={{marginLeft: "10px"}}>{item.label}</span>
                    </a>
                </div>
            )
        } else {
            return (
                <div className='p-menuitem-content labels' id={item.id} onClick={() => ActiveLabel(item.id as string)}>
                    <a className="flex align-items-center p-menuitem-link">
                        {item.icon}
                        <span className="mx-2" style={{marginLeft: "10px"}}>{item.label}</span>
                    </a>
                </div>
            )
        }
    }

    let Menuitems: MenuItem[] = [
        {
            label: "Your work",
            items: [
                {label: 'Repository', id: "sidebar-repo", icon: <GoRepo/>, template: itemRenderer},
                { label: 'Pipelines',id: "sidebar-pipeline", icon: <PiFlowArrow />,template: itemRenderer,disabled: true},
            ]
        }
    ];
    return(
        <div className="dash-sidebar">
            <div className="dash-sidebar-header">

            </div>
            <div className="dash-sidebar-option">
                <Menu model={Menuitems} />
            </div>
        </div>
    )
};

export default DashRepoSidebar