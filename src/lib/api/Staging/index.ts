import {apiRequest, extractError, qs} from "../index"

export class Staging {
    async get(repoId:string, branchId:string, path:string, presign = false) {
        const query = qs({path, presign});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches/${encodeURIComponent(branchId)}/staging/backing?` + query, {
            method: 'GET'
        });
        if (response.status !== 200) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }

    async link(repoId:string, branchId:string, path:string, staging:any, checksum:string, sizeBytes:number, contentType = 'application/octet-stream') {
        const query = qs({path});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches/${encodeURIComponent(branchId)}/staging/backing?` + query, {
            method: 'PUT',
            body: JSON.stringify({staging: staging, checksum: checksum, size_bytes: sizeBytes, content_type: contentType})
        });
        if (response.status !== 200) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }
}
