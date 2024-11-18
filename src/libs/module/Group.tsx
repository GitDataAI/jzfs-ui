import { Result } from "../Nets";

export interface Group {
  createGroup(data: CreateGroupParams): Promise<Result<undefined>>;
  getGroupById(uid: string): Promise<Result<undefined>>;
  reGroupName(data: ReGroupNameParams): Promise<Result<undefined>>;
  reGroupBio(data: ReGroupBioParams): Promise<Result<undefined>>;
  reGroupLocation(data: ReGroupLocationParams): Promise<Result<undefined>>;
  addUserToGroup(data: GroupUserParams): Promise<Result<undefined>>;
  removeUserFromGroup(data: GroupUserParams): Promise<Result<undefined>>;
}

export interface CreateGroupParams {
  name: string;
  bio: string;
  contact: string;
}

export interface BaseParams {
  uid: string;
}

export interface ReGroupNameParams extends BaseParams {
  group_name: string;
  new_name: string;
}

export interface ReGroupBioParams extends BaseParams {
  bio: string;
}

export interface ReGroupLocationParams extends BaseParams {
  location: string;
}

export interface GroupUserParams extends BaseParams {
  user_id: string;
}
