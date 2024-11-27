export interface SessionUserValue{
    uid: string,
    name: string,
    pro: boolean,
    username: string,
    email: string,
    phone: string,
    bio: string
}

export interface ExecResult{
    rows_affected: number,
    last_insert_id: any
}