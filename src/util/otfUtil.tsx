import { RepositoryParams } from "../lib/api/interface/Api";
import { users } from "../lib/api/interface/Api";

/**
 * Checks whether a path is a delta table root.
 *
 * @param entry the table entry
 * @param repo the repo for the path
 * @param ref the ref in which the path is expected to be listed.
 * @return true if the path is a delat table root, false otherwise.
 */

export interface Entry {
    type: any;
    path_type: string;
    path: string;
}

export async function isDeltaLakeTable(entry:Entry, repo:RepositoryParams, ref:any): Promise<boolean | void> {
    if (entry.path_type === "object") {
        return
    }
    let response = repo.id ? await users.listRepository(repo.name):''
    return response !== null && response.results.length !== 0;
}
