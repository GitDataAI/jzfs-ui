import { RefType } from "./lib/components/interface/comp_interface";

export const RefTypeBranch = RefType.Branch;
export const RefTypeCommit = RefType.Commit;
export const RefTypeTag = RefType.Tag;
export enum TreeItemType {
    Object,
    Prefix,
    DeltaLakeTable
}
export enum OtfType {
    Delta = "delta",
}
export enum OtfDiffType {
    Created = "created",
    Dropped = "dropped",
    Changed = "changed",
}
export enum TreeRowType {
    Object,
    Prefix,
    Table
}

