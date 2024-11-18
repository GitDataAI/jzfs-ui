import {
  CreateGroupParams,
  Group,
  GroupUserParams,
  ReGroupBioParams,
  ReGroupLocationParams,
  ReGroupNameParams,
} from "../module/Group.tsx";
import Nets, { Result } from "../Nets.tsx";

class GroupApi extends Nets implements Group {
  createGroup(data: CreateGroupParams): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.group.createGroup, data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  getGroupById(uid: string): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.group.getGroupById, { uid });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  reGroupName(data: ReGroupNameParams): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.group.reGroupName, data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  reGroupLocation(data: ReGroupLocationParams): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.group.reGroupLocation, data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  reGroupBio(data: ReGroupBioParams): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.group.reGroupBio, data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  addUserToGroup(data: GroupUserParams): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.group.addUserToGroup, data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  removeUserFromGroup(data: GroupUserParams): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.group.removeUserFromGroup, data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default GroupApi;
