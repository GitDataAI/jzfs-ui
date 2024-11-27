export interface UserLogin{
    username:string,
    password:string
}

export interface UserLoginEmail{
    email:string,
    password:string
}


export interface UserApply{
    username:string,
    email:string,
    password:string,
}

export interface UserResetPassword{
    email:string,
    token: string,
    password:string
}

export interface UserUpdate{
    username?:string,
    email?:string,
    password?:string,
    avatar?:string,
    bio?:string,
    phone?:string,
}

export interface UserResetPasswd{
    old_password: string,
    new_password: string
}