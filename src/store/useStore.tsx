import {ImplStore} from "./useStoreImpl.tsx";
import {UsersModule} from "./module/UsersModule.tsx";
import * as localforage from "localforage";


class UseStore{
    public data: ImplStore | null = null;
    public async get(): Promise<ImplStore> {
        const result:ImplStore | null = await localforage.getItem("GitDataCloud");
        if (result || result===null) {
            return {
                user_model: new UsersModule()
            };
        } else {
            return JSON.parse(result);
        }
    }
    public set(data:ImplStore){
        localforage.setItem("GitDataCloud", JSON.stringify(data)).then().catch()
    }
    public async subscribe(update: Function){
        this.data = await this.get();
        return setTimeout(async () => {
            if (this.data !== await this.get()) {
                update(this.get())
            }
        },500)
    }
}

export default UseStore;