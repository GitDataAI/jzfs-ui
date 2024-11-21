import {
  Auth,
  Login,
  Register,
  updataModule,
  UserModule,
} from "../module/Auth.tsx";
import Nets, { Result } from "../Nets.tsx";

class AuthApi extends Nets implements Auth {
  login(data: Login): Promise<Result<UserModule>> {
    try {
      const base = window.btoa(JSON.stringify(data));
      return this.POST(this.Urls.v1.auth.login, {
        inner: base,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  register(data: Register): Promise<Result<undefined>> {
    try {
      const base = window.btoa(JSON.stringify(data));
      return this.POST(this.Urls.v1.auth.register, {
        inner: base,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  logout(): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.auth.logout, {});
    } catch (e) {
      return Promise.reject(e);
    }
  }
  local(): Promise<Result<UserModule>> {
    try {
      return this.POST(this.Urls.v1.auth.local, {});
    } catch (e) {
      return Promise.reject(e);
    }
  }
  updatePassword(data: object): Promise<Result<undefined>> {
    try {
      const base = window.btoa(JSON.stringify(data));
      return this.POST(this.Urls.v1.auth.updatePassword, {
        inner: base,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  updata(data: updataModule): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.auth.updata, data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  send(email: string): Promise<Result<undefined>>{
    try {
      return this.POST(this.Urls.v1.auth.send,{
        email: email
      });
    }catch (e){
      return Promise.reject(e);
    }
  }
  verification(data: string): Promise<Result<undefined>>{
    try {
      return this.POST(this.Urls.v1.auth.verification,{
        code:data
      });
    }catch (e){
      return Promise.reject(e);
    }
  }
}

export default AuthApi;
