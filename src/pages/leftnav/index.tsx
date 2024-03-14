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
            <RefContextProvider>
                <Repolistsnav />
            </RefContextProvider>
            </>
        )
    }     
    else if(page === 'changes'){
        return (
            <>
            <RefContextProvider>
                <Changesnav/>
            </RefContextProvider>
            </>
        )
    }     
    else if(page === 'branches'){
        return (
            <>
            <RefContextProvider>
                <Branchsnav/>
            </RefContextProvider>
            </>
        )
    }     
    else if(page === 'commits'){
        return (
            <>
            <RefContextProvider>
            <Commitsnav/>
            </RefContextProvider>
            </>
        )
    }     
    else if(page === 'settings'){
        return (
            <>
            <RefContextProvider>
                <Repolistsnav />
            </RefContextProvider>
            </>
        )
    }     
};

export default Leftnav