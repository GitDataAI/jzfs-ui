import axios from "axios";

export const BASIC_URL = "/api/v1";

export class BasicNet{
    async post(url: string, data: object,options?: any) {
        return await axios.post(BASIC_URL + url, data, options)
    }
}


export interface R<T>{
    code: number
    msg: string
    data?: T
}