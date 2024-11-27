import {BasicNet, R} from "../basicNet";
import axios, {AxiosResponse} from "axios";
import {GroupCheckNoName, GroupCreate, GroupDelete, GroupModel, GroupOwnerCheck} from "../module/group_dtos";

export class GroupApi extends BasicNet{
    async Create(dto: GroupCreate):Promise<AxiosResponse<R<undefined>,any>>{
        return await this.post('/group/create',dto)
    }
    async Delete(dto: GroupDelete):Promise<AxiosResponse<R<undefined>,any>>{
        return await this.post('/group/delete',dto)
    }
    async CheckName(dto: GroupCheckNoName):Promise<AxiosResponse<R<undefined>,Error>>{
        return await this.post('/group/check/name',dto)
    }
    async CheckOwner(dto: GroupOwnerCheck):Promise<AxiosResponse<R<undefined>,Error>>{
        return await this.post('/group/check/owner',dto)
    }
    async ListOwner():Promise<AxiosResponse<R<GroupModel[]>,Error>>{
        return await this.post('/group/list/owner',{})
    }
    async SearchByName(name: string):Promise<AxiosResponse<R<GroupModel[]>,Error>>{
        return await this.post('/group/search/name',{
            name: name
        })
    }
}