import React from "react";
import Button from 'react-bootstrap/Button';

const keyIsClickableUrl = /::jzfs::(.*)::url\[url:ui\]$/;
export const MetadataRow = ({ metadata_key, metadata_value }:{metadata_key:string, metadata_value:string}) => {
    return <tr>
               <td><code>{metadata_key}</code></td>
               <td><code>{metadata_value}</code></td>
           </tr>;
};

export const MetadataUIButton = ({ metadata_key, metadata_value }:{metadata_key:string, metadata_value:string}) => {
    const m = metadata_key.match(keyIsClickableUrl);
    if (!m) {
        return null;
    }
    return <tr key={metadata_key}>
               <td colSpan={2}>
                   <Button variant="success" href={metadata_value}>Open {m[1]} UI</Button>
               </td>
           </tr>;
};
