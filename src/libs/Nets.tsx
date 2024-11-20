import Urls from "./Urls.tsx";
import axios from "axios";

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
  public baseUrl = "https://v1.jiaozifs.com";
  // @eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async POST(
    urls: string,
    data: any,
    options: object = {}
  ): Promise<any> {
    try {
      const result = await axios.post(this.baseUrl + urls, data, {
        headers: {
          ...options,
          "Cookie": document.cookie,
        },
      });
      if (result.headers["set-cookie"]){
        document.cookie = result.headers["set-cookie"].join("; ");
      }
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default Nets;
