import {Button} from "primereact/button";
import {TabMenu} from "primereact/tabmenu";
import {MenuItem } from "primereact/menuitem";
import {useState} from "react";

const Repo = () => {
    const [activeItem,setActiveItem] = useState(0);
    const items: MenuItem[] = [
        { label: 'Owner', icon: 'pi pi-home'},
        { label: 'Public', icon: 'pi pi-chart-line' },
        { label: 'Private', icon: 'pi pi-list' },
        { label: 'Sources', icon: 'pi pi-inbox' },
        { label: 'Forks', icon: 'pi pi-inbox' },
        { label: 'Archived', icon: 'pi pi-inbox' },
        { label: 'Mirrors', icon: 'pi pi-inbox' },
        { label: 'Templates', icon: 'pi pi-inbox' },
    ];
    return(
        <div className="dash-body">
            <div className="dash-body-header">

            </div>
            <div className="dash-body-top">
                <a className={"tt"}>
                    Repository's
                </a>
                <div id="repo-ops">
                    <Button size={"small"} severity={"success"} text>Explore Repository</Button>
                    <Button size={"small"} severity={"success"}>New Repository</Button>
                </div>
                <TabMenu activeIndex={activeItem} onTabChange={(x)=>{
                    setActiveItem(x.index)
                }} model={items} />
            </div>
            <div className="dash-body-list">

            </div>
        </div>
    )
}

export default Repo