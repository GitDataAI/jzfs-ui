import {Result} from "../Nets";

export interface Login {
    username: string,
    password: string
}

export interface Register {
    username: string,
    password: string,
    email: string
}



export interface UserModule {
    uid:       string;
    name:      string;
    username:  string;
    email:     string;
    avatar:    string;
    bio:       string;
    links:     string[];
    location:  string;
    time_zone: string;
    language:  string;
    groups:    string[];
    create_at: Date;
    update_at: Date;
}

export interface Auth{
    login(data: Login): Promise<Result<UserModule>>;
    register(data: Register): Promise<Result<undefined>>;
    logout(): Promise<Result<undefined>>;
    local(): Promise<Result<UserModule>>;
}
