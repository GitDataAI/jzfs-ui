import { Keys } from "../module/Keys.tsx";
import Nets, { Result } from "../Nets.tsx";

class KeysApi extends Nets implements Keys {
  listToken(): Promise<Result<undefined>> {
    try {
      return this.POST(this.Urls.v1.keys.listToken, {});
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default KeysApi;
