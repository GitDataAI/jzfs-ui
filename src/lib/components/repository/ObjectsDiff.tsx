import React from "react";
import {AlertError} from "../controls";
import {ObjectsDiffProps} from "../interface/comp_interface";


export const ObjectsDiff:React.FC<ObjectsDiffProps> = ({entry}) => {
    let left;
    switch (entry.action) {
        case 1:
            left = 'upload'
            break;
        case 2:
            left = 'delete'
            break;
        case 3:
            left = 'updata'
            break;
        default:
            return <AlertError error={"Unsupported diff type " + entry.action}/>;
    }

  return(
    <>
     <div className={"stats-diff-block"}>
     <div>
        <strong>name</strong> : {entry.path}  <strong>id</strong> : {entry.to_hash?entry.to_hash:entry.base_hash}  <strong>action</strong> : {left} 
    </div>
    </div>
    </>
  )
}
