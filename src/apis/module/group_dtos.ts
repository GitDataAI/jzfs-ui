type Uuid = string;

export interface GroupModel {
    uid: Uuid;
    name: string;
    bio: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
}
export interface GroupCreate {
    name: string;
    bio: string;
    avatar: string;
}

export interface GroupDelete {
    uid: Uuid;
}

export interface GroupUpdate {
    group_id: Uuid;
    name?: string;
    bio?: string;
    avatar?: string;
}

export interface GroupOwnerMove {
    group_id: Uuid;
    new_user_id: Uuid;
}

export interface GroupAccessUpdate {
    group_id: Uuid;
    user_id: Uuid;
    access: number;
}

export interface GroupInviteUsers {
    group_id: Uuid;
    user_id: Uuid;
    access: number;
}

export interface GroupJoin {
    group_id: Uuid;
    user_id: Uuid;
    allow: boolean;
}

export interface GroupRemoveUsers {
    group_id: Uuid;
    user_id: Uuid;
}

export interface GroupCheckNoName {
    name: string;
}

export interface GroupOwnerCheck {
    uid: Uuid;
}

export interface GroupSearchByName {
    name: string;
}