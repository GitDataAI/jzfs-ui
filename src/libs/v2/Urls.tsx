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
        send: "/v1/auth/send",
        verification: "/v1/auth/verification"
      },
      keys: {
        listToken: "/v1/keys/list/token",
      },
    },
  };
}

export default Urls;
