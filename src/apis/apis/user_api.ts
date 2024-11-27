import {BasicNet, R} from "../basicNet";
import {UserApply, UserLogin, UserLoginEmail, UserResetPassword, UserUpdate} from "@/apis";
import axios, {AxiosResponse} from "axios";
import {ExecResult, SessionUserValue} from "@/apis";

export class UserApi extends BasicNet{
    async Apply(data: UserApply):
        Promise<AxiosResponse<R<ExecResult>, any>>
    {
        return await this.post('/users/apply',{
            inner: window.btoa(JSON.stringify(data))
        })
    }
    async LoginName(data: UserLogin):
        Promise<AxiosResponse<R<undefined>, any>>
    {
        return await this.post('/users/login/name',{
            inner: window.btoa(JSON.stringify(data))
        })
    }
    async LoginEmail(data: UserLoginEmail):
        Promise<AxiosResponse<R<undefined>, any>>
    {
        return await this.post('/users/login/email',{
            inner: window.btoa(JSON.stringify(data))
        })
    }
    async ResetPassword(data: UserResetPassword):
        Promise<AxiosResponse<R<undefined>, any>>
    {
        return await this.post('/users/reset/online',{
            inner: window.btoa(JSON.stringify(data))
        })
    }
    async ResetPasswordEmail(data: UserResetPassword):
        Promise<AxiosResponse<R<undefined>, any>>
    {
        return await this.post('/users/reset/forget',{
            inner: window.btoa(JSON.stringify(data))
        })
    }
    async Logout():
        Promise<AxiosResponse<R<undefined>, any>>
    {
        return await this.post('/users/logout',{})
    }
    async Update(data: UserUpdate):
        Promise<AxiosResponse<R<ExecResult[]>, any>>
    {
        return await this.post('/users/update',data)
    }
    async Local():
        Promise<AxiosResponse<R<SessionUserValue>, any>>
    {
        return await this.post('/users/local',{})
    }


}