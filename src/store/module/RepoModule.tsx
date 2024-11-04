import {Branch, Commit, ObjectStats, RefType, Repository, Tag} from "../../api/models";
import {BranchesApi, ObjectsApi, RepoApi } from "../../api";
import UseStore from "../useStore.tsx";

const repo = new RepoApi();
const branch = new BranchesApi();
const object = new ObjectsApi();
export class Repos{
    public owner_name: string
    public repository: Repository
    public commit: Commit[]
    public tags: Tag[]
    public Branch: Branch[]
    public ObjectStats: ObjectStats[]
    constructor(repo: Repository) {
        this.repository = repo;
        this.owner_name = repo.owner_id;
        this.tags = [];
        this.Branch = [];
        this.commit = [];
        this.ObjectStats = []
    }
    public GetOwnerName(){
        return this.owner_name;
    }
    public GetRepoName(){
        return this.repository.name;
    }
    public GetVisible(){
        return this.repository.visible;
    }
    public async GetCommit(){
        try {
            const result = await repo
                .getCommitsInRef(this.owner_name, this.repository.name,undefined,undefined,undefined,await this.Token())
            if (result.status === 200){
                this.commit = result.data;
                return true
            }else {
                return false
            }
        }catch (e) {
            return false
        }
    }
    public async ListBranch(){
        try {
            const result = await branch
                .listBranches(this.owner_name,this.repository.name,undefined,undefined,undefined,this.Token());
            if (result.status === 200){
                this.Branch = result.data.results;
                return true
            }else {
                return false
            }
        } catch (e) {
            return false
        }
    }
    public async GetFileContent(ref:RefType){
        const result = await object.getFiles(this.owner_name,this.repository.name,ref, undefined,await this.Token());
        if (result.status === 200){
            //TODO
        }
    }
    public async Token(){
        const result = await new UseStore().get();
        return result.user_model.GetTokenHeader();
    }
}


export class RepoModule{
    public Repos: Repos[]
    constructor() {
        this.Repos = []
    }
    public async GetOwnerRepo(OwnerId:string){
        try {
            const result = await repo.listRepository(OwnerId,undefined,undefined,undefined,await this.Token());
            if (result.status === 200){
                for (let i = 0; i ++ ;i < result.data.results.length){
                    this.Repos.push(new Repos(result.data.results[i]))
                }
                return true
            } else {
                return false
            }
        }catch (e){
            return false
        }
    }
    public async GetUserRepo(){
        try {
            const result = await repo.listRepositoryOfAuthenticatedUser(undefined,undefined,undefined,this.Token())
            if (result.status === 200){
                const data = result.data.results;
                for (let item of data) {
                    this.Repos.push(new Repos(item));
                }
                return true
            }else {
                return false
            }
        } catch (e) {
            console.log(e)
            return false
        }
    }
    public async GetPublicRepo(){
        try {
            const result = await repo.listPublicRepository(undefined,undefined,undefined,this.Token());
            if (result.status === 200){
                const data = result.data.results;
                for (let item of data) {
                    this.Repos.push(new Repos(item));
                }
                return true
            }else {
                return false
            }
        }catch (e) {
            console.log(e)
            return false
        }
    }
    public async Token(){
        const result = await new UseStore().get();
        return result.user_model.GetTokenHeader();
    }
}