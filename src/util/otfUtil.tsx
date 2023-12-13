import {objects, otfDiffs} from "../lib/api";
import { RepositoryParams } from "../lib/api/interface";

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
    let response = repo.id? await objects.list(repo.id, ref, entry.path + "_delta_log/"):''
    return response !== null && response.results.length !== 0;
}

export async function isDeltaLakeDiffEnabled() {
    let enabledDiffs = await otfDiffs.get();
    if (enabledDiffs === null || enabledDiffs.diffs.length === 0) {
        return false
    }
    for (let diff of enabledDiffs.diffs) {
        if (diff.name === "delta") {
            return true;
        }
    }
    return false;
}
