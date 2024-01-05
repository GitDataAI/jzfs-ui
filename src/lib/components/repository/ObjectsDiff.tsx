import React from "react";
import {useAPI} from "../../hooks/api";
import {cache, objects} from "../../api";
import ReactDiffViewer, {DiffMethod} from "react-diff-viewer-continued";
import {AlertError, Loading} from "../controls";
import {humanSize} from "./tree";
import Alert from "react-bootstrap/Alert";
import {InfoIcon} from "@primer/octicons-react";
import {  ContentDiffProps, DiffSizeReportProps, DiffType, NoContentDiffProps, ObjectsDiffProps, ResponseProps, StatDiffProps } from "../interface/comp_interface";
import { object } from "../../api/interface/Api";


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
