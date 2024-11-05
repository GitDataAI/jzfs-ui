import {UserInfo} from "../../api/models";
import {AuthApi} from "../../api";

const auth = new AuthApi();

export class UsersModule{
    public UserInfo:UserInfo | undefined;
    public Token: string | undefined;
    public Token_Expire: number | undefined;
    constructor() {}
    public async Login(username: string, password:string){
        try {
            const result = await auth.login({
                name: username,
                password: password
            })
            if (result.status === 200){
                this.Token = result.data.token;
                if (result.data.token_expiration){
                    this.Token_Expire = result.data.token_expiration
                }else {
                    this.Token_Expire = new Date().getDate();
                }
                return true
            }else {
                return false
            }
        }catch (e){
            console.log(e);
            return false;
        }
    }
    public Save(){
       localStorage.setItem("token",this.Token!);
       localStorage.setItem("token_expire",this.Token_Expire!.toString());
       localStorage.setItem("user_info",JSON.stringify(this.UserInfo));
    }
    public Load(){
        try {
            const token = localStorage.getItem("token");
            const token_expire = localStorage.getItem("token_expire");
            const user_info = localStorage.getItem("user_info");
            if (token && token_expire && user_info){
                this.Token = token;
                this.Token_Expire = parseInt(token_expire);
                this.UserInfo = JSON.parse(user_info);
                return true
            }else {
                return false
            }
        }catch (e) {
            console.log(e)
            return false
        }
    }
    public async Apply(name: string, passwd: string,email: string){
       try {
           const result = await auth.register({
               name,
               password: passwd,
               email: email
           })
           return result.status === 200;
       }catch (e){
           console.log(e);
           return false;
       }
    }
    public async RefreshToken(){
        try {
            const result = await auth.refreshToken({
                headers: {
                    "Authorization": "Bearer "+ this.Token
                }
            });
            if (result.status === 200){
                this.Token = result.data.token;
                if (result.data.token_expiration){
                    this.Token_Expire = result.data.token_expiration
                }else {
                    this.Token_Expire = new Date().getDate();
                }
                return true
            }else {
                return false
            }
        }catch (e) {
            console.log(e);
            return false;
        }
    }
    public async GetUserInfo() {
        try {
            if (!this.Token) {
                return false
            }
            const result = await auth.getUserInfo(this.GetTokenHeader())
            if (result.status === 200){
                this.UserInfo = result.data
                return true
            }else {
                return false
            }
        } catch (e) {
            return false
        }
    }
    public GetTokenHeader(){
        return {
            headers:{
                "Authorization": `Bearer ` + this.Token
            }
        }
    }
    public Logout(){
        this.Token = undefined;
        this.UserInfo = undefined;
        this.Token_Expire = undefined;
    }
}