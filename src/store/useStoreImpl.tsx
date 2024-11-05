import {UsersModule} from "./module/UsersModule.tsx";
import {RepoModule} from "./module/RepoModule.tsx";

export interface ImplStore {
    user_model: UsersModule,
    repo_model: RepoModule
}

