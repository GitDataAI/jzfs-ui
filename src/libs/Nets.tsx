import Urls from "./Urls.tsx";
import axios from "axios";
import Cookies from 'js-cookie'

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
          "Cookie": Cookies.get("SessionID"),
        },
      });
      const cks = result.headers["set-cookie"];
      if (cks) {
        Cookies.set("SessionID", cks[0])
      }
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default Nets;
