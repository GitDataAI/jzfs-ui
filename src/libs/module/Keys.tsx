import { Result } from "../Nets";

export interface Keys {
  listToken(): Promise<Result<undefined>>;
}
