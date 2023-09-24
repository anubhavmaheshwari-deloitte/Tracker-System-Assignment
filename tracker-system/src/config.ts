const clientId = "0oabg9qgm66HMDJto5d7";
const oktaDomain = "dev-57655028.okta.com";
export default {
  oidc: {
    issuer: "https://" + oktaDomain + "/oauth2/default",
    clientId,
    //scopes: ["openid", "profile", "email"],
    redirectUri: `${window.location.origin}/login/callback`,
  },
  widget: {
    issuer: "https://" + oktaDomain + "/oauth2/default",
    clientId,
    redirectUri: `${window.location.origin}/login/callback`,
    //scopes: ["openid", "profile", "email"],
  },
};
