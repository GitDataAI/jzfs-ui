import { Result } from "../Nets";

export interface Keys {
  listToken(): Promise<Result<undefined>>;
  listPubkey(): Promise<Result<undefined>>;
  addToken(name: string): Promise<Result<undefined>>;
  addPubkey(data: AddPubkeyParams): Promise<Result<undefined>>;
  deleteToken(token: string): Promise<Result<undefined>>;
  deletePubkey(public_key: string): Promise<Result<undefined>>;
}

export interface AddPubkeyParams {
  name: string;
  public_key: string;
}
