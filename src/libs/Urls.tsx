class Urls {
  public Urls = {
    v1: {
      auth: {
        login: "/v1/auth/login",
        logout: "/v1/auth/logout",
        register: "/v1/auth/register",
        local: "/v1/auth/local",
        updatePassword: "/v1/auth/updatawp",
        updata: "/v1/auth/updata",
      },
      keys: {
        listToken: "/v1/keys/list/token",
        listPubkey: "/v1/keys/list/pubkey",
        addToken: "/v1/keys/add/token",
        addPubkey: "/v1/keys/add/pubkey",
        deleteToken: "/v1/keys/remove/token",
        deletePubkey: "/v1/keys/remove/pubkey",
      },
      group: {
        createGroup: "/v1/group/create",
        getGroupById: "/v1/group/getid",
        reGroupName: "/v1/group/rename",
        reGroupLocation: "/v1/group/relocation",
        reGroupBio: "/v1/group/rebio",
        addUserToGroup: "/v1/group/auser",
        removeUserFromGroup: "/v1/group/ruser",
      },
    },
  };
}

export default Urls;
