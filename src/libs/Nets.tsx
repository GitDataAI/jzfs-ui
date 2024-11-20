import Urls from "./Urls.tsx";
import axios from "axios";
import * as https from "node:https";

export interface Result<T> {
  data: {
    code: number;
    msg: string;
    data?: T;
  };
}

class Nets extends Urls {
  constructor() {
    super();
  }
  public baseUrl = "/api";
  // @eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async POST(
    urls: string,
    data: any,
    options: object = {}
  ): Promise<any> {
    try {
      return await axios.post(this.baseUrl + urls, data, {
        headers: {
          ...options,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      });
    } catch (e) {
      return e;
    }
  }
}

export default Nets;
