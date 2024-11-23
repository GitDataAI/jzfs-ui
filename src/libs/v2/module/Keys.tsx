import { Result } from "../Nets.tsx";

export interface Keys {
  listToken(): Promise<Result<undefined>>;
}
