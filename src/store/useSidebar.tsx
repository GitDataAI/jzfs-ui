import {create} from "zustand";
import {MenuItem, MenuItemOptions} from "primereact/menuitem";
import {createJSONStorage, persist} from "zustand/middleware";
import {GoMirror, GoProjectTemplate, GoRepo} from "react-icons/go";
import {MdCardMembership, MdPublic} from "react-icons/md";
import {RiGitForkLine, RiGitRepositoryPrivateLine, RiOpenSourceFill} from "react-icons/ri";
import {PiArchiveDuotone, PiWebhooksLogo} from "react-icons/pi";
import {FaUpwork} from "react-icons/fa6";
import {GiLeadPipe} from "react-icons/gi";
import {SiAzureartifacts} from "react-icons/si";
import {CiSettings} from "react-icons/ci";
import * as localforage from "localforage";


export const ActiveLabel = (id:MenuItem) => {
    document.querySelectorAll(".labels")
        .forEach((value)=>{
            value.classList.remove("labels-active")
            if (value.id === id.id){
                value.classList.add("labels-active")
            }
        })

    useSidebar.setState((status)=>({
        inner: status.inner,
        current: id,
    }))
}
export const itemRenderer = (item: MenuItem, _options: MenuItemOptions) => {
    return (
        <div className='p-menuitem-content labels' id={item.id} onClick={() => ActiveLabel(item)}>
            <a className="flex align-items-center p-menuitem-link">
                {item.icon}
                <span className="mx-2" style={{marginLeft: "10px"}}>{item.label}</span>
            </a>
        </div>
    )
}
export const defaultItem = [
        {
            label: "Repository",
            items: [
                {label: 'Explore', id: "sidebar-All",url: "explore", icon: <GoRepo/>, template: itemRenderer},
                { label: 'Public',id: "sidebar-Public",url: "public", icon: <MdPublic />,template: itemRenderer},
                { label: 'Private',id: "sidebar-Private",url: "private", icon: <RiGitRepositoryPrivateLine />,template: itemRenderer},
                { label: 'Source',id: "sidebar-Source",url: "source", icon: <RiOpenSourceFill />,template: itemRenderer},
                { label: 'Forks',id: "sidebar-Forks",url: "forks", icon: <RiGitForkLine />,template: itemRenderer},
                { label: 'Archived',id: "sidebar-Archived",url: "archived", icon: <PiArchiveDuotone />,template: itemRenderer},
                { label: 'Mirrors',id: "sidebar-Mirrors",url: "mirrors", icon: <GoMirror />,template: itemRenderer},
                { label: 'Templates',id: "sidebar-Templates",url: "templates", icon: <GoProjectTemplate />,template: itemRenderer},
            ]
        },
        {
            label:"Action",
            items:[
                {label: "Jobs",id: "sidebar-Jobs",url: "jobs", icon: <FaUpwork />,template: itemRenderer},
                {label: "Pipeline",id: "sidebar-pipeline",url: "pipeline", icon: <GiLeadPipe />,template: itemRenderer},
                {label: "Artifacts",id: "sidebar-artifact",url: "artifacts", icon: <SiAzureartifacts />,template: itemRenderer},
                {label: "Settings",id: "sidebar-setting",url: "settings", icon: <CiSettings />,template: itemRenderer},
                {label: "Members",id: "sidebar-member",url: "members", icon: <MdCardMembership />,template: itemRenderer},
                {label: "Webhooks",id: "sidebar-webhook",url: "webhooks", icon: <PiWebhooksLogo />,template: itemRenderer},
            ]
        }
];
export interface ImplSidebarState {
    inner: MenuItem[],
    current: MenuItem,
}

export const useSidebar = create<ImplSidebarState>()(
    persist(
        (_set, _get) => ({
            inner: defaultItem,
            current: defaultItem[0],
        }),
        {
            name: 'Sidebar',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
export default useSidebar