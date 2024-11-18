import { Keys, AddPubkeyParams } from "../module/Keys.tsx";
import Nets, { Result } from "../Nets.tsx";

class KeysApi extends Nets implements Keys {
  listToken(): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.keys.listToken);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  listPubkey(): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.keys.listPubkey, {});
    } catch (e) {
      return Promise.reject(e);
    }
  }
  addToken(name: string): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.auth.updatePassword, {
        name,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  addPubkey(data: AddPubkeyParams): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.keys.addPubkey, data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  deleteToken(token: string): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.keys.deleteToken, { token });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  deletePubkey(public_key: string): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.keys.deletePubkey, { public_key });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default KeysApi;
