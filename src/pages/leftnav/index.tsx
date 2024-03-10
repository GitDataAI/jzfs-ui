import React, { useContext } from "react";
import { ActivepageContext } from "../../lib/hooks/conf";
import RepositoryObjectsNav from "./reponav/objects/objectsNav";
import Repolistsnav from "./repolistsnav";
import { RefContextProvider } from "../../lib/hooks/repo";
import Changesnav from "./reponav/changes/changesNav";
import Commitsnav from "./reponav/commits/objectsNav";
import Branchsnav from "./reponav/branchs/changesNav";

const Leftnav = () => {

const {page} = useContext(ActivepageContext)

if(page === 'objects'){
        return (
            <>
            <RefContextProvider>
            <RepositoryObjectsNav />
            </RefContextProvider>

            </>
        )
    }
    else if(page === 'repositories'){
        return (
            <>
            <Repolistsnav></Repolistsnav>
            </>
        )
    }     
    else if(page === 'changes'){
        return (
            <>
            <Changesnav></Changesnav>
            </>
        )
    }     
    else if(page === 'branches'){
        return (
            <>
            <Branchsnav></Branchsnav>
            </>
        )
    }     
    else if(page === 'commits'){
        return (
            <>
            <Commitsnav></Commitsnav>
            </>
        )
    }     
    else if(page === 'settings'){
        return (
            <>
            <Repolistsnav></Repolistsnav>
            </>
        )
    }     
};

export default Leftnav